// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
    objectShouldBeValid = common.objectShouldBeValid,
    objectShouldBeInvalid = common.objectShouldBeInvalid;

var objA = {
    'creditcard': '123'
};

var objB = {
    'token': '123'
};

var objC = {
    'nothing': 1
};

var schemaSimpleSchema = {
    type: 'object',
    atLeastOne: ['creditcard', 'token'],
    properties: {
        creditcard: {
            type: 'string'
        },
        token: {
            type: 'string'
        }
    }
};

var objAA = {
    'three': '123'
};

var objAB = {
    'one': '123',
    'two': '123'
};

var objAC = {
    'one': '123',
    'two': '123',
    'three': '123'
};

var objAD = {};

var schemaSchema = {
    type: 'object',
    atLeastOne: ['one', 'two', 'three'],
    properties: {
        one: { type: 'string' },
        two: { type: 'string' },
        three: { type: 'string' },
        four: { type: 'string' }
    }
};

vows.describe('Object atLeastOne').addBatch({
    'when simple atLeastOne is satisfied': objectShouldBeValid(objA, schemaSimpleSchema),
    'when simple atLeastOne is satisfied': objectShouldBeValid(objB, schemaSimpleSchema),
    'when simple atLeastOne is not satisfied': objectShouldBeInvalid(objC, schemaSimpleSchema, { errMsg: 'JSON object property \'creditcard,token\' at least one is required' }),
    'when atLeastOne is satisfied': objectShouldBeValid(objAA, schemaSchema),
    'when atLeastOne is satisfied': objectShouldBeValid(objAB, schemaSchema),
    'when atLeastOne is satisfied': objectShouldBeValid(objAC, schemaSchema),
    'when atLeastOne is not satisfied': objectShouldBeInvalid(objAD, schemaSchema, { errMsg: 'JSON object property \'one,two,three\' at least one is required' }),
}).export(module);
