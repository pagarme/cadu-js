const jwt = require('jsonwebtoken')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const url = require('url')
const {
  always,
  equals,
  ifElse,
} = require('ramda')

const buildGetJwtToken = (
  {
    environment,
    privateKey,
    clientId,
    userAgent,
  },
  token = {}
) => {
  let jwtToken = token

  const chooseAudValueEndpoint = ifElse(
    equals('live'),
    always('https://accounts.openbank.stone.com.br/auth/realms/stone_bank'),
    always('https://sandbox-accounts.openbank.stone.com.br/auth/realms/stone_bank')
  )

  const chooseRequestTokenEndpoint = ifElse(
    equals('live'),
    always('https://accounts.openbank.stone.com.br/auth/realms/stone_bank/protocol/openid-connect/token'),
    always('https://sandbox-accounts.openbank.stone.com.br/auth/realms/stone_bank/protocol/openid-connect/token')
  )

  const getToken = () => {
    const isTokenValid = jwtToken
    && jwtToken.value
    && jwtToken.expirationDate
    && jwtToken.expirationDate >= moment().unix()

    if (isTokenValid) {
      return Promise.resolve(jwtToken)
    }

    const now = moment().unix()
    const expirationDate = now + (15 * 60)

    const payload = {
      exp: expirationDate,
      nbf: now,
      aud: chooseAudValueEndpoint(environment),
      realm: 'stone_bank',
      sub: clientId,
      clientId,
      jti: uuidv4(),
      iat: now,
      iss: clientId,
    }

    try {
      const internalToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

      const tokenPayload = {
        client_id: clientId,
        grant_type: 'client_credentials',
        client_assertion: internalToken,
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      }

      const endpoint = chooseRequestTokenEndpoint(environment)
      const params = new url.URLSearchParams(tokenPayload)

      return axios.post(
        endpoint,
        params,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': userAgent,
          },
        }
      ).then((response) => {
        jwtToken = {
          value: response.data.access_token,
          expirationDate,
        }
        return jwtToken
      }).catch((errorResponse) => {
        throw new Error(`Unsuccessful request - ${errorResponse}`)
      })
    } catch (error) {
      throw new Error(`Could not generate new token - ${error}`)
    }
  }

  return getToken
}

module.exports = buildGetJwtToken
