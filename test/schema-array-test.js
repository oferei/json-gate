// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var schemaValidItems = {
	type: 'array',
	items: { type: 'string' }
};

var schemaValidItemsTuple = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' },
		{ type: 'integer' },
		{ type: 'boolean' }
	]
};

var schemaValidItemsTupleWithProperties = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' },
		{
			type: 'object',
			properties: {
				str: { type: 'string' },
				num: { type: 'number' }
			}
		},
		{ type: 'integer' }
	]
};

var schemaInvalidItemsString = {
	type: 'array',
	items: 'string'
};

var schemaInvalidItemsArray = {
	type: 'array',
	items: ['string', 'integer']
};

var schemaInvalidItemsInvalidSchema = {
	type: 'array',
	items: { type: 3 }
};

var schemaInvalidItemsTupleWithInvalidProperties = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' },
		{
			type: 'object',
			properties: {
				str: { type: 'string' },
				num: { type: 3 }
			}
		},
		{ type: 'integer' }
	]
};

var schemaValidAdditionalItems = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: { type: 'boolean' }
};

var schemaValidAdditionalItemsInvalidSchema = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: { type: 3 }
};

var schemaValidNoAdditionalItems = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: false
};

var schemaInvalidAdditionalItemsTrue = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: true
};

var schemaSuperfluousAdditionalItemsNonTuple = {
	type: 'array',
	items: { type: 'string' },
	additionalItems: false
};

vows.describe('Schema Array').addBatch({
	'when items is a schema': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidItems));
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
	'when items is a tuple': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidItemsTuple));
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
	'when items is a tuple containing properties': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidItemsTupleWithProperties));
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
	'when items is a string': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidItemsString));
			} catch(err) {
				this.callback(err);
			}
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
	'when items is an array': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidItemsArray));
			} catch(err) {
				this.callback(err);
			}
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
	'when items is an invalid schema': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidItemsInvalidSchema));
			} catch(err) {
				this.callback(err);
			}
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
	'when items array contains an invalid schema': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidItemsTupleWithInvalidProperties));
			} catch(err) {
				this.callback(err);
			}
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
	'when additionalItems is a valid schema': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidAdditionalItems));
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
	'when additionalItems is an invalid schema': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidAdditionalItemsInvalidSchema));
			} catch(err) {
				this.callback(err);
			}
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
	'when additionalItems is false': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValidNoAdditionalItems));
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
	'when additionalItems is true': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidAdditionalItemsTrue));
			} catch(err) {
				this.callback(err);
			}
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
	'when additionalItems is provided although items is not a tuple': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaSuperfluousAdditionalItemsNonTuple));
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
