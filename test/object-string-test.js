// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var obj = {
	str: 'Hello, json-gate'
};

var schemaCorrectMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 16,
			required: true
		}
	}
};

var schemaIncorrectMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 17,
			required: true
		}
	}
};

var schemaCorrectMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 16,
			required: true
		}
	}
};

var schemaIncorrectMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 15,
			required: true
		}
	}
};

var schemaCorrectPattern = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			pattern: '^Hello',
			required: true
		}
	}
};

var schemaIncorrectPattern = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			pattern: 'Hello$',
			required: true
		}
	}
};

vows.describe('Object String').addBatch({
	'when complies with minimum length': objectShouldBeValid(obj, schemaCorrectMinLength),
	'when exceeds minimum length': objectShouldBeInvalid(obj, schemaIncorrectMinLength, { errMsg: 'JSON object property \'str\': length is 16 when it should be at least 17' }),
	'when complies with maximum length': objectShouldBeValid(obj, schemaCorrectMaxLength),
	'when exceeds maximum length': objectShouldBeInvalid(obj, schemaIncorrectMaxLength, { errMsg: 'JSON object property \'str\': length is 16 when it should be at most 15' }),
	'when complies with pattern': objectShouldBeValid(obj, schemaCorrectPattern),
	'when does not comply with pattern': objectShouldBeInvalid(obj, schemaIncorrectPattern, { errMsg: 'JSON object property \'str\' does not match pattern' })
}).export(module);
