// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var schemaValid = {
	type: 'object',
	properties: {
		str: {
			disallow: 'string'
		},
		num: {
			disallow: 'number'
		},
		int: {
			disallow: 'integer'
		},
		bool: {
			disallow: 'boolean'
		},
		obj: {
			disallow: 'object'
		},
		arr: {
			disallow: 'array'
		},
		z: {
			disallow: 'null'
		},
		value: {
			disallow: 'any'
		}
	}
};

var schemaInvalid = {
	type: 'object',
	properties: {
		seven: {
			disallow: 7
		}
	}
};

var schemaSimpleUnionType = {
	type: 'object',
	properties: {
		nullable: {
			disallow: ['string', 'null']
		}
	}
};

var schemaInvalidUnionTypeWithOnlyOne = {
	type: 'object',
	properties: {
		schizo: {
			disallow: ['string']
		}
	}
};

var schemaUnionTypeWithValidSchema = {
	type: 'object',
	properties: {
		deep: {
			disallow: ['string',
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
			disallow: ['string',
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

vows.describe('Schema Disallow').addBatch({
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
