// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objString = {
	val: 'Hello, json-gate'
};

var objNumber = {
	val: 3.14
};

var objInteger = {
	val: 42
};

var objBoolean = {
	val: false
};

var objObject = {
	val: {}
};

var objArray = {
	val: []
};

var objNull = {
	val: null
};

var objAny = {
	val: 'sub kuch milega'
};

var schemaString = {
	type: 'object',
	properties: {
		val: {
			type: 'string',
			required: true
		}
	}
};

var schemaNumber = {
	type: 'object',
	properties: {
		val: {
			type: 'number',
			required: true
		}
	}
};

var schemaInteger = {
	type: 'object',
	properties: {
		val: {
			type: 'integer',
			required: true
		}
	}
};

var schemaBoolean = {
	type: 'object',
	properties: {
		val: {
			type: 'boolean',
			required: true
		}
	}
};

var schemaObject = {
	type: 'object',
	properties: {
		val: {
			type: 'object',
			required: true
		}
	}
};

var schemaArray = {
	type: 'object',
	properties: {
		val: {
			type: 'array',
			required: true
		}
	}
};

var schemaNull = {
	type: 'object',
	properties: {
		val: {
			type: 'null',
			required: true
		}
	}
};

var schemaAny = {
	type: 'object',
	properties: {
		val: {
			type: 'any',
			required: true
		}
	}
};

var schemaBroken = {
	type: 'object',
	properties: {
		val: {
			type: 'unknown',
			required: true
		}
	}
};

vows.describe('Object Type').addBatch({
	'when a string is passed for a string': objectShouldBeValid(objString, schemaString),
	'when trying to pass a number for a string': objectShouldBeInvalid(objNumber, schemaString, { errMsg: 'JSON object property \'val\' is a number when it should be a string' }),
	'when a number is passed for a number': objectShouldBeValid(objNumber, schemaNumber),
	'when trying to pass a string for a number': objectShouldBeInvalid(objString, schemaNumber, { errMsg: 'JSON object property \'val\' is a string when it should be a number' }),
	'when an integer is passed for a number': objectShouldBeValid(objInteger, schemaNumber),
	'when an integer is passed for an integer': objectShouldBeValid(objInteger, schemaInteger),
	'when trying to pass a number for an integer': objectShouldBeInvalid(objNumber, schemaInteger, { errMsg: 'JSON object property \'val\' is a number when it should be an integer' }),
	'when a boolean is passed for a boolean': objectShouldBeValid(objBoolean, schemaBoolean),
	'when trying to pass an integer for a boolean': objectShouldBeInvalid(objInteger, schemaBoolean, { errMsg: 'JSON object property \'val\' is an integer when it should be a boolean' }),
	'when an object is passed for an object': objectShouldBeValid(objObject, schemaObject),
	'when trying to pass an array for an object': objectShouldBeInvalid(objArray, schemaObject, { errMsg: 'JSON object property \'val\' is an array when it should be an object' }),
	'when an array is passed for an array': objectShouldBeValid(objArray, schemaArray),
	'when trying to pass an object for an array': objectShouldBeInvalid(objObject, schemaArray, { errMsg: 'JSON object property \'val\' is an object when it should be an array' }),
	'when null is passed for null': objectShouldBeValid(objNull, schemaNull),
	'when trying to pass a boolean for null': objectShouldBeInvalid(objBoolean, schemaNull, { errMsg: 'JSON object property \'val\' is a boolean when it should be null' }),
	'when a string is passed for any': objectShouldBeValid(objAny, schemaAny),
	'when a string is passed for unknown type': objectShouldBeInvalid(objAny, schemaBroken, 'unsupported type unknown')
}).export(module);
