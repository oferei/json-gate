var should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

exports.schemaShouldBeValid = function (schema) {
	return {
		topic: function () {
			try {
				this.callback(null, createSchema(schema));
			} catch(err) {
				this.callback(err);
			}
		},
		'we get no error': function (err, schema) {
			should.not.exist(err);
			should.exist(schema);
			schema.should.not.be.instanceof(Error); // can't trust vows
		}
	};
}

exports.schemaShouldBeInvalid = function (schema) {
	return {
		topic: function () {
			try {
				this.callback(null, createSchema(schema));
			} catch(err) {
				this.callback(err);
			}
		},
		'we get an error': function (err, schema) {
			should.exist(err);
			err.should.be.instanceof(Error); // can't trust vows
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	};
}
