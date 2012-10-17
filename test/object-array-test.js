// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var arrAllStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

vows.describe('Object Array').addBatch({
	'when passing strings for strings': {
		topic: function () {
			var schema = createSchema(schemaAllStrings);
			schema.validate(arrAllStrings, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when passing non-strings for strings': {
		topic: function () {
			var schema = createSchema(schemaAllStrings);
			schema.validate(arrTuple, this.callback);
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	}
}).addBatch({
	'when passing a suitable tuple': {
		topic: function () {
			var schema = createSchema(schemaTupleWithProperties);
			schema.validate(arrTuple, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when an element has wrong type': {
		topic: function () {
			var schema = createSchema(schemaTupleWithProperties);
			schema.validate(arrTupleInvalidType, this.callback);
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	}
}).addBatch({
	'when an element is an object with a property with wrong type': {
		topic: function () {
			var schema = createSchema(schemaTupleWithProperties);
			schema.validate(arrTupleInvalidNestedType, this.callback);
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	}
}).addBatch({
	'when additional items are correct type': {
		topic: function () {
			var schema = createSchema(schemaAdditionalItems);
			schema.validate(arrTuplePlus, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when additional items are wrong type': {
		topic: function () {
			var schema = createSchema(schemaAdditionalItems);
			schema.validate(arrTuplePlusInvalidType, this.callback);
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	}
}).addBatch({
	'when no additional types is respected': {
		topic: function () {
			var schema = createSchema(schemaNoAdditionalItems);
			schema.validate(arrTuple2, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when no additional types is not respected': {
		topic: function () {
			var schema = createSchema(schemaNoAdditionalItems);
			schema.validate(arrTuple, this.callback);
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	}
}).export(module);
