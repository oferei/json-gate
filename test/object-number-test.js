// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var obj = {
	num: 108
};

var schemaCorrectMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			required: true
		}
	}
};

var schemaIncorrectMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 109,
			required: true
		}
	}
};

var schemaCorrectExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 107.999,
			exclusiveMinimum: true,
			required: true
		}
	}
};

var schemaIncorrectExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			exclusiveMinimum: true,
			required: true
		}
	}
};

var schemaCorrectMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			required: true
		}
	}
};

var schemaIncorrectMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 107,
			required: true
		}
	}
};

var schemaCorrectExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108.001,
			exclusiveMaximum: true,
			required: true
		}
	}
};

var schemaIncorrectExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			exclusiveMaximum: true,
			required: true
		}
	}
};

var schemaCorrectDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: 36,
			required: true
		}
	}
};

var schemaIncorrectDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: 17,
			required: true
		}
	}
};

vows.describe('Object Number').addBatch({
	'when complies with minimum': {
		topic: function () {
			var schema = createSchema(schemaCorrectMinimum);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when exceeds minimum': {
		topic: function () {
			var schema = createSchema(schemaIncorrectMinimum);
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
	'when complies with exclusive minimum': {
		topic: function () {
			var schema = createSchema(schemaCorrectExclusiveMinimum);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when exceeds exclusive minimum': {
		topic: function () {
			var schema = createSchema(schemaIncorrectExclusiveMinimum);
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
	'when complies with maximum': {
		topic: function () {
			var schema = createSchema(schemaCorrectMaximum);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when exceeds maximum': {
		topic: function () {
			var schema = createSchema(schemaIncorrectMaximum);
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
	'when complies with exclusive maximum': {
		topic: function () {
			var schema = createSchema(schemaCorrectExclusiveMaximum);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when exceeds exclusive maximum': {
		topic: function () {
			var schema = createSchema(schemaIncorrectExclusiveMaximum);
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
	'when divisible by given divisor': {
		topic: function () {
			var schema = createSchema(schemaCorrectDivisibleBy);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
		}
	}
}).addBatch({
	'when not divisible by given divisor': {
		topic: function () {
			var schema = createSchema(schemaIncorrectDivisibleBy);
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
