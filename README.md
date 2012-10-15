# jsonly

_jsonly_ validates JSON objects against a JSON schema.
In other words, it makes sure an object conforms to the type and structure that your code expects.

For example, a server can use it to ensure input from a client conforms to the API.
The JSON schema can also help with documentation and collaboration. Copy it to your API document and everybody should understand exactly what is expected.

_jsonly_ is extremely easy to use:
* A single function call
* Both synchronous and asynchronous modes
* Conforms to standard - no surprises
* Well documented, in case you don't feel like digging into the IETF specifications

# What's a JSON schema?

[JSON Schema](http://json-schema.org/) is a proposed Internet draft defining a JSON media type (application/schema+json) with the following goals:
* Validation - You can use JSON Schema to validate your JSON data.
* Documentation - You can extract documentation information from a JSON Schema, match this documentation to your data, and use that information for user interaction.
* Hyperlinking - You can pair your JSON data with the defining JSON Schema to build hyperlinks into parts of that JSON data.

_jsonly_ supports most of [JSON Schema Draft 3](http://tools.ietf.org/html/draft-zyp-json-schema-03), without the hyperlinking part.

## Example

    var schema = {
    	type: 'object',
    	properties: {
    		query: {
    			type: 'string',
    			maxLength: 32,
    			required: true
    		},
    		maxResults: {
    			type: 'integer',
    			maximum: 20,
    			default: 10
    		}
    	}
    };

    try {
    	input = jsonly(input, schema);
    } catch(err) {
    	return res.send(400, err.message); // 400 Bad Request
    }

## Installation

    $ npm install jsonly

## Usage

_jsonly_ receives an object and a schema.
Its output is either the (possibly modified) object, or the first encountered error.

### Errors

The error message is user-friendly and detailed.
For example, 'Property 'user.password' length is 3 when it should be at least 6'.
Ready to be wrapped in a 400 Bad Request response!

_jsonly_ throws the following errors:
* _TypeError_ if object/property is missing or is the wrong type
* _RangeError_ if object value is outside of its valid range
* _SyntaxError_ if schema syntax is invalid

### Synchronous/Asynchronous

_jsonly_ may be called synchronously, as in the example above, with two parameters.
It then returns the object or throws an error.

_jsonly_ may also be called asynchronously by providing a 3rd parameter - a callback function.
The callback function gets two arguments: error and result.

## Hello schema

A _schema_ is defined as a JavaScript object containing various _attributes_.

Let's start by analyzing the schema given in the example above.
* The top type is an object (as opposed to an array)
* It should have a property named _query_, which should be a string of up to 32 characters
* It may optionaly have a property named _maxResults_, which should be an integer with a maximum value of 20
* If _maxResults_ is missing, it will be generated with the value 10

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
