// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var objWithoutProperty = {
};

var origValue = 'I am';

var objWithProperty = {
	str: origValue
};

var defaultValue = 'the-default-value';

var schemaWithDefault = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: defaultValue
		}
	}
};

vows.describe('Object Default').addBatch({
	'when property exists': {
		topic: function () {
			var schema = createSchema(schemaWithDefault);
			schema.validate(objWithProperty, this.callback);
		},
		'it is not changed': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.have.property('str', origValue);
		}
	}
}).addBatch({
	'when property is missing': {
		topic: function () {
			var schema = createSchema(schemaWithDefault);
			schema.validate(objWithoutProperty, this.callback);
		},
		'we get the default value in-place': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.equal(objWithoutProperty);
			result.should.have.property('str', defaultValue);
		}
	}
}).export(module);
