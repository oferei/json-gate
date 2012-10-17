// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValid = {
	type: 'object',
	properties: {
		str: {
			type: 'string'
		},
		obj: {
			type: 'object',
			properties: {
				arr: {
					type: 'array'
				}
			}
		}
	}
};

var schemaInvalid = {
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

vows.describe('Schema Object').addBatch({
	'when schema is valid': schemaShouldBeValid(schemaValid),
	'when schema is invalid': schemaShouldBeInvalid(schemaInvalid)
}).export(module);
