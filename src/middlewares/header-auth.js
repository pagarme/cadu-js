const hmacSha256 = require('crypto-js/hmac-sha256')
const encodeBase64 = require('crypto-js/enc-base64')
const encodeHex = require('crypto-js/enc-hex')
const encodeUTF8 = require('crypto-js/enc-utf8')
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
  const macHex = toUpper(macSHA256.toString(encodeHex))
  const macUTF8 = encodeUTF8.parse(macHex)
  const macBase64 = encodeBase64.stringify(macUTF8)

  const id = `id="${clientApplicationKey}",`
  const ts = `ts="${timestamp}",`
  const mac = `mac="${macBase64}"`

  const authorizationValues = [schema, id, ts, mac]

  const Authorization = join(' ', authorizationValues)

  const header = { Authorization }

  if (not(equals('get', method))) {
    header['User-Identifier'] = userIdentifier
  }

  header['Tenant-Id'] = 1

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
