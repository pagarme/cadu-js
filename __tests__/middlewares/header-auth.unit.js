const headerAuth = require('../../src/middlewares/header-auth')
const { always, identity, pathOr } = require('ramda')

const caduPath = '/membership/v1/members'
const method = jest.fn()
  .mockImplementationOnce(always('post'))
  .mockImplementationOnce(always('get'))

const enhance = jest.fn(identity)
const path = jest.fn(always(caduPath))

const request = {
  method,
  enhance,
  path,
}

const authConfig = {
  environment:'sandbox',
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

  test("should don't have a 'User-Identifier' property", () => {
    const headerExpect = {
      headers: {
        Authorization:
          expect.stringMatching(authorizationRegex),
      },
    }

    const header = headerAuth(authConfig)().request(request)
    const userIdentifier = pathOr(undefined, ['headers', 'User-Identifier'], header)

    expect(header).toBeInstanceOf(Object)
    expect(userIdentifier).toBeUndefined()
    expect(header).toMatchObject(headerExpect)
  })
})
