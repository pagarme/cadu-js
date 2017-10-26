const cadujs = require('../src/client')

describe('Create client', () => {
  test("should have property 'adapters'", () => {
    expect(cadujs.adapters).toBeDefined()
  })

  test("should have property 'connect'", () => {
    expect(cadujs.connect).toBeDefined()
  })

  test('when try connect without token or env', () => {
    expect(() => cadujs.connect({ env: 'live' }))
      .toThrow('Token or Environment is not defined.')
    expect(() => cadujs.connect({ token: '1234' }))
      .toThrow('Token or Environment is not defined.')
  })
})
