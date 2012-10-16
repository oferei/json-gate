// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var obj = {
	str: 'Hello, JSON only'
};

var schemaCorrectMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 16
		}
	}
};

var schemaIncorrectMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 17
		}
	}
};

var schemaCorrectMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 16
		}
	}
};

var schemaIncorrectMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 15
		}
	}
};

vows.describe('Object String').addBatch({
	'when complies with minimum length': {
		topic: function () {
			var schema = createSchema(schemaCorrectMinLength);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when exceeds minimum length': {
		topic: function () {
			var schema = createSchema(schemaIncorrectMinLength);
			schema.validate(obj, this.callback);
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
	'when complies with maximum length': {
		topic: function () {
			var schema = createSchema(schemaCorrectMaxLength);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when exceeds maximum length': {
		topic: function () {
			var schema = createSchema(schemaIncorrectMaxLength);
			schema.validate(obj, this.callback);
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
