// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..');

var obj = {
	n: 108
};

var schemaCorrectMinimum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			minimum: 108
		}
	}
};

var schemaIncorrectMinimum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			minimum: 109
		}
	}
};

var schemaCorrectExclusiveMinimum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			minimum: 107.999,
			exclusiveMinimum: true
		}
	}
};

var schemaIncorrectExclusiveMinimum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			minimum: 108,
			exclusiveMinimum: true
		}
	}
};

var schemaCorrectMaximum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			maximum: 108
		}
	}
};

var schemaIncorrectMaximum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			maximum: 107
		}
	}
};

var schemaCorrectExclusiveMaximum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			maximum: 108.001,
			exclusiveMaximum: true
		}
	}
};

var schemaIncorrectExclusiveMaximum = {
	type: 'object',
	properties: {
		n: {
			type: 'number',
			maximum: 108,
			exclusiveMaximum: true
		}
	}
};

vows.describe('Number').addBatch({
	'when complies with minimum': {
		topic: function () {
			jsonly(obj, schemaCorrectMinimum, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when exceeds minimum': {
		topic: function () {
			jsonly(obj, schemaIncorrectMinimum, this.callback);
		},
		'we get a RangeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(RangeError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when complies with exclusive minimum': {
		topic: function () {
			jsonly(obj, schemaCorrectExclusiveMinimum, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when exceeds exclusive minimum': {
		topic: function () {
			jsonly(obj, schemaIncorrectExclusiveMinimum, this.callback);
		},
		'we get a RangeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(RangeError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when complies with maximum': {
		topic: function () {
			jsonly(obj, schemaCorrectMaximum, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when exceeds maximum': {
		topic: function () {
			jsonly(obj, schemaIncorrectMaximum, this.callback);
		},
		'we get a RangeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(RangeError);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when complies with exclusive maximum': {
		topic: function () {
			jsonly(obj, schemaCorrectExclusiveMaximum, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when exceeds exclusive maximum': {
		topic: function () {
			jsonly(obj, schemaIncorrectExclusiveMaximum, this.callback);
		},
		'we get a RangeError': function (err, result) {
			should.exist(err);
			err.should.be.an.instanceof(RangeError);
			console.log('Error:', err)
		}
	}
}).export(module);
