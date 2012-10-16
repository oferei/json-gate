// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var schemaValidMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 3.14
		}
	}
};

var schemaInvalidMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: '3.14'
		}
	}
};

var schemaValidExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			exclusiveMinimum: true
		}
	}
};

var schemaInvalidExclusiveMinimum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			minimum: 108,
			exclusiveMinimum: 'true'
		}
	}
};

var schemaValidMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 3.14
		}
	}
};

var schemaInvalidMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: '3.14'
		}
	}
};

var schemaValidExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			exclusiveMaximum: true
		}
	}
};

var schemaInvalidExclusiveMaximum = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			maximum: 108,
			exclusiveMaximum: 'true'
		}
	}
};

var schemaValidDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: 3.14
		}
	}
};

var schemaInvalidDivisibleBy = {
	type: 'object',
	properties: {
		num: {
			type: 'number',
			divisibleBy: '3.14'
		}
	}
};

vows.describe('Schema Number').addBatch({
	'when minimum attribute is a number': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidMinimum));
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
	'when minimum attribute is not a number': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidMinimum));
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
	'when exclusiveMinimum attribute is a boolean': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidExclusiveMinimum));
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
	'when exclusiveMinimum attribute is not a boolean': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidExclusiveMinimum));
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
	'when maximum attribute is a number': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidMaximum));
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
	'when maximum attribute is not a number': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidMaximum));
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
	'when exclusiveMaximum attribute is a boolean': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidExclusiveMaximum));
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
	'when exclusiveMaximum attribute is not a boolean': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidExclusiveMaximum));
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
	'when divisibleBy attribute is a number': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidDivisibleBy));
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
	'when divisibleBy attribute is not a number': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidDivisibleBy));
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
