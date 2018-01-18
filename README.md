<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=200" width="127px" height="127px" align="left"/>

# CadU Javascript Library

A JavaScript library to interface with CadU API, it works in Node.js and Browser (in development).

<br>

<a href="https://travis-ci.org/pagarme/cadu-js" >
  <img src="https://travis-ci.org/pagarme/cadu-js.svg?branch=master" align="left" />
</a>

<br>

## Description

This library covers all your needs for integrating with CadU, providing:

* A clean Promise-based interface for all endpoints in CadU API
* The library was create using (mappersmith)[https://github.com/mappersmith/]

## How to use

First, install it:

```bash
yarn add cadu
```

Or using npm:

```bash
npm install cadu
```

CadU JavaScript library can be used in two ways:

### Node.js

Import like usual:

```js
import cadu from 'cadu'
```

also works using `require`:

```js
const cadu = require('cadu')
```

### Browser (CommonJS) [In Development]

Import the browser build:

```js
import cadu from 'cadu/browser'
```

also works using `require`:

```js
const cadu = require('cadu/browser')
```

### Client API

All of CadU REST API endpoints are covered in the `client` object. Every
function call issued to `client` will return a `Promise` which represents and
manages the result's lifecycle.

### Using `connect`

When you call `connect`, a `Promise` which resolves to a `client` or an
error will be returned. If an authentication error happens, you can catch
the error with the `Promise` interface:

```javascript
import cadu from 'cadu'

cadu.client.connect({ 
  secret: '1234', 
  clientApplicationKey: '1234-1234-1234', 
  environment: 'sandbox', 
  userIdentifier: 'pagarme@pagar.me',
})
  .then(client => client.Members.all())
  .then(console.log)
  .catch(console.error)
```

As the entire library is based on promises, you can also use ES6 generators
with every call to make code more procedural:

```javascript
import cadujs from 'cadu-js'

let client

try {
  client = yield cadujs.client.connect({
    secret: '1234', 
    clientApplicationKey: '1234-1234-1234', 
    environment: 'sandbox', 
    userIdentifier: 'pagarme@pagar.me',
  })
} catch (err) {
  console.log(err)
}
  
try {
  const members = yield client.Members.all()
  console.log(members)
} catch (err) {
  console.log(err)
}
```

The downside of this approach is that you need to handle errors using try/catch.

### <a name="parameters"></a> Parameters

If your method doesn't require any parameter, you can just call it without them:

```javascript
client.Members
  .all() // https://cadu.api.com/members
  .then((response) => console.log(response.data()))
  .catch((response) => console.error(response.data()))
```

Every parameter that doesn't match a pattern `{parameter-name}` in path will be sent as part of the query string:

```javascript
client.Members.all({ legalName: 'Name' }) // https://cadu.api.com/member?legalname=Name
```

When a method requires a parameters and the method is called without it, __Mappersmith__ will raise an error:

```javascript
client.Member.byId(/* missing memberKey */)
// throw '[Mappersmith] required parameter missing (memberKey), "/members/{memberKey}" cannot be resolved'
```

### <a name="body"></a> Body

To send values in the request body (usually for POST, PUT or PATCH methods) you will use the special parameter `body`:

```javascript
client.Members.create({
  body: payload
  }
})
```

## <a name="response-object"></a> Response object

Mappersmith will provide an instance of its own `Response` object to the promises. This object has the methods:

* `request()` - Returns the original [Request](https://github.com/tulios/mappersmith/blob/master/src/request.js)
* `status()` - Returns the status number
* `success()` - Returns true for status greater than 200 and lower than 400
* `headers()` - Returns an object with all headers, keys in lower case
* `header(name)` - Returns the value of the header
* `data()` - Returns the response data, if `Content-Type` is `application/json` it parses the response and returns an object

## Building

To build the library, use `yarn build:all`.

* Node.js build is produced inside the `dist` directory.
* Browser build is produced inside the `browser` directory.

## Testing

To run the library tests, use `yarn test:all`.

## License

```
The MIT License (MIT)
Copyright (c) 2017 Pagar.me Pagamentos S/A
```
