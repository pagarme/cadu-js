const hmacSha256 = require('crypto-js/hmac-sha256')
const base64 = require('crypto-js/enc-base64')
const moment = require('moment')
const {
  equals,
  join,
  not,
  replace,
  toLower,
  toUpper,
} = require('ramda')

const createAuthorization = (request, config) => {
  const {
    secret,
    clientApplicationKey,
    userIdentifier,
  } = config

  const schema = 'CADU'
  const timestamp = moment().utc().unix()
  const method = request.method()
  const cleanUrl = replace(/\?.+/g, '', request.url())

  const macValues = [
    toLower(schema),
    clientApplicationKey,
    toUpper(method),
    cleanUrl,
    timestamp,
  ]

  const macString = join('.', macValues)

  const macSHA256 = hmacSha256(macString, secret)
  const macBase64 = base64.stringify(macSHA256)

  const id = `id="${clientApplicationKey}",`
  const ts = `ts="${timestamp}",`
  const mac = `mac="${macBase64}"`

  const authorizationValues = [schema, id, ts, mac]

  const Authorization = join(' ', authorizationValues)

  const header = { Authorization }

  if (not(equals('get', method))) {
    header['User-Identifier'] = userIdentifier
  }

  return header
}

const HeaderAuth = authConfig => () => ({
  request: request => (
    request.enhance({
      headers: createAuthorization(request, authConfig),
    })
  ),
})

module.exports = HeaderAuth
