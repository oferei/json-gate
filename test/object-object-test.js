// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objNested = {
	str: 'top',
	obj1: {
		num: 42,
		obj2: {
			bool: false,
			obj3: {
				str: 'you are here'
			}
		}
	}
};

var objNestedMissing = {
	str: 'top',
	obj1: {
		num: 42,
		obj2: {
			bool: false,
			obj3: {
				str2: 'you are here'
			}
		}
	}
};

var schemaNested = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			required: true
		},
		obj1: {
			type: 'object',
			required: true,
			properties: {
				num: {
					type: 'number',
					required: true
				},
				obj2: {
					type: 'object',
					required: true,
					properties: {
						bool: {
							type: 'boolean',
							required: true
						},
						obj3: {
							type: 'object',
							required: true,
							properties: {
								str: {
									type: 'string',
									required: true
								}
							}
						}
					}
				}
			}
		}
	}
};

var objNumToBoolean = {
	3: true
};

var objNumToString = {
	3: 'dog'
};

var objNoPatternMatch = {
	zzz: 'whatever I want'
};

var schemaPatternProperties = {
	type: 'object',
	patternProperties: {
		'[0-9]': { type: 'boolean' }
	}
};

var objNoAdditional = {
	str: 'hi',
	3: true
};

var objAdditionalInteger = {
	str: 'hi',
	3: true,
	extra: 42
};

var objAdditionalArray = {
	str: 'hi',
	3: true,
	extra: [42]
};

var schemaNoAdditionalProperties = {
	type: 'object',
	properties: {
		str: { type: 'string' }
	},
	patternProperties: {
		'[0-9]': { type: 'boolean' }
	},
	additionalProperties: false
};

var schemaAdditionalPropertiesInteger = {
	type: 'object',
	properties: {
		str: { type: 'string' }
	},
	patternProperties: {
		'[0-9]': { type: 'boolean' }
	},
	additionalProperties: { type: 'integer' }
};

vows.describe('Object Object').addBatch({
	'when nested object is valid': objectShouldBeValid(objNested, schemaNested),
	'when nested object is missing a property': objectShouldBeInvalid(objNestedMissing, schemaNested, { errMsg: 'JSON object property \'obj1.obj2.obj3.str\' is required' }),
	'when property matches pattern and correct type': objectShouldBeValid(objNumToBoolean, schemaPatternProperties),
	'when property matches pattern and wrong type': objectShouldBeInvalid(objNumToString, schemaPatternProperties, { errMsg: 'JSON object property \'patternProperties./3/\' is a string when it should be a boolean' }),
	'when no property matches pattern': objectShouldBeValid(objNoPatternMatch, schemaPatternProperties),
	'when no additional properties is respected': objectShouldBeValid(objNoAdditional, schemaNoAdditionalProperties),
	'when no additional properties is not respected': objectShouldBeInvalid(objAdditionalInteger, schemaNoAdditionalProperties, { errMsg: 'JSON object property \'extra\' is not explicitly defined and therefore not allowed' }),
	'when additional property is correct type': objectShouldBeValid(objAdditionalInteger, schemaAdditionalPropertiesInteger),
	'when additional property is wrong type': objectShouldBeInvalid(objAdditionalArray, schemaAdditionalPropertiesInteger, { errMsg: 'JSON object property \'extra\' is an array when it should be an integer' })
}).export(module);
