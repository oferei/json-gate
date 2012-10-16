// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var schemaNotAnObject = 'not-an-object';

var schemaWithoutType = {
};

var schemaInvalidType = {
	type: 123
};

var schemaInappropriateType = {
	type: 'string'
};

var schemaEmptyObject = {
	type: 'object'
};

var schemaEmptyArray = {
	type: 'array'
};

vows.describe('Schema Basic').addBatch({
	'when schema is undefined': {
		topic: function () {
			try {
				this.callback(null, createSchema(undefined));
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
	'when schema is not an object': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaNotAnObject));
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
	'when type attribue is missing': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaWithoutType));
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
	'when type attribute is not a string': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidType));
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
	'when type attribute is neither \'object\' nor \'array\'': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInappropriateType));
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
	'when type attribute is \'object\'': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaEmptyObject));
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
	'when type attribute is \'array\'': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaEmptyArray));
			} catch(err) {
				this.callback(err);
			}
		},
		'we get no error': function (err, schema) {
			should.not.exist(err);
			should.exist(schema);
		}
	}
}).export(module);
