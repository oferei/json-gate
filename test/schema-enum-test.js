// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var schemaValidEnum = {
	type: 'object',
	properties: {
		prop: {
			enum: []
		}
	}
};

var schemaInvalidEnum = {
	type: 'object',
	properties: {
		prop: {
			enum: {}
		}
	}
};

vows.describe('Schema Enum').addBatch({
	'when enum attribute is an array': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidEnum));
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
	'when enum attribute is not an array': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidEnum));
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
	