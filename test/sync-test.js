// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var emptyObject = {};

var schemaEmptyObject = {
	type: 'object'
};

var schemaEmptyArray = {
	type: 'array'
};

vows.describe('Sync-Async').addBatch({
	'when calling synchronously with a valid object': {
		topic: function () {
			var schema = createSchema(schemaEmptyObject);
			try {
				schema.validate(emptyObject);
				this.callback(null);
			} catch(err) {
				this.callback(err);
			}
		},
		'we get back nothing': function (err, result) {
			should.not.exist(err);
			should.not.exist(result);
		}
	}
}).addBatch({
	'when calling synchronously with an invalid object': {
		topic: function () {
			var schema = createSchema(schemaEmptyArray);
			try {
				schema.validate(emptyObject);
				this.callback(null, emptyObject);
			} catch(err) {
				this.callback(err);
			}
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			if (config.verbose) {
				console.log('Error:', err)
			}
			err.should.have.property('message', 'JSON object is an object when it should be an array');
		}
	}
}).addBatch({
	'when calling asynchronously with a valid object': {
		topic: function () {
			var schema = createSchema(schemaEmptyObject);
			schema.validate(emptyObject, this.callback);
		},
		'we get back the object': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.eql(emptyObject);
		}
	}
}).addBatch({
	'when calling asynchronously with an invalid object': {
		topic: function () {
			var schema = createSchema(schemaEmptyArray);
			schema.validate(emptyObject, this.callback);
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			if (config.verbose) {
				console.log('Error:', err)
			}
			err.should.have.property('message', 'JSON object is an object when it should be an array');
		}
	}
}).export(module);
