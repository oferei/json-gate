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

var schemaInvalidType = {
	type: 123
};

var schemaInappropriateType = {
	type: 'string'
};

vows.describe('Sync-Async').addBatch({
	'when calling synchronously and expecting no error': {
		topic: function () {
			var result = jsonly(emptyObject, schemaEmptyObject);
			this.callback(null, result);
		},
		'we get back the object': function (err, result) {
			should.exist(result);
			result.should.not.be.an.instanceof(Error);
			result.should.eql(emptyObject);
		}
	}
}).addBatch({
	'when calling synchronously and expecting an error': {
		topic: function () {
			var result = jsonly(emptyObject, schemaInvalidType);
			this.callback(null, result);
		},
		'we get the error': function (err, result) {
			should.exist(result);
			result.should.be.an.instanceof(SyntaxError);
		}
	}
}).addBatch({
	'when calling asynchronously and expecting no error': {
		topic: function () {
			var result = jsonly(emptyObject, schemaEmptyObject, this.callback);
		},
		'we get back the object': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.eql(emptyObject);
		}
	}
}).addBatch({
	'when calling asynchronously and expecting an error': {
		topic: function () {
			var result = jsonly(emptyObject, schemaInvalidType, this.callback);
		},
		'we get the error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
		}
	}
}).export(module);
