// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var arrWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var arrTuple = [
	'John',
	42,
	{ str: 'hi', num: 3 },
	false
];

var arrTupleInvalidType = [
	'John',
	'42',
	{ str: 'hi', num: 3 },
	false
];

var arrTupleInvalidNestedType = [
	'John',
	42,
	{ str: 'hi', num: '3' },
	false
];

var arrTuplePlus = [
	'John',
	42,
	false,
	true,
	false,
	false,
	true
];

var arrTuplePlusInvalidType = [
	'John',
	42,
	false,
	true,
	false,
	false,
	'no no no',
	true
];

var arrTuple2 = [
	'John',
	42
];

var arrNotUnique = ['a', 'b', 'c', 'b', 'd'];

var schemaAllStrings = {
	type: 'array',
	items: { type: 'string' }
};

var schemaTupleWithProperties = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' },
		{
			type: 'object',
			properties: {
				str: { type: 'string' },
				num: { type: 'number' }
			}
		},
		{ type: 'boolean' }
	]
};

var schemaAdditionalItems = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: { type: 'boolean' }
};

var schemaNoAdditionalItems = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: false
};

var schemaUniqueStrings = {
	type: 'array',
	items: { type: 'string' },
	uniqueItems: true
};

vows.describe('Object Array').addBatch({
	'when passing strings for strings': objectShouldBeValid(arrWeekdays, schemaAllStrings),
	'when passing non-strings for strings': objectShouldBeInvalid(arrTuple, schemaAllStrings),
	'when passing a suitable tuple': objectShouldBeValid(arrTuple, schemaTupleWithProperties),
	'when an element has wrong type': objectShouldBeInvalid(arrTupleInvalidType, schemaTupleWithProperties),
	'when an element is an object with a property with wrong type': objectShouldBeInvalid(arrTupleInvalidNestedType, schemaTupleWithProperties),
	'when additional items are correct type': objectShouldBeValid(arrTuplePlus, schemaAdditionalItems),
	'when additional items are wrong type': objectShouldBeInvalid(arrTuplePlusInvalidType, schemaAdditionalItems),
	'when no additional types is respected': objectShouldBeValid(arrTuple2, schemaNoAdditionalItems),
	'when no additional types is not respected': objectShouldBeInvalid(arrTuple, schemaNoAdditionalItems),
	'when strings are unique as expected': objectShouldBeValid(arrWeekdays, schemaUniqueStrings),
	'when strings are not unique as expected': objectShouldBeInvalid(arrNotUnique, schemaUniqueStrings)
}).export(module);
