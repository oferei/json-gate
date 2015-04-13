# json-gate

_json-gate_ validates JSON objects against a JSON schema.
In other words, it makes sure an object conforms to the type and structure that your code expects.
For example, a server can use it to ensure input received from a client conforms to the API.

The JSON schema can also help with documentation and collaboration.
Copy it to your API document and everybody should understand exactly what is expected.

_json-gate_ likes you! It is...

* Intuitive - API is super easy to use.
* Produces human-friendly, detailed error messages - for both you and your customers.
* Fast - Your CPU won't have time to blink.
* Well documented, in case you don't feel like digging into the IETF specifications.
Just keep reading, it's all here.
* Conforms to standard - no relearning, no obligation, no surprises.
* Both synchronous and asynchronous modes - your choice.

## What's a JSON schema?

[JSON Schema](http://json-schema.org/) is a proposed Internet draft defining a JSON media type (application/schema+json) with the following goals:

* Validation - You can use JSON Schema to validate your JSON data.
* Documentation - You can extract documentation information from a JSON Schema, match this documentation to your data, and use that information for user interaction.
* Hyperlinking - You can pair your JSON data with the defining JSON Schema to build hyperlinks into parts of that JSON data.

_json-gate_ supports most of [JSON Schema Draft 3](http://tools.ietf.org/html/draft-zyp-json-schema-03), minus the hyperlinking and hyper schema parts.

## Example

    var createSchema = require('json-gate').createSchema;

    var schema = createSchema({
    	type: 'object',
    	properties: {
    		query: {
    			type: 'string',
                minLength: 1,
                maxLength: 64,
    			required: true
    		},
    		maxResults: {
    			type: 'integer',
    			maximum: 20,
    			default: 10
    		}
    	},
        additionalProperties: false
    });

    try {
        schema.validate(input);
    } catch(err) {
        return res.send(400, err); // 400 Bad Request
    }

This schema is explained below in the _Hello, schema_ section.

## Installation

    $ npm install json-gate

## Usage

### _json-gate.createSchema_(jsonSchema)

This function gets a JSON Schema definition and returns a new _Schema_ object.
It verifies that the schema is valid.
If the latter is malformed an error will be thrown pinpointing the problem.

### _Schema.validate_(jsonObject)

This function gets a JSON object and validates it against the schema.
If the JSON object does not conform to the schema an error will be thrown (or returned, see _Synchronous/Asynchronous_ below).

The function stops after encountering an error. It does not return multiple errors.
The function does not return a value.
Be aware that the input JSON object may be edited _in-place_ if the _default_ attribute is used.

### Errors

The error messages are human-friendly and detailed.
For example: "JSON object property 'user.password': length is 3 when it should be at least 6".
Ready to be shrink-wrapped in a _400 Bad Request_ response and shipped to the client!

Equaly helpful error messages are produced in the case of a malformed schema, to assist you during development.
For example: "Schema property 'num': 'exclusiveMaximum' attribute is a number when it should be a boolean".

### Synchronous/Asynchronous

_Schema.validate_ can be called in two ways, to suit your needs:

* Synchronously - as in the example above, with one parameter.
As already stated, it returns nothing if the object checks out. Otherwise it throws an error.
* Asynchronously - by providing a 2nd parameter: a callback function.
The callback function gets two arguments: error and result (the original JSON object, which may be modified).

It should be noted that the JSON object passed to the callback function is the same as the input JSON object.
It is only passed for convenience.
Any _default_ values used will affect the original JSON object, even when calling asynchronously.

## Hello, schema

A _JSON schema_ is defined using a JavaScript object containing various _attributes_.

Let's start by analyzing the schema given in the example above.
What does it say about the JSON object?

* The JSON object should be an object (as opposed to an array).
* It should have a property named _query_, which should be a string of 1 to 64 characters.
* It may optionaly have a property named _maxResults_, which should be an integer with a maximum value of 20.
* If _maxResults_ is missing, it will be generated with a value of 10.
* Additional properties (other than _query_ and _maxResults_) are not allowed.

JSON Schema properties can be nested: objects and arrays include other attributes, which may themselves be objects and arrays.
Notice that objects' properties are unordered, whereas array items are ordered.

See Attributes section below to learn about more possibilities.

## Attributes

Below are all the supported attributes.

Terminology: in this section, *instance* refers to a JSON value (object or property) that the schema will be describing and validating.

### type

Defines the expected instance type.
It can take one of two forms:

* Simple type - any of the following: 'string', 'number', 'integer', 'boolean', 'object', 'array', 'null' or 'any'.
* Union type - an array of simple types and/or schemas. The instance type should be one of the types in the array.

Example - instance should be either a string or null:

    type: ['string', 'null']

The default is 'any'.

### disallow

Defines the disallowed instance type. This is the opposite of _type_.
It can take one of two forms:

* Simple type - any of the following: 'string', 'number', 'integer', 'boolean', 'object', 'array', 'null' or 'any'.
* Union type - an array of simple types and/or schemas. The instance type should not be any of the types in the array.
For example, if _type_ is ['string', 'null'] then the instance may be neither a string nor null.

### required

A boolean indicating whether an instance is mandatory (true) or optional (false).

Example with a mandatory property and an optional one:

    {
        type: 'object',
        properties: {
            query: {
                type: 'string',
                required: true
            },
            safeSearch: {
                type: 'string',
                enum: ['off', 'moderate', 'strict']
            }
        }
    }

The default is false (optional).

### default

Defines the default value of the instance when the instance is undefined.

Example:

    maxResults: {
        type: 'integer',
        default: 10
    }

The JSON object is edited in-place.
In other words, the default values are set to the original JSON object, not a returned copy.

### enum

An array containing all possible values.
The instance must equal one of the values.

Example:

    enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

### properties

Applies only to instances of type `'object'`.

Defines the properties of the instance object.
The _properties_ attribute is an object, matching properties to their valid schema.

Example:

    {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'integer' }
        }
    }

