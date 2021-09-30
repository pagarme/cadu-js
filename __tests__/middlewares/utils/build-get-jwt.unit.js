const buildGetJwtToken = require('../../../src/middlewares/utils/build-get-jwt')
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

const certPriv = fs.readFileSync(`${__dirname}/mytestkey.pem`)

const authConfig = {
  environment: 'sandbox',
  privateKey: certPriv,
  clientId: 'client_id',
  userAgent: 'user_agent',
}

jest.mock('axios')
beforeEach(() => {
  axios.post.mockClear()
})

describe('Build Get JWT', () => {
  test('should send a post request and get a valid token', () => {
    const spy = jest.spyOn(axios, 'post')
    const token = {
      expirationDate: moment().unix(),
      value: '123',
    }

    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { access_token: token.value } }))

    const getToken = buildGetJwtToken(authConfig)

    getToken().then((tokenResponse) => {
      expect(tokenResponse).toBeInstanceOf(Object)
      expect(tokenResponse.value).toBe(token.value)
      expect(spy).toHaveBeenCalled()
    })
  })

  test('should not send a post request when token is not expired', () => {
    const spy = jest.spyOn(axios, 'post')
    const token = {
      value: '456',
      expirationDate: Number(moment().add(15 * 60, 'seconds').format('x')),
    }

    const getToken = buildGetJwtToken(authConfig, token)

    getToken().then((tokenResponse) => {
      expect(tokenResponse).toBeInstanceOf(Object)
      expect(tokenResponse.value).toBe(token.value)
      expect(spy).not.toHaveBeenCalled()
    })
  })

  test('should throw error when post request is unsuccessful', () => {
    const error = new Error('error')

    axios.post.mockImplementationOnce(() =>
      Promise.reject(error))

    const getToken = buildGetJwtToken(authConfig)

    getToken().catch((errorResponse) => {
      expect(errorResponse).toBeInstanceOf(Error)
      expect(errorResponse).toMatchObject(new Error(`Unsuccessful request - ${error}`))
    })
  })

  test('should throw error when private key is invalid', () => {
    const customErrorMessage = 'Could not generate new token - Error: error:0909006C:PEM routines:get_name:no start line'
    authConfig.privateKey = 'invalid_key'

    const getToken = buildGetJwtToken(authConfig)

    try {
      getToken()
    } catch (error) {
      expect(error).not.toBeNull()
      expect(error.message).toBe(customErrorMessage)
    }
  })
})
