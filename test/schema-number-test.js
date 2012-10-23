// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 3.14
		}
	}
};

var schemaInvalidMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: '3.14'
		}
	}
};

var schemaValidExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			exclusiveMinimum: true
		}
	}
};

var schemaInvalidExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			exclusiveMinimum: 'true'
		}
	}
};

var schemaValidMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 3.14
		}
	}
};

var schemaInvalidMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: '3.14'
		}
	}
};

var schemaValidExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			exclusiveMaximum: true
		}
	}
};

var schemaInvalidExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			exclusiveMaximum: 'true'
		}
	}
};

var schemaValidDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: 3.14
		}
	}
};

var schemaInvalidDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: '3.14'
		}
	}
};

vows.describe('Schema Number').addBatch({
	'when minimum attribute is a number': schemaShouldBeValid(schemaValidMinimum),
	'when minimum attribute is not a number': schemaShouldBeInvalid(schemaInvalidMinimum, { errMsg: 'Schema property \'num\': \'minimum\' attribute is a string when it should be a number' }),
	'when exclusiveMinimum attribute is a boolean': schemaShouldBeValid(schemaValidExclusiveMinimum),
	'when exclusiveMinimum attribute is not a boolean': schemaShouldBeInvalid(schemaInvalidExclusiveMinimum, { errMsg: 'Schema property \'num\': \'exclusiveMinimum\' attribute is a string when it should be a boolean' }),
	'when maximum attribute is a number': schemaShouldBeValid(schemaValidMaximum),
	'when maximum attribute is not a number': schemaShouldBeInvalid(schemaInvalidMaximum, { errMsg: 'Schema property \'num\': \'maximum\' attribute is a string when it should be a number' }),
	'when exclusiveMaximum attribute is a boolean': schemaShouldBeValid(schemaValidExclusiveMaximum),
	'when exclusiveMaximum attribute is not a boolean': schemaShouldBeInvalid(schemaInvalidExclusiveMaximum, { errMsg: 'Schema property \'num\': \'exclusiveMaximum\' attribute is a string when it should be a boolean' }),
	'when divisibleBy attribute is a number': schemaShouldBeValid(schemaValidDivisibleBy),
	'when divisibleBy attribute is not a number': schemaShouldBeInvalid(schemaInvalidDivisibleBy, { errMsg: 'Schema property \'num\': \'divisibleBy\' attribute is a string when it should be a number' })
}).export(module);
