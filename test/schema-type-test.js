// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var schemaValid = {
	type: 'object',
	properties: {
		str: {
			type: 'string'
		},
		num: {
			type: 'number'
		},
		int: {
			type: 'integer'
		},
		bool: {
			type: 'boolean'
		},
		obj: {
			type: 'object'
		},
		arr: {
			type: 'array'
		},
		z: {
			type: 'null'
		},
		value: {
			type: 'any'
		}
	}
};

var schemaInvalid = {
	type: 'object',
	properties: {
		seven: {
			type: 7
		}
	}
};

var schemaSimpleUnionType = {
	type: 'object',
	properties: {
		nullable: {
			type: ['string', 'null']
		}
	}
};

var schemaInvalidUnionTypeWithOnlyOne = {
	type: 'object',
	properties: {
		schizo: {
			type: ['string']
		}
	}
};

var schemaUnionTypeWithValidSchema = {
	type: 'object',
	properties: {
		deep: {
			type: ['string',
				{
					type: 'object',
					properties: {
						num: {
							type: 'number'
						}
					}
				}
			]
		}
	}
};

var schemaUnionTypeWithInvalidSchema = {
	type: 'object',
	properties: {
		deep: {
			type: ['string',
				{
					type: 'object',
					properties: {
						num: {
							type: 'number',
							minimum: 'dog'
						}
					}
				}
			]
		}
	}
};

vows.describe('Schema Type').addBatch({
	'when attributes are all simple types': {
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
	'when attribute is neither a string nor an array': {
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
}).addBatch({
	'when attribute is a union type with simple types': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaSimpleUnionType));
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
	'when attribute is a union type with only one simple type': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalidUnionTypeWithOnlyOne));
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
	'when attribute is a union type with a valid schema': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaUnionTypeWithValidSchema));
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
	'when attribute is a union type with an invalid schema': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaUnionTypeWithInvalidSchema));
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
