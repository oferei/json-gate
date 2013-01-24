// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var schemaSimple = {
	type: 'string'
};

vows.describe('Object Basic').addBatch({
	'when calling without an object': {
		topic: function () {
			var schema = createSchema(schemaSimple);
			try {
				schema.validate(undefined);
				this.callback(null);
			} catch(err) {
				this.callback(err);
			}
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.not.exist(result);
		}
	}
}).export(module);
