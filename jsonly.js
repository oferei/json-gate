// http://json-schema.org/
// http://tools.ietf.org/html/draft-zyp-json-schema-03

// unsupported attributes: extends, id, $ref, $schema, hyper schema

function getType(obj) {
	switch (Object.prototype.toString.call(obj)) {
		case '[object String]':
			return 'string';
		case '[object Number]':
			return (obj % 1 === 0) ? 'integer' : 'number';
		case '[object Boolean]':
			return 'boolean';
		case '[object Object]':
			return 'object';
		case '[object Array]':
			return 'array';
		case '[object Null]':
			return 'null';
		default:
			return undefined;
	}
}

function isOfType(obj, type) {
	switch (type) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'object':
		case 'array':
		case 'null':
			type = type.charAt(0).toUpperCase() + type.slice(1);
			return Object.prototype.toString.call(obj) === '[object ' + type + ']';
		case 'integer':
			return Object.prototype.toString.call(obj) === '[object Number]' && obj % 1 === 0;
		case 'any':
		default:
			return true;
	}
}

function getName(names) {
	return names.length === 0 ? 'JSON object' : 'Property \'' + names.join('.') + '\'';
}

function validateRequired(obj, schema, names) {
	//console.log('***', names, 'validateRequired');
	if (schema.required !== undefined) {
		if (!isOfType(schema.required, 'boolean')) {
			throw new SyntaxError(getName(names) + ' schema required must be a boolean');
		}
		if (schema.required) {
			if (obj === undefined) {
				throw new TypeError(getName(names) + ' is required');
			}
		}
	}
}

function applyDefault(obj, schema, names) {
	console.log('***', names, 'applyDefault');
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
				throw new TypeError(getName(names) + ' type is \'' + getType(obj) + '\' when it should be \'' + schema.type + '\'');
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
						return validateSchema(obj, type[i], names)
					} catch(err) {
						if (!(err instanceof TypeError) && !(err instanceof RangeError)) {
							throw err;
						}
					}
				} else {
					throw new SyntaxError(getName(names) + ' schema union type must contain only strings and schemas');
				}
			}
			throw new TypeError(getName(names) + ' type is \'' + getType(obj) + '\' when it should be either \'' + schema.type.join('\' or \'') + '\'');
		} else {
			throw new SyntaxError(getName(names) + ' schema type must be a string or an array');
		}
	}
}

function validateArray(obj, schema, names) {
	//console.log('***', names, 'validateArray');
	if (schema.minItems !== undefined) {
		if (!isOfType(schema.minItems, 'integer')) {
			throw new SyntaxError(getName(names) + ' schema minItems must be an integer');
		}
		if (obj.length < schema.minItems) {
			throw new RangeError(getName(names) + ' number of items is ' + obj.length + ' when it should be at least ' + schema.minItems);
		}
	}

	if (schema.maxItems !== undefined) {
		if (!isOfType(schema.maxItems, 'integer')) {
			throw new SyntaxError(getName(names) + ' schema maxItems must be an integer');
		}
		if (obj.length > schema.maxItems) {
			throw new RangeError(getName(names) + ' number of items is ' + obj.length + ' when it should be at most ' + schema.maxItems);
		}
	}

	if (schema.items !== undefined) {
		var i;
		if (isOfType(schema.items, 'object')) {
			// all the items in the array MUST be valid according to the schema
			for (i = 0; i < obj.length; ++i) {
				obj[i] = validateSchema(obj[i], schema.items, names.concat([i]))
			}
		} else if (isOfType(schema.items, 'array')) {
			// each position in the instance array MUST conform to the schema in the corresponding position for this array
			var numChecks = Math.min(obj.length, schema.items.length);
			for (i = 0; i < numChecks; ++i) {
				obj[i] = validateSchema(obj[i], schema.items[i], names.concat([i]))
			}
			if (obj.length > schema.items.length) {
				if (schema.additionalItems !== undefined) {
					if (schema.additionalItems === false) {
						throw new RangeError(getName(names) + ' number of items is ' + obj.length + ' when it should be at most ' + schema.items.length + ' - the length of schema items');
					}
					if (!isOfType(schema.additionalItems, 'object')) {
						throw new SyntaxError(getName(names) + ' schema additionalItems must be an object or false');
					}
					for (; i < obj.length; ++i) {
						obj[i] = validateSchema(obj[i], schema.additionalItems, names.concat([i]))
					}
				}
			}
		} else {
			throw new SyntaxError(getName(names) + ' schema items must be an object or an array');
		}
	}

	// TODO: uniqueItems

	return obj;
}

