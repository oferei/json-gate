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
	'when properties is not an object': schemaShouldBeInvalid(schemaInvalidPropertiesType),
	'when properties is invalid': schemaShouldBeInvalid(schemaInvalidProperties),
	'when patternProperties is valid': schemaShouldBeValid(schemaValidPatternProperties),
	'when patternProperties is not an object': schemaShouldBeInvalid(schemaInvalidPatternPropertiesType),
	'when patternProperties is invalid': schemaShouldBeInvalid(schemaInvalidPatternPropertiesInvalidSchema),
	'when additionalProperties is a valid schema': schemaShouldBeValid(schemaValidAdditionalProperties),
	'when additionalProperties is an invalid schema': schemaShouldBeInvalid(schemaInvalidNoAdditionalPropertiesInvalidSchema),
	'when additionalProperties is false': schemaShouldBeValid(schemaValidNoAdditionalProperties),
	'when additionalProperties is true': schemaShouldBeInvalid(schemaInvalidAdditionalPropertiesTrue)
}).export(module);

