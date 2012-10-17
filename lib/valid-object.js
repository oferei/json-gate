var common = require('./common'),
	getType = common.getType,
	withAOrAn = common.withAOrAn,
	isOfType = common.isOfType,
	getName = common.getName,
	deepEquals = common.deepEquals;

function typeOrSchema(type) {
	return typeof(type) === 'string' ? type : 'schema';
}

function throwInvalidValue(names, value, expected) {
	throw new Error('JSON object' + getName(names) + ' is ' + value + ' when it should be ' + expected);
}

function throwInvalidAttributeValue(names, attribFullName, value, expected) {
	throw new Error('JSON object' + getName(names) + ': ' + attribFullName + ' is ' + value + ' when it should be ' + expected);
}

function throwInvalidType(names, value, expected) {
	throw new Error('JSON object' + getName(names) + ' is ' + withAOrAn(getType(value)) + ' when it should be ' + expected);
}

function validateRequired(obj, schema, names) {
	//console.log('***', names, 'validateRequired');
	if (schema.required) {
		if (obj === undefined) {
			throw new Error('JSON object' + getName(names) + ' is required');
		}
	}
}

function applyDefault(obj, schema, names) {
	//console.log('***', names, 'applyDefault');
	if (schema.default !== undefined) {
		obj = schema.default;
	}

	return obj;
}

function validateType(obj, schema, names) {
	//console.log('***', names, 'validateType');
	if (schema.type !== undefined) {
		if (isOfType(schema.type, 'string')) {
			// simple type
			if (!isOfType(obj, schema.type)) {
				throwInvalidType(names, obj, withAOrAn(schema.type));
			}
		} else if (isOfType(schema.type, 'array')) {
			// union type
			for (var i = 0; i < schema.type.length; ++i) {
				if (isOfType(schema.type[i], 'string')) {
					// simple type (inside union type)
					if (isOfType(obj, schema.type[i])) {
						return; // success
					}
				} else if (isOfType(schema.type[i], 'object')) {
					// schema (inside union type)
					try {
						return validateSchema(obj, schema.type[i], names)
					} catch(err) {
						// validation failed
						// TOOD: consider propagating error message upwards
					}
				}
			}
			throwInvalidType(names, obj, 'either ' + schema.type.map(typeOrSchema).map(withAOrAn).join(' or '));
		}
	}
}

function validateDisallow(obj, schema, names) {
	//console.log('***', names, 'validateDisallow');
	if (schema.disallow !== undefined) {
		if (isOfType(schema.disallow, 'string')) {
			// simple type
			if (isOfType(obj, schema.disallow)) {
				throwInvalidDisallow(names, obj, withAOrAn(schema.disallow));
			}
		} else if (isOfType(schema.disallow, 'array')) {
			// union type
			for (var i = 0; i < schema.disallow.length; ++i) {
				if (isOfType(schema.disallow[i], 'string')) {
					// simple type (inside union type)
					if (isOfType(obj, schema.disallow[i])) {
						throwInvalidType(names, obj, 'neither ' + schema.disallow.map(typeOrSchema).map(withAOrAn).join(' nor '));
					}
				} else if (isOfType(schema.disallow[i], 'object')) {
					// schema (inside union type)
					try {
						validateSchema(obj, schema.disallow[i], names)
					} catch(err) {
						// validation failed
						continue;
					}
					throwInvalidType(names, obj, 'neither ' + schema.disallow.map(typeOrSchema).map(withAOrAn).join(' nor '));
					// TOOD: consider propagating error message upwards
				}
			}
		}
	}
}

function validateEnum(obj, schema, names) {
	//console.log('***', names, 'validateEnum');
	if (schema['enum'] !== undefined) {
		for (var i = 0; i < schema['enum'].length; ++i) {
			if (deepEquals(obj, schema['enum'][i])) {
				return true;
			}
		}
		throw new Error('JSON object' + getName(names) + ' is not in enum');
	}
}

