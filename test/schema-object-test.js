// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var schemaValid = {
	type: 'object',
	properties: {
		str: {
			type: 'string'
		},
		obj: {
			type: 'object',
			properties: {
				arr: {
					type: 'array'
				}
			}
		}
	}
};

var schemaInvalid = {
	type: 'object',
	properties: {
		obj: {
			type: 'object',
			properties: {
				arr: {
					type: 'array',
					minItems: 'bug'
				}
			}
		}
	}
};

vows.describe('Schema Object').addBatch({
	'when schema is valid': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValid));
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
	'when schema is invalid': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalid));
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
