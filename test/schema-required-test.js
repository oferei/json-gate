// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidRequired = {
	type: 'object',
	properties: {
		mandatory: {
			required: true
		}
	}
};

var schemaInvalidRequired = {
	type: 'object',
	properties: {
		mandatory: {
			required: '123'
		}
	}
};

vows.describe('Schema Required').addBatch({
	'when required attribute is a boolean': schemaShouldBeValid(schemaValidRequired),
	'when required attribute is not a boolean': schemaShouldBeInvalid(schemaInvalidRequired)
}).export(module);
	