function validateProperties(obj, schema, names) {
	console.log('***', names, 'validateProperties');
	if (schema.properties !== undefined) {
		if (!isOfType(schema.properties, 'object')) {
			throw new SyntaxError(getName(names) + ' schema properties must be an object');
		}
		for (var property in schema.properties) {
			prop = validateSchema(obj[property], schema.properties[property], names.concat([property]))
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
	console.log('***', names, 'validateObject');
	obj = validateProperties(obj, schema, names);
	// TODO: patternProperties, additionalProperties, dependencies

	return obj;
}

function validateNumber(obj, schema, names) {
	//console.log('***', names, 'validateNumber');

	var exclusive;

	if (schema.minimum !== undefined) {
		if (!isOfType(schema.minimum, 'number')) {
			throw new SyntaxError(getName(names) + ' schema minimum must be a number');
		}
		exclusive = false;
		if (schema.exclusiveMinimum !== undefined) {
			if (!isOfType(schema.exclusiveMinimum, 'boolean')) {
				throw new SyntaxError(getName(names) + ' schema exclusiveMinimum must be a boolean');
			}
			exclusive = schema.exclusiveMinimum;
		}
		if (exclusive ? obj <= schema.minimum : obj < schema.minimum) {
			throw new RangeError(getName(names) + ' is ' + obj + ' when it should be ' + (exclusive ? 'greater than' : 'at least') + ' ' + schema.minimum);
		}
	}
	
	if (schema.maximum !== undefined) {
		if (!isOfType(schema.maximum, 'number')) {
			throw new SyntaxError(getName(names) + ' schema maximum must be a number');
		}
		exclusive = false;
		if (schema.exclusiveMaximum !== undefined) {
			if (!isOfType(schema.exclusiveMaximum, 'boolean')) {
				throw new SyntaxError(getName(names) + ' schema exclusiveMaximum must be a boolean');
			}
			exclusive = schema.exclusiveMaximum;
		}
		if (exclusive ? obj >= schema.maximum : obj > schema.maximum) {
			throw new RangeError(getName(names) + ' is ' + obj + ' when it should be ' + (exclusive ? 'less than' : 'at most') + ' ' + schema.maximum);
		}
	}

	if (schema.divisibleBy !== undefined) {
		if (!isOfType(schema.divisibleBy, 'number')) {
			throw new SyntaxError(getName(names) + ' schema divisibleBy must be a number');
		}
		if (schema.divisibleBy === 0) {
			throw new SyntaxError(getName(names) + ' schema divisibleBy must not be 0');
		}
		if (!isOfType(obj / schema.divisibleBy, 'integer')) {
			throw new RangeError(getName(names) + ' is ' + obj + ' when it should be divisible by ' + schema.divisibleBy);
		}
	}
};

function validateString(obj, schema, names) {
	//console.log('***', names, 'validateString');

	if (schema.minLength !== undefined) {
		if (!isOfType(schema.minLength, 'integer')) {
			throw new SyntaxError(getName(names) + ' schema minLength must be an integer');
		}
		if (obj.length < schema.minLength) {
			throw new RangeError(getName(names) + ' length is ' + obj.length + ' when it should be at least ' + schema.minLength);
		}
	}
	
	if (schema.maxLength !== undefined) {
		if (!isOfType(schema.maxLength, 'integer')) {
			throw new SyntaxError(getName(names) + ' schema maxLength must be an integer');
		}
		if (obj.length > schema.maxLength) {
			throw new RangeError(getName(names) + ' length is ' + obj.length + ' when it should be at most ' + schema.maxLength);
		}
	}
	
	// TODO: pattern
}

function validateItem(obj, schema, names) {
	//console.log('***', names, 'validateItem');
	if (isOfType(obj, 'number')) {
		validateNumber(obj, schema, names);
	} else if (isOfType(obj, 'string')) {
		validateString(obj, schema, names);
	}

	// TODO: enum, format
}

function validateSchema(obj, schema, names) {
	console.log('***', names, 'validateSchema');

	validateRequired(obj, schema, names);
	if (obj === undefined) {
		obj = applyDefault(obj, schema, names);
	}
	if (obj !== undefined) {
		validateType(obj, schema, names);
		// TODO: disallow

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
// * Synchronous - done callback is not provided. will return object or throw error
// * Asynchronous - done callback is provided. will not throw error.
//        will call callback with error as first parameter and object as second
// Errors:
// * TypeError if object/property is missing or is the wrong type
// * RangeError if object value is outside of its valid range
// * SyntaxError if schema syntax is invalid
// * Error in the unthinkable event of a bug  ;)
module.exports = function(obj, schema, done) {
	try {
		if (obj === undefined) {
			throw new SyntaxError('JSON object is undefined');
		}
		if (schema === undefined) {
			throw new SyntaxError('Schema is undefined');
		}

		// validate schema parameters for object root
		if (!isOfType(schema, 'object')) {
			throw new SyntaxError('Schema must be an object');
		}
		if (schema.type === undefined) {
			throw new SyntaxError('Schema \'type\' is required');
		}
		if (!isOfType(schema.type, 'string')) {
			throw new SyntaxError('Schema type must be a string');
		}
		if (schema.type !== 'object' && schema.type !== 'array') {
			throw new SyntaxError('Schema \'type\' is \'' + schema.type + '\' when it should be \'object\' or \'array\'');
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
