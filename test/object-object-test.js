// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var obj = {
	str: 'top',
	obj1: {
		num: 42,
		obj2: {
			bool: false,
			obj3: {
				str: 'you are here'
			}
		}
	}
};

var schemaValid = {
	type: 'object',
	properties: {
		str: {
			type: 'string'
		},
		obj1: {
			type: 'object',
			properties: {
				num: {
					type: 'number'
				},
				obj2: {
					type: 'object',
					properties: {
						bool: {
							type: 'boolean'
						},
						obj3: {
							type: 'object',
							properties: {
								str: {
									type: 'string'
								}
							}
						}
					}
				}
			}
		}
	}
};

vows.describe('Object Object').addBatch({
	'when validating nested object': {
		topic: function () {
			var schema = createSchema(schemaValid);
			schema.validate(obj, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).export(module);
