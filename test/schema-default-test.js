// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidDefault = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: 'hello'
		}
	}
};

var schemaInvalidDefault = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: 42
		}
	}
};

vows.describe('Schema Default').addBatch({
	'when default value has correct type': schemaShouldBeValid(schemaValidDefault),
	'when default value has incorrect type': schemaShouldBeInvalid(schemaInvalidDefault)
}).export(module);
	