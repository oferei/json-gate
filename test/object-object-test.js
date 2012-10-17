// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

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
			type: 'string',
			required: true
		},
		obj1: {
			type: 'object',
			required: true,
			properties: {
				num: {
					type: 'number',
					required: true
				},
				obj2: {
					type: 'object',
					required: true,
					properties: {
						bool: {
							type: 'boolean',
							required: true
						},
						obj3: {
							type: 'object',
							required: true,
							properties: {
								str: {
									type: 'string',
									required: true
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
	'when validating nested object': objectShouldBeValid(obj, schemaValid)
}).export(module);
