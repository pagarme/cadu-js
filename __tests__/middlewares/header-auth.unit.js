const headerAuth = require('../../src/middlewares/header-auth')
const { always, identity, path } = require('ramda')

const caduUrl = 'https://api-sandbox-cadu.stone.com.br/membership/v1/members'
const method = jest.fn()
  .mockImplementationOnce(always('post'))
  .mockImplementationOnce(always('get'))

const url = jest.fn(always(caduUrl))
const enhance = jest.fn(identity)

const request = {
  method,
  url,
  enhance,
}

const authConfig = {
  secret: '1234',
  clientApplicationKey: '1234-1234-1234',
  userIdentifier: 'test@pagar.me',
}


const authorizationPattern =
  `CADU id="${authConfig.clientApplicationKey}", ts=".*?", mac=".*?=="`

const authorizationRegex = new RegExp(authorizationPattern)

describe('HeaderAuth', () => {
  test("should have a 'User-Identifier' property", () => {
    const headerExpect = {
      headers: {
        Authorization: expect.stringMatching(authorizationRegex),
        'User-Identifier': expect.stringMatching(/@.*?\./),
      },
    }

    const header = headerAuth(authConfig)().request(request)

    expect(header).toBeInstanceOf(Object)
    expect(header).toMatchObject(headerExpect)
  })

  test("should have a 'User-Identifier' property", () => {
    const headerExpect = {
      headers: {
        Authorization:
          expect.stringMatching(authorizationRegex),
      },
    }

    const header = headerAuth(authConfig)().request(request)
    const userIdentifier = path('headers', 'User-Identifier', header)

    expect(header).toBeInstanceOf(Object)
    expect(userIdentifier).toBeUndefined()
    expect(header).toMatchObject(headerExpect)
  })
})
