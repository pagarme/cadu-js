const headerAuthPandaMiddleware = require('../../src/middlewares/header-auth-panda')
const { identity } = require('ramda')

const token = '123'
const enhance = jest.fn(identity)

const request = {
  enhance,
}


describe('Header Auth Panda', () => {
  test('should get a Bearer token when everything is ok', () => {
    const getToken = () => Promise.resolve({ value: token })

    const headerExpect = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    headerAuthPandaMiddleware(getToken)().request(request)
      .then((header) => {
        expect(header).toBeInstanceOf(Object)
        expect(header).toMatchObject(headerExpect)
      })
  })

  test('should throw error when getToken return an error', () => {
    const erroMessage = 'Error'
    const getToken = () => { throw new Error(erroMessage) }

    const getHeader = () => headerAuthPandaMiddleware(getToken)()
      .request(request)

    expect(getHeader).toThrowError(erroMessage)
  })
})
