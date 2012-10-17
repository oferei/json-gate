// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidEnum = {
	type: 'object',
	properties: {
		prop: {
			enum: []
		}
	}
};

var schemaInvalidEnum = {
	type: 'object',
	properties: {
		prop: {
			enum: {}
		}
	}
};

vows.describe('Schema Enum').addBatch({
	'when enum attribute is an array': schemaShouldBeValid(schemaValidEnum),
	'when enum attribute is not an array': schemaShouldBeInvalid(schemaInvalidEnum)
}).export(module);
	