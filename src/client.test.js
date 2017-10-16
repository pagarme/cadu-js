const cadujs = require('./client')

test('create client without token', () => {
  expect(() => cadujs.connect({ env: 'sandbox' }))
    .toThrow('Token is not defined.')
})

test('create client with token and without env', () => {
  expect(() => cadujs.connect({ token: '1234' }))
    .toThrow('Environment is not defined.')
})