function validateArray(obj, schema, names) {
	//console.log('***', names, 'validateArray');
	var i, j;

	if (schema.minItems !== undefined) {
		if (obj.length < schema.minItems) {
			throwInvalidAttributeValue(names, 'number of items', obj.length, 'at least ' + schema.minItems)
		}
	}

	if (schema.maxItems !== undefined) {
		if (obj.length > schema.maxItems) {
			throwInvalidAttributeValue(names, 'number of items', obj.length, 'at most ' + schema.maxItems);
		}
	}

	if (schema.items !== undefined) {
		if (isOfType(schema.items, 'object')) {
			// all the items in the array MUST be valid according to the schema
			for (i = 0; i < obj.length; ++i) {
				obj[i] = validateSchema(obj[i], schema.items, names.concat([ '['+i+']' ]));
			}
		} else if (isOfType(schema.items, 'array')) {
			// each position in the instance array MUST conform to the schema in the corresponding position for this array
			var numChecks = Math.min(obj.length, schema.items.length);
			for (i = 0; i < numChecks; ++i) {
				obj[i] = validateSchema(obj[i], schema.items[i], names.concat([ '['+i+']' ]));
			}
			if (obj.length > schema.items.length) {
				if (schema.additionalItems !== undefined) {
					if (schema.additionalItems === false) {
						throwInvalidAttributeValue(names, 'number of items', obj.length, 'at most ' + schema.items.length + ' - the length of schema items');
					}
					for (; i < obj.length; ++i) {
						obj[i] = validateSchema(obj[i], schema.additionalItems, names.concat([ '['+i+']' ]));
					}
				}
			}
		}
	}

	if (schema.uniqueItems !== undefined) {
		for (i = 0; i < obj.length - 1; ++i) {
			for (j = i + 1; j < obj.length; ++j) {
				if (deepEquals(obj[i], obj[j])) {
					throw new Error('JSON object' + getName(names) + ' items are not unique: element ' + i + ' equals element ' + j);
				}
			}
		}
	}

	return obj;
}

function validateProperties(obj, schema, names) {
	//console.log('***', names, 'validateProperties');
	if (schema.properties !== undefined) {
		for (var property in schema.properties) {
			prop = validateSchema(obj[property], schema.properties[property], names.concat([property]));
			if (prop === undefined) {
				delete obj[property];
			} else {
				obj[property] = prop;
			}
		}
	}

	return obj;
}

function validateObject(obj, schema, names) {
	//console.log('***', names, 'validateObject');
	obj = validateProperties(obj, schema, names);
	// TODO: patternProperties, additionalProperties, dependencies

	return obj;
}

function validateNumber(obj, schema, names) {
	//console.log('***', names, 'validateNumber');

	if (schema.minimum !== undefined) {
		if (schema.exclusiveMinimum ? obj <= schema.minimum : obj < schema.minimum) {
			throwInvalidValue(names, obj, (schema.exclusiveMinimum ? 'greater than' : 'at least') + ' ' + schema.minimum);
		}
	}
	
	if (schema.maximum !== undefined) {
		if (schema.exclusiveMaximum ? obj >= schema.maximum : obj > schema.maximum) {
			throwInvalidValue(names, obj, (schema.exclusiveMaximum ? 'less than' : 'at most') + ' ' + schema.maximum);
		}
	}

	if (schema.divisibleBy !== undefined) {
		if (!isOfType(obj / schema.divisibleBy, 'integer')) {
			throwInvalidValue(names, obj, 'divisible by ' + schema.divisibleBy);
		}
	}
};

function validateString(obj, schema, names) {
	//console.log('***', names, 'validateString');

	if (schema.minLength !== undefined) {
		if (obj.length < schema.minLength) {
			throwInvalidAttributeValue(names, 'length', obj.length, 'at least ' + schema.minLength);
		}
	}
	
	if (schema.maxLength !== undefined) {
		if (obj.length > schema.maxLength) {
			throwInvalidAttributeValue(names, 'length', obj.length, 'at most ' + schema.maxLength);
		}
	}

	if (schema.pattern !== undefined) {
		if (!obj.match(RegExp(schema.pattern))) {
			throw new Error('JSON object' + getName(names) + ' does not match pattern');
		}
	}
}

function validateItem(obj, schema, names) {
	//console.log('***', names, 'validateItem');
	if (isOfType(obj, 'number')) {
		validateNumber(obj, schema, names);
	} else if (isOfType(obj, 'string')) {
		validateString(obj, schema, names);
	}

	// TODO: format
}

function validateSchema(obj, schema, names) {
	//console.log('***', names, 'validateSchema');

	validateRequired(obj, schema, names);
	if (obj === undefined) {
		obj = applyDefault(obj, schema, names);
	}
	if (obj !== undefined) {
		validateType(obj, schema, names);
		validateDisallow(obj, schema, names);
		validateEnum(obj, schema, names);

		if (isOfType(obj, 'object')) {
			obj = validateObject(obj, schema, names);
		} else if (isOfType(obj, 'array')) {
			obj = validateArray(obj, schema, names);
		} else {
			validateItem(obj, schema, names);
		}
	}

	return obj;
}

// Two operation modes:
// * Synchronous - done callback is not provided. will return nothing or throw error
// * Asynchronous - done callback is provided. will not throw error.
//        will call callback with error as first parameter and object as second
// Schema is expected to be validated.
module.exports = function(obj, schema, done) {
	try {
		if (obj === undefined) {
			throw new Error('JSON object is undefined');
		}

		validateSchema(obj, schema, []);

		if (done) {
			done(null, obj);
		}
	} catch(err) {
		if (done) {
			done(err)
		} else {
			throw err;
		}
	}
};
