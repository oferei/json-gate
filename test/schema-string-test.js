// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var schemaValidMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 3
		}
	}
};

var schemaInvalidMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 3.14
		}
	}
};

var schemaValidMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 3
		}
	}
};

var schemaInvalidMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 3.14
		}
	}
};

var schemaValidPattern = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			pattern: '^Hello, JSON$'
		}
	}
};

var schemaInvalidPattern = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			pattern: {hello: 'JSON'}
		}
	}
};

vows.describe('Schema String').addBatch({
	'when minLength attribute is an integer': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidMinLength));
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
	'when minLength attribute is not an integer': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidMinLength));
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
}).addBatch({
	'when maxLength attribute is an integer': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidMaxLength));
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
	'when maxLength attribute is not an integer': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidMaxLength));
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
}).addBatch({
	'when pattern attribute is a string': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidPattern));
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
	'when pattern attribute is not a string': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidPattern));
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
