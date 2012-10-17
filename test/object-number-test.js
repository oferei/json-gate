// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var obj = {
	num: 108
};

var schemaCorrectMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			required: true
		}
	}
};

var schemaIncorrectMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 109,
			required: true
		}
	}
};

var schemaCorrectExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 107.999,
			exclusiveMinimum: true,
			required: true
		}
	}
};

var schemaIncorrectExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			exclusiveMinimum: true,
			required: true
		}
	}
};

var schemaCorrectMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			required: true
		}
	}
};

var schemaIncorrectMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 107,
			required: true
		}
	}
};

var schemaCorrectExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108.001,
			exclusiveMaximum: true,
			required: true
		}
	}
};

var schemaIncorrectExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			exclusiveMaximum: true,
			required: true
		}
	}
};

var schemaCorrectDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: 36,
			required: true
		}
	}
};

var schemaIncorrectDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: 17,
			required: true
		}
	}
};

vows.describe('Object Number').addBatch({
	'when complies with minimum': objectShouldBeValid(obj, schemaCorrectMinimum),
	'when exceeds minimum': objectShouldBeInvalid(obj, schemaIncorrectMinimum),
	'when complies with exclusive minimum': objectShouldBeValid(obj, schemaCorrectExclusiveMinimum),
	'when exceeds exclusive minimum': objectShouldBeInvalid(obj, schemaIncorrectExclusiveMinimum),
	'when complies with maximum': objectShouldBeValid(obj, schemaCorrectMaximum),
	'when exceeds maximum': objectShouldBeInvalid(obj, schemaIncorrectMaximum),
	'when complies with exclusive maximum': objectShouldBeValid(obj, schemaCorrectExclusiveMaximum),
	'when exceeds exclusive maximum': objectShouldBeInvalid(obj, schemaIncorrectExclusiveMaximum),
	'when divisible by given divisor': objectShouldBeValid(obj, schemaCorrectDivisibleBy),
	'when not divisible by given divisor': objectShouldBeInvalid(obj, schemaIncorrectDivisibleBy)
}).export(module);
