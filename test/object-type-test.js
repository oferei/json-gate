// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

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

vows.describe('Object Type').addBatch({
	'when a string is passed for a string': {
		topic: function () {
			var schema = createSchema(schemaString);
			schema.validate(objString, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when trying to pass a number for a string': {
		topic: function () {
			var schema = createSchema(schemaString);
			schema.validate(objNumber, this.callback);
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
	'when a number is passed for a number': {
		topic: function () {
			var schema = createSchema(schemaNumber);
			schema.validate(objNumber, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when trying to pass a string for a number': {
		topic: function () {
			var schema = createSchema(schemaNumber);
			schema.validate(objString, this.callback);
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
	'when an integer is passed for a number': {
		topic: function () {
			var schema = createSchema(schemaInteger);
			schema.validate(objInteger, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when an integer is passed for an integer': {
		topic: function () {
			var schema = createSchema(schemaInteger);
			schema.validate(objInteger, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when trying to pass a number for an integer': {
		topic: function () {
			var schema = createSchema(schemaInteger);
			schema.validate(objNumber, this.callback);
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
	'when a boolean is passed for a boolean': {
		topic: function () {
			var schema = createSchema(schemaBoolean);
			schema.validate(objBoolean, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when trying to pass an integer for a boolean': {
		topic: function () {
			var schema = createSchema(schemaBoolean);
			schema.validate(objInteger, this.callback);
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
	'when an object is passed for an object': {
		topic: function () {
			var schema = createSchema(schemaObject);
			schema.validate(objObject, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when trying to pass an array for an object': {
		topic: function () {
			var schema = createSchema(schemaObject);
			schema.validate(objArray, this.callback);
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
	'when an array is passed for an array': {
		topic: function () {
			var schema = createSchema(schemaArray);
			schema.validate(objArray, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when trying to pass an object for an array': {
		topic: function () {
			var schema = createSchema(schemaArray);
			schema.validate(objObject, this.callback);
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
	'when a null is passed for a null': {
		topic: function () {
			var schema = createSchema(schemaNull);
			schema.validate(objNull, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when trying to pass a boolean for a null': {
		topic: function () {
			var schema = createSchema(schemaNull);
			schema.validate(objBoolean, this.callback);
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
	'when a string is passed for any': {
		topic: function () {
			var schema = createSchema(schemaAny);
			schema.validate(objAny, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).export(module);