The default is an empty object.

Note: Properties are considered unordered, the order of the instance properties may be in any order.

### patternProperties

Applies only to instances of type `'object'`.

This attribute is similar to the _properties_ attribute, but the keys are regular expression patterns instead of property names.
Any instance property whose name fits a pattern must be valid against the appropriate schema.

Example:

    {
        type: 'object',
        patternProperties: {
            '^sz': { type: 'string' },
            '^n': { type: 'number' },
            '^b': { type: 'boolean' }
        }
    }

Note that using this attribute may cause instances to be validated more than once:

* If a property name is defined by _properties_ and also matches a pattern in _patternProperties_.
* If a property name matches more than one pattern in _patternProperties_.

### additionalProperties

Applies only to instances of type `'object'`.

Defines a schema for all properties that are not explicitly defined by _properties_ and do not match any pattern in _patternProperties_.
It can take one of two forms:

* Schema - all the additional properties must be valid against the schema.
* False - additional properties are not allowed.

Example:

    {
        type: 'object',
        properties: {
            id: 'integer',
            name: 'string'
        },
        patternProperties: {
            '^_debug': { type: 'any' }
        },
        additionalProperties: false
    }

The default is an empty schema, which allows any value for additional properties.

### dependencies

Applies only to instances of type `'object'`.

This attribute is an object, matching properties to their requirements.
If the instance object has a property with the same name as a property in the _dependencies_ attribute object,
then the instance must comply with the requirement.

The requirement can take one of three forms:

* Simple dependency - a string.
The instance object must have a property with the same name as the requirement.
Example: `dependencies: { start: 'finish' }`.
Means that if an instance has a property 'start', it must also have a property 'finish'.
* Simple dependency tuple - an array of strings.
The instance object must have a property with the same name as each string in the requirement's array.
Example: `dependencies: { towel: [ 'toothbrush', 'soap', 'space suit' ]}`.
Means that if an instance has a property 'towel', it must also have properties 'toothbrush', 'soap' and 'space suit'.
* Schema dependency - a schema.
The instance object must be valid against the schema.
Example: `dependencies: { 'cuba-libre': { properties: { glass: { format: 'highball', required: true }}}}`
Means that if an instance has a property 'cuba-libre', it must also have a property 'glass' with a 'highball' format.

### items

Applies only to instances of type `'array'`.

Defines the items of the instance array.
It can take one of two forms:

* Schema - all the items in the array must be valid against the schema.
* Tuple typing - an array of schemas.
Each position in the instance array must conform to the schema in the corresponding position for this array.
The instance array is not required to contain all defined items.
Additional items are allowed, disallowed, or constrained by the _additionalItems_ attribute.

### additionalItems

Applies only to instances of type `'array'`, and only together with the _tuple typing_ form of the _items_ attribute.

_additionalItems_ defines the behavior when there are more items in the instance array than in the _items_ array.
It can take one of two forms:

* Schema - all the additional items must be valid against the schema.
* False - additional items are not allowed.

