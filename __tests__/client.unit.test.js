const cadujs = require('../src/client')

describe('Create client', () => {
  test('without token', () => {
    expect(() => cadujs.connect({ env: 'sandbox' }))
      .toThrow('Token is not defined.')
  })

  test('with token and without env', () => {
    expect(() => cadujs.connect({ token: '1234' }))
      .toThrow('Environment is not defined.')
  })

  test('with token and with env', () => {
    expect(() => cadujs.connect({ token: '1234', env: 'sandbox' }))
      .toBeDefined()
  })
})
