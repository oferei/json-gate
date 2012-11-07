// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidProperties = {
	type: 'object',
	properties: {
		str: { type: 'string' },
		obj: {
			type: 'object',
			properties: {
				arr: { type: 'array' }
			}
		}
	}
};

var schemaInvalidPropertiesType = {
	type: 'object',
	properties: 5
};

var schemaInvalidProperties = {
	type: 'object',
	properties: {
		obj: {
			type: 'object',
			properties: {
				arr: {
					type: 'array',
					minItems: 'bug'
				}
			}
		}
	}
};

var schemaValidPatternProperties = {
	type: 'object',
	patternProperties: {
		'[0-9]': { type: 'boolean' }
	}
};

var schemaInvalidPatternPropertiesType = {
	type: 'object',
	patternProperties: 'seven'
};

var schemaInvalidPatternPropertiesInvalidSchema = {
	type: 'object',
	patternProperties: {
		'[0-9]': 'boolean'
	}
};

var schemaValidAdditionalProperties = {
	type: 'object',
	additionalProperties: { type: 'boolean' }
};

var schemaInvalidNoAdditionalPropertiesInvalidSchema = {
	type: 'object',
	additionalProperties: { type: 3 }
};

var schemaValidNoAdditionalProperties = {
	type: 'object',
	additionalProperties: false
};

var schemaInvalidAdditionalPropertiesTrue = {
	type: 'object',
	additionalProperties: true
};

vows.describe('Schema Object').addBatch({
	'when properties is valid': schemaShouldBeValid(schemaValidProperties),
	'when properties is not an object': schemaShouldBeInvalid(schemaInvalidPropertiesType, { errMsg: 'Schema: \'properties\' attribute is an integer when it should be an object' }),
	'when properties is invalid': schemaShouldBeInvalid(schemaInvalidProperties, { errMsg: 'Schema property \'obj.arr\': \'minItems\' attribute is a string when it should be an integer' }),
	'when patternProperties is valid': schemaShouldBeValid(schemaValidPatternProperties),
	'when patternProperties is not an object': schemaShouldBeInvalid(schemaInvalidPatternPropertiesType, { errMsg: 'Schema: \'patternProperties\' attribute is a string when it should be an object' }),
	'when patternProperties is invalid': schemaShouldBeInvalid(schemaInvalidPatternPropertiesInvalidSchema, { errMsg: 'Schema property \'patternProperties./[0-9]/\' is a string when it should be an object' }),
	'when additionalProperties is a valid schema': schemaShouldBeValid(schemaValidAdditionalProperties),
	'when additionalProperties is an invalid schema': schemaShouldBeInvalid(schemaInvalidNoAdditionalPropertiesInvalidSchema, { errMsg: 'Schema: \'additionalProperties\' attribute is not a valid schema: Schema: \'type\' attribute is an integer when it should be either a string or an array' }),
	'when additionalProperties is false': schemaShouldBeValid(schemaValidNoAdditionalProperties),
	'when additionalProperties is true': schemaShouldBeInvalid(schemaInvalidAdditionalPropertiesTrue, { errMsg: 'Schema: \'additionalProperties\' attribute is a boolean when it should be either an object (schema) or false' })
}).export(module);

