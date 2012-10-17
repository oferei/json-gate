// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var schemaValidDefault = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: 'hello'
		}
	}
};

var schemaInvalidDefault = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: 42
		}
	}
};

vows.describe('Schema Default').addBatch({
	'when default value has correct type': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidDefault));
			} catch(err) {
				this.callback(err);
			}
		},
		'we get no error': function (err, schema) {
			should.not.exist(err);
			should.exist(schema);
		}
	}
}).addBatch({
	'when default value has incorrect type': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidDefault));
			} catch(err) {
				this.callback(err);
			}
		},
		'we get an error': function (err, schema) {
			should.exist(err);
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	}
}).export(module);
	