// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidDefaultString = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: 'hello'
		}
	}
};

var schemaInvalidDefaultString = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: 42
		}
	}
};

var schemaValidDefaultObject = {
	type: 'object',
	properties: {
		str: {
			type: 'object',
			properties: {
				str: {
					type: 'string',
					required: true
				},
				num: {
					type: 'number',
					required: true
				}
			},
			default: {
				str: 'hello',
				num: 42
			}
		}
	}
};

var schemaInvalidDefaultObject = {
	type: 'object',
	properties: {
		str: {
			type: 'object',
			properties: {
				str: {
					type: 'string',
					required: true
				},
				num: {
					type: 'number',
					required: true
				}
			},
			default: {
				str: 'hello',
				num: '42'
			}
		}
	}
};

vows.describe('Schema Default').addBatch({
	'when default value is a string as expected': schemaShouldBeValid(schemaValidDefaultString),
	'when default value is not a string as expected': schemaShouldBeInvalid(schemaInvalidDefaultString),
	'when default value conforms to the schema': schemaShouldBeValid(schemaValidDefaultObject),
	'when default value does not conform to the schema': schemaShouldBeInvalid(schemaInvalidDefaultObject)
}).export(module);
