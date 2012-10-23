// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objString = {
	val: 'sugar'
};

var objWrongString = {
	val: 'salt'
};

var objNumber = {
	val: 42
};

var objWrongNumber = {
	val: 7
};

var objArray = {
	val: [1, 2, 3]
};

var objWrongArray = {
	val: [1, 2, 3, 4]
};

var objObject = {
	val: {1: 2, 3: 4}
};

var objWrongObject = {
	val: {1: 2}
};

var objNested = {
	val: ['abba', 3, {arr: [5, 2]}]
};

var objWrongNested = {
	val: ['abba', 3, {arr: [5, 2], excess: 'bad'}]
};

var schemaEnum = {
	type: 'object',
	properties: {
		val: {
			'enum': [
				'sugar',
				42,
				[1, 2, 3],
				{3: 4, 1: 2},
				['abba', 3, {arr: [5, 2]}]
			],
			required: true
		}
	}
};

vows.describe('Object Enum').addBatch({
	'when string is in enum': objectShouldBeValid(objString, schemaEnum),
	'when string is not in enum': objectShouldBeInvalid(objWrongString, schemaEnum, { errMsg: 'JSON object property \'val\' is not in enum' }),
	'when number is in enum': objectShouldBeValid(objNumber, schemaEnum),
	'when number is not in enum': objectShouldBeInvalid(objWrongNumber, schemaEnum, { errMsg: 'JSON object property \'val\' is not in enum' }),
	'when array is in enum': objectShouldBeValid(objArray, schemaEnum),
	'when array is not in enum': objectShouldBeInvalid(objWrongArray, schemaEnum, { errMsg: 'JSON object property \'val\' is not in enum' }),
	'when object is in enum': objectShouldBeValid(objObject, schemaEnum),
	'when object is not in enum': objectShouldBeInvalid(objWrongObject, schemaEnum, { errMsg: 'JSON object property \'val\' is not in enum' }),
	'when nested object is in enum': objectShouldBeValid(objNested, schemaEnum),
	'when nested object is not in enum': objectShouldBeInvalid(objWrongNested, schemaEnum, { errMsg: 'JSON object property \'val\' is not in enum' })
}).export(module);
