# jsonly

_jsonly_ validates JSON objects against a JSON schema.
In other words, it makes sure an object conforms to the type and structure that your code expects.
For example, a server can use it to ensure input received from a client conforms to the API.

The JSON schema can also help with documentation and collaboration. Copy it to your API document and everybody should understand exactly what is expected.

_jsonly_ is extremely easy to use:
* Intuitive - one function to create a schema, one function to use it
* Both synchronous and asynchronous modes - your choice
* Conforms to standard - no surprises
* Well documented, in case you don't feel like digging into the IETF specifications

# What's a JSON schema?

[JSON Schema](http://json-schema.org/) is a proposed Internet draft defining a JSON media type (application/schema+json) with the following goals:
* Validation - You can use JSON Schema to validate your JSON data.
* Documentation - You can extract documentation information from a JSON Schema, match this documentation to your data, and use that information for user interaction.
* Hyperlinking - You can pair your JSON data with the defining JSON Schema to build hyperlinks into parts of that JSON data.

_jsonly_ supports most of [JSON Schema Draft 3](http://tools.ietf.org/html/draft-zyp-json-schema-03), without the hyperlinking part.

## Example

    var createSchema = require('jsonly').createSchema;

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
    	}
    });

    try {
        schema.validate(input);
    } catch(err) {
        return res.send(400, err); // 400 Bad Request
    }

## Installation

    $ npm install jsonly

## Usage

The first call is to _jsonly.createSchema_, which gets a JSON Schema definition and creates a new _Schema_ object.
This function may throw an error if the JSON Schema is malformed.
The error message will describe exactly what part is invalid.

The second call is to _Schema.validate_, which gets an object and validates it.
This function returns/throws the first encountered error, if any.
The input object may be edited _in-place_ if the _default_ attribute is used.

### Errors

The error messages are human-friendly and detailed.
For example, "JSON object property 'user.password': length is 3 when it should be at least 6".
Ready to be shrink-wrapped and shipped in a 400 Bad Request response!

### Synchronous/Asynchronous

_Schema.validate_ can be used in both ways, as you prefer.

_Schema.validate_ may be called synchronously, as in the example above, with two parameters.
It returns nothing if ok. Otherwise it throws an error.

_Schema.validate_ may also be called asynchronously by providing a 3rd parameter - a callback function.
The callback function gets two arguments: error and result (the original object, which may be modified).

## Hello schema

A _schema_ is defined as a JavaScript object containing various _attributes_.

Let's start by analyzing the schema given in the example above.
* The top type is an object (as opposed to an array)
* It should have a property named _query_, which should be a string with between 1 and 64 characters
* It may optionaly have a property named _maxResults_, which should be an integer with a maximum value of 20
* If _maxResults_ is missing, it will be generated with a value of 10

See Attributes section below to learn about more possibilities.

JSON Schema has recursive capabilities. Objects and arrays include other attributes, which may be objects and arrays.

## Attributes

Below are all the supported attributes.

### type

Defines the expected type of the object or property. Simple types: string, number, integer, boolean, object, array, null, any.

The default is 'any'.
The top level type must be either 'object' or 'array'.

The _type_ may alternatively be an array of simple types or schemas. In this case the object should be one of the types in the array.
For example, if _type_ is ['string', 'null'] then the object may be either a string or null.

### required

(array)
items
minItems
maxItems
uniqueItems

(object)
properties
patternProperties
additionalProperties
dependencies

(number)
minimum
exclusiveMinimum
maximum
exclusiveMaximum
divisibleBy

(string)
minLength
maxLength
pattern

(item)
format
default

(any)
enum
disallow