Example - a string, an integer and the rest are booleans:

    {
        type: 'array',
        items: [
            { type: 'string' },
            { type: 'integer' }
        ],
        additionalItems: { type: 'boolean' }
    }

The default is an empty schema, which allows additional items of any type.

### minItems

Applies only to instances of type `'array'`.

Defines the minimum number of values in an array.

### maxItems

Applies only to instances of type `'array'`.

Defines the maximum number of values in an array.

### uniqueItems

Applies only to instances of type `'array'`.

A boolean that indicates whether all items in the array instance must be unique (contains no two identical values).

### minLength

Applies only to instances of type `'string'`.

Defines the minimum length of the string.

### maxLength

Applies only to instances of type `'string'`.

Defines the maximum length of the string.

### pattern

Applies only to instances of type `'string'`.

A string containing a regular expression.
The instance string must match it.

Example:

    youtubeVideoId: {
        type: 'string',
        pattern: '^[A-Za-z0-9_-]{11}$'
    }

### minimum

Applies only to instances of type `'number'`.

Defines the minimum value of the instance property.

### exclusiveMinimum

Applies only to instances of type `'number'`, and only together with the _minimum_ attribute.

Defines the behavior of the _minimum_ attribute:

* when true, _minimum_ is exclusive ("greater than")
* when false, _minimum_ is inclusive ("greater than or equal")

Example:

    rand: {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: false,
        maximum: 1,
        exclusiveMaximum: true
    }

The default is false.

### maximum

Applies only to instances of type `'number'`.

Defines the maximum value of the instance property.

### exclusiveMaximum

Applies only to instances of type `'number'`, and only together with the _maximum_ attribute.

Defines the behavior of the _maximum_ attribute:

* when true, _maximum_ is exclusive ("less than")
* when false, _maximum_ is inclusive ("less than or equal")

Example:

    rand: {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: false,
        maximum: 1,
        exclusiveMaximum: true
    }

The default is false.

### divisibleBy

Applies only to instances of type `'number'`.

Defines what value the number instance must be divisible by with no remainder.
This value may not be 0.

### format

Applies only to instances of types `'string'` or `'number'`.

Defines the expected instance format.

Available formats:

* date-time - A string containing a date in ISO 8601 format of YYYY-MM-DDThh:mm:ss[.fraction]Z in UTC time.
The decimal fraction is optional and the decimal dot can be replaced with a comma.
Example: `'2012-11-06T09:13:24Z'`.
* date - A string containing a date in the format of YYYY-MM-DD.
Example: `'2012-11-06'`.
* time - A string containing a time in the format of hh:mm:ss.
Example: `'09:13:24'`.
* utc-millisec - A number or an integer containing the number of milliseconds that have elapsed since midnight UTC, 1 January 1970.
* regex - A string containing a regular expression, following the regular expression specification from ECMA 262.
Example: `'^[0-9]{5}-[0-9]{4}$'`.
* color - A string containing a CSS color, based on CSS 2.1 [W3C.CR-CSS21-20070719].
Examples: `'red'`, `'#FF9900'`, `'f90'`, `'rgb(64, 224, 208)'`, `'rgb(100%, 0%, 25%)'`.
* phone - A string containing a national or international phone number, based on E.123.
No hypens allows, only spaces.
Examples: `'(42) 123 4567'`, `'+31 42 123 4567'`.
* uri - A string containing a URI.
Example: `'https://github.com/oferei/json-gate'`.
* email - A string containing an email address.
Example: `'thepope@gmail.com'`.
* ip-address - A string containing an ip version 4 address.
Example: `'192.168.1.1'`.
* ipv6 - A string containing an ip version 6 address.
Example: `'2001:0db8:85a3:0042:0000:8a2e:0370:7334'`.
* host-name - A string containing a host-name.
Example: `'github.com'`.

Note: Unknown formats are silently ignored.

### title

A string that provides a short description of instance property.

It allows to document the JSON schema.
It has no effect on the validation process.

Example:

    postalPlusFourCode: {
        title: 'ZIP+4 code',
        description: 'Zip+4 code: 5 digits dash 4 digits',
        type: 'string',
        pattern: '^[0-9]{5}-[0-9]{4}$'
    }

### description

A string that provides a full description of the purpose of the instance property.

It allows to document the JSON schema.
It has no effect on the validation process.

Example:

    {
        description: 'A person',
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'integer' }
        }
    }

## License

(The MIT License)

Copyright (c) 2012 Ofer Reichman

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
