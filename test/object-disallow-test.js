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

var schemaNonString = {
	type: 'object',
	properties: {
		val: {
			disallow: 'string',
			required: true
		}
	}
};

var schemaNonNumber = {
	type: 'object',
	properties: {
		val: {
			disallow: 'number',
			required: true
		}
	}
};

var schemaNonInteger = {
	type: 'object',
	properties: {
		val: {
			disallow: 'integer',
			required: true
		}
	}
};

var schemaNonBoolean = {
	type: 'object',
	properties: {
		val: {
			disallow: 'boolean',
			required: true
		}
	}
};

var schemaNonObject = {
	type: 'object',
	properties: {
		val: {
			disallow: 'object',
			required: true
		}
	}
};

var schemaNonArray = {
	type: 'object',
	properties: {
		val: {
			disallow: 'array',
			required: true
		}
	}
};

var schemaNonNull = {
	type: 'object',
	properties: {
		val: {
			disallow: 'null',
			required: true
		}
	}
};

var schemaNonAny = {
	type: 'object',
	properties: {
		val: {
			disallow: 'any',
			required: true
		}
	}
};

vows.describe('Object Type').addBatch({
	'when a string is passed for a non-string': {
		topic: function () {
			var schema = createSchema(schemaNonString);
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
	'when trying to pass a number for a non-string': {
		topic: function () {
			var schema = createSchema(schemaNonString);
			schema.validate(objNumber, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when a number is passed for a non-number': {
		topic: function () {
			var schema = createSchema(schemaNonNumber);
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
	'when trying to pass a string for a non-number': {
		topic: function () {
			var schema = createSchema(schemaNonNumber);
			schema.validate(objString, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when an integer is passed for a non-number': {
		topic: function () {
			var schema = createSchema(schemaNonNumber);
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
	'when an integer is passed for a non-integer': {
		topic: function () {
			var schema = createSchema(schemaNonInteger);
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
	'when trying to pass a number for a non-integer': {
		topic: function () {
			var schema = createSchema(schemaNonInteger);
			schema.validate(objNumber, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when a boolean is passed for a non-boolean': {
		topic: function () {
			var schema = createSchema(schemaNonBoolean);
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
	'when trying to pass an integer for a non-boolean': {
		topic: function () {
			var schema = createSchema(schemaNonBoolean);
			schema.validate(objInteger, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when an object is passed for a non-object': {
		topic: function () {
			var schema = createSchema(schemaNonObject);
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
	'when trying to pass an array for a non-object': {
		topic: function () {
			var schema = createSchema(schemaNonObject);
			schema.validate(objArray, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when an array is passed for a non-array': {
		topic: function () {
			var schema = createSchema(schemaNonArray);
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
	'when trying to pass an object for a non-array': {
		topic: function () {
			var schema = createSchema(schemaNonArray);
			schema.validate(objObject, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when a null is passed for a non-null': {
		topic: function () {
			var schema = createSchema(schemaNonNull);
			schema.validate(objNull, this.callback);
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
	'when trying to pass a boolean for a non-null': {
		topic: function () {
			var schema = createSchema(schemaNonNull);
			schema.validate(objBoolean, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when a string is passed for non-any': {
		topic: function () {
			var schema = createSchema(schemaNonAny);
			schema.validate(objAny, this.callback);
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
