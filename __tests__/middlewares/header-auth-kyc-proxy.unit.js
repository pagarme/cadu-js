const headerAuthKycProxy = require('../../src/middlewares/header-auth-kyc-proxy')
const { always, identity, pathOr } = require('ramda')

const caduPath = '/membership/v1/members'
const method = jest.fn()
  .mockImplementationOnce(always('post'))
  .mockImplementationOnce(always('get'))
  .mockImplementationOnce(always('post'))
  .mockImplementationOnce(always('get'))

const enhance = jest.fn(identity)
const path = jest.fn(always(caduPath))

const request = {
  method,
  enhance,
  path,
}



describe('headerAuthKycProxy in sandbox', () => {

  const authConfig = {
    environment:'sandbox',
    secret: '1234',
    clientApplicationKey: '1234-1234-1234',
    userIdentifier: 'test@pagar.me',
  }
  
  
  const authorizationPattern =
    `CADU id="${authConfig.clientApplicationKey}", ts=".*?", mac=".*?=="`
  
  const authorizationRegex = new RegExp(authorizationPattern)

  test("should have a 'User-Identifier' property", () => {
    const headerExpect = {
      headers: {
        Authorization: expect.stringMatching(authorizationRegex),
        'User-Identifier': expect.stringMatching(/@.*?\./),
      },
    }

    const header = headerAuthKycProxy(authConfig)().request(request)

    expect(header).toBeInstanceOf(Object)
    expect(header).toMatchObject(headerExpect)
  })

  test("should don't have a 'User-Identifier' property", () => {
    const headerExpect = {
      headers: {
        Authorization:
          expect.stringMatching(authorizationRegex),
      },
    }

    const header = headerAuthKycProxy(authConfig)().request(request)
    const userIdentifier = pathOr(undefined, ['headers', 'User-Identifier'], header)

    expect(header).toBeInstanceOf(Object)
    expect(userIdentifier).toBeUndefined()
    expect(header).toMatchObject(headerExpect)
  })
})

describe('headerAuthKycProxy in live', () => {
  
  const authConfig = {
    environment:'live',
    secret: '1234',
    clientApplicationKey: '1234-1234-1234',
    userIdentifier: 'test@pagar.me',
  }
  
  
  const authorizationPattern =
    `CADU id="${authConfig.clientApplicationKey}", ts=".*?", mac=".*?=="`
  
  const authorizationRegex = new RegExp(authorizationPattern)

  test("should have a 'User-Identifier' property", () => {
    const headerExpect = {
      headers: {
        Authorization: expect.stringMatching(authorizationRegex),
        'User-Identifier': expect.stringMatching(/@.*?\./),
      },
    }

    const header = headerAuthKycProxy(authConfig)().request(request)

    expect(header).toBeInstanceOf(Object)
    expect(header).toMatchObject(headerExpect)
  })

  test("should don't have a 'User-Identifier' property", () => {
    const headerExpect = {
      headers: {
        Authorization:
          expect.stringMatching(authorizationRegex),
      },
    }

    const header = headerAuthKycProxy(authConfig)().request(request)
    const userIdentifier = pathOr(undefined, ['headers', 'User-Identifier'], header)

    expect(header).toBeInstanceOf(Object)
    expect(userIdentifier).toBeUndefined()
    expect(header).toMatchObject(headerExpect)
  })
})
