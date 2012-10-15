// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..');

var obj = {
	s: 'Hello, JSON only'
};

var schemaCorrectMinLength = {
	type: 'object',
	properties: {
		s: {
			type: 'string',
			minLength: 16
		}
	}
};

var schemaIncorrectMinLength = {
	type: 'object',
	properties: {
		s: {
			type: 'string',
			minLength: 17
		}
	}
};

var schemaCorrectMaxLength = {
	type: 'object',
	properties: {
		s: {
			type: 'string',
			maxLength: 16
		}
	}
};

var schemaIncorrectMaxLength = {
	type: 'object',
	properties: {
		s: {
			type: 'string',
			maxLength: 15
		}
	}
};

vows.describe('String').addBatch({
	'when complies with minimum length': {
		topic: function () {
			jsonly(obj, schemaCorrectMinLength, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when exceeds minimum length': {
		topic: function () {
			jsonly(obj, schemaIncorrectMinLength, this.callback);
		},
		'we get a RangeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(RangeError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when complies with maximum length': {
		topic: function () {
			jsonly(obj, schemaCorrectMaxLength, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when exceeds maximum length': {
		topic: function () {
			jsonly(obj, schemaIncorrectMaxLength, this.callback);
		},
		'we get a RangeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(RangeError);
			console.log('Error:', err)
		}
	}
}).export(module);
