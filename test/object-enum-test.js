// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

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
	'when string is in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objString, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when string is not in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objWrongString, this.callback);
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
	'when number is in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objNumber, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when number is not in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objWrongNumber, this.callback);
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
	'when array is in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objArray, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when array is not in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objWrongArray, this.callback);
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
	'when object is in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objObject, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when object is not in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objWrongObject, this.callback);
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
	'when nested object is in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objNested, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when nested object is not in enum': {
		topic: function () {
			var schema = createSchema(schemaEnum);
			schema.validate(objWrongNested, this.callback);
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
