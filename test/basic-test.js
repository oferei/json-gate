// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..');

var emptyObject = {};

var emptyArray = []

var schemaEmptyObject = {
	type: 'object'
};

var schemaEmptyArray = {
	type: 'array'
};

var schemaWithoutType = {
};

var schemaInvalidType = {
	type: 123
};

var schemaInappropriateType = {
	type: 'string'
};

vows.describe('Basic').addBatch({
	'when not passing an object': {
		topic: function () {
			jsonly(undefined, schemaEmptyObject, this.callback);
		},
		'we get a SyntaxError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(SyntaxError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when not passing a schema': {
		topic: function () {
			jsonly(emptyObject, undefined, this.callback);
		},
		'we get a SyntaxError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(SyntaxError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when passing a non-object schema': {
		topic: function () {
			jsonly(emptyObject, 'not-an-object', this.callback);
		},
		'we get a SyntaxError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(SyntaxError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when passing a schema without a type': {
		topic: function () {
			jsonly(emptyObject, schemaWithoutType, this.callback);
		},
		'we get a SyntaxError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(SyntaxError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when expecting an object to be an invalid type': {
		topic: function () {
			jsonly(emptyObject, schemaInvalidType, this.callback);
		},
		'we get a SyntaxError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(SyntaxError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when expecting an object to be an inappropriate type': {
		topic: function () {
			jsonly(emptyObject, schemaInappropriateType, this.callback);
		},
		'we get a SyntaxError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(SyntaxError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when validating an empty object': {
		topic: function () {
			jsonly(emptyObject, schemaEmptyObject, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when expecting an object to be an array': {
		topic: function () {
			jsonly(emptyObject, schemaEmptyArray, this.callback);
		},
		'we get a TypeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(TypeError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when validating an empty array': {
		topic: function () {
			jsonly(emptyArray, schemaEmptyArray, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when expecting an array to be an object': {
		topic: function () {
			jsonly(emptyArray, schemaEmptyObject, this.callback);
		},
		'we get a TypeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(TypeError);
			console.log('Error:', err)
		}
	}
}).export(module);
