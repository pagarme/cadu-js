const headerAuth = require('../../src/middlewares/header-auth')

describe('HeaderAuth', () => {
  test('should have a function', () => {
    expect(headerAuth).toBeDefined()
  })
})
