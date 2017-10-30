const cadujs = require('../src/client')

describe('Create client', () => {
  test("should have property 'adapters'", () => {
    expect(cadujs.adapters).toBeDefined()
  })

  test("should have property 'connect'", () => {
    expect(cadujs.connect).toBeDefined()
  })

  test("when try connect without 'clientApplicationKey'", () => {
    expect(() => cadujs.connect({
      environment: 'sandbox',
      userIdentifier: 'teste@pagar.me',
      secret: '1234',
    }))
      .toThrow()
  })

  test("when try connect without 'environment'", () => {
    expect(() => cadujs.connect({
      clientApplicationKey: '1234-1234-1234',
      userIdentifier: 'teste@pagar.me',
      secret: '1234',
    }))
      .toThrow()
  })

  test("when try connect without 'secret'", () => {
    expect(() => cadujs.connect({
      environment: 'sandbox',
      clientApplicationKey: '1234-1234-1234',
      userIdentifier: 'teste@pagar.me',
    }))
      .toThrow()
  })

  test("when try connect without 'userIdentifier'", () => {
    expect(() => cadujs.connect({
      environment: 'sandbox',
      clientApplicationKey: '1234-1234-1234',
      secret: '1234',
    }))
      .toThrow()
  })
})
