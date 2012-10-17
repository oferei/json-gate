// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var objString = {
	nullable: 'I am'
};

var objNull = {
	nullable: null
};

var objInteger = {
	nullable: 42
};

var schemaUnionType = {
	type: 'object',
	properties: {
		nullable: {
			disallow: ['string', 'null']
		}
	}
};

var objMan = {
	nullable: {
		name: 'John',
		age: 42
	}
};

var objWoman = {
	nullable: {
		name: 'Jane',
		age: 'confidential'
	}
};

var objAlien = {
	nullable: {
		name: 'Paul',
		age: true
	}
}

var schemaHuman = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			required: true
		},
		age: {
			type: ['integer', 'string'],
			required: true
		}
	}
};

var schemaUnionTypeWithSchema = {
	type: 'object',
	properties: {
		nullable: {
			disallow: ['string', 'null', schemaHuman],
			required: true
		}
	}
};

vows.describe('Object Type').addBatch({
	'when a string is passed for neither a string nor a null': {
		topic: function () {
			var schema = createSchema(schemaUnionType);
			schema.validate(objString, this.callback);
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
	'when a null is passed for neither a string nor a null': {
		topic: function () {
			var schema = createSchema(schemaUnionType);
			schema.validate(objNull, this.callback);
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
	'when trying to pass an integer for neither a string nor a null': {
		topic: function () {
			var schema = createSchema(schemaUnionType);
			schema.validate(objInteger, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).addBatch({
	'when a string is passed for neither a string nor a null nor a human': {
		topic: function () {
			var schema = createSchema(schemaUnionTypeWithSchema);
			schema.validate(objString, this.callback);
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
	'when a null is passed for neither a string nor a null nor a human': {
		topic: function () {
			var schema = createSchema(schemaUnionTypeWithSchema);
			schema.validate(objNull, this.callback);
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
	'when a man is passed for neither a string nor a null nor a human': {
		topic: function () {
			var schema = createSchema(schemaUnionTypeWithSchema);
			schema.validate(objMan, this.callback);
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
	'when a woman is passed for neither a string nor a null nor a human': {
		topic: function () {
			var schema = createSchema(schemaUnionTypeWithSchema);
			schema.validate(objWoman, this.callback);
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
	'when trying to pass an alien for neither a string nor a null nor a human': {
		topic: function () {
			var schema = createSchema(schemaUnionTypeWithSchema);
			schema.validate(objAlien, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error);
		}
	}
}).export(module);
