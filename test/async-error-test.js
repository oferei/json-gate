// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

var schemaSimple = {
	type: 'string'
};

vows.describe('Async Error').addBatch({
	'when object is valid and callback does not throw an error': {
		topic: function () {
			var schema = createSchema(schemaSimple);
			var count = 0;
			try {
				schema.validate('a string', function nice() {
					++count;
					if (count === 1) {
						// do nothing, play nice
					} else {
						this.callback(new Error('Callback was called twice'));
					}
				}.bind(this));
				this.callback();
			} catch(err) {
				this.callback(err);
			}
		},
		'we get no error': function (err, result) {
			if (err) {
				console.error(err.toString());
			}
			should.not.exist(err);
			should.not.exist(result);
		}
	},
	'when object is valid and callback throws an error': {
		topic: function () {
			var schema = createSchema(schemaSimple);
			var count = 0;
			try {
				schema.validate('a string', function naughty() {
					++count;
					if (count === 1) {
						throw new Error('I am a naughty callback function');
					} else {
						this.callback(new Error('Callback was called twice'));
					}
				}.bind(this));
				this.callback(new Error('we did not get an error'));
			} catch(err) {
				// error is expected
				this.callback();
			}
		},
		'we get an error': function (err, result) {
			if (err) {
				console.error(err.toString());
			}
			should.not.exist(err);
			should.not.exist(result);
		}
	},
	'when object is invalid and callback throws an error': {
		topic: function () {
			var schema = createSchema(schemaSimple);
			var count = 0;
			try {
				schema.validate(42, function naughty() {
					++count;
					if (count === 1) {
						throw new Error('I am a naughty callback function');
					} else {
						this.callback(new Error('Callback was called twice'));
					}
				}.bind(this));
				this.callback(new Error('we did not get an error'));
			} catch(err) {
				// error is expected
				this.callback();
			}
		},
		'we get an error': function (err, result) {
			if (err) {
				console.error(err.toString());
			}
			should.not.exist(err);
			should.not.exist(result);
		}
	}
}).export(module);
