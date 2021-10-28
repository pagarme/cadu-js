const cadujs = require('../src/client')
const fs = require('fs')

const certPriv = fs.readFileSync(`${__dirname}/middlewares/utils/mytestkey.pem`)

describe('Create client', () => {
  test("should have property 'adapters'", () => {
    expect(cadujs.adapters).toBeDefined()
  })

  test("should have property 'connect'", () => {
    expect(cadujs.connect).toBeDefined()
  })

  test('when try connect without config', () => {
    expect(() => cadujs.connect())
      .toThrow()
  })

  test('when try connectKycProxy without config', () => {
    expect(() => cadujs.connectKycProxy())
      .toThrow()
  })

  test("when try connect without 'privateKey'", () => {
    expect(() => cadujs.connect({
      environment: 'sandbox',
      clientId: 'client_id',
      userAgent: 'user_agent',
    }))
      .toThrow()
  })

  test("when try connect without 'clientId'", () => {
    expect(() => cadujs.connect({
      environment: 'sandbox',
      privateKey: certPriv,
      userAgent: 'user_agent',
    }))
      .toThrow()
  })

  test("when try connect without 'userAgent'", () => {
    expect(() => cadujs.connect({
      environment: 'sandbox',
      privateKey: certPriv,
      clientId: 'client_id',
    }))
      .toThrow()
  })

  test("when try connect without 'environment'", () => {
    expect(() => cadujs.connect({
      privateKey: certPriv,
      clientId: 'client_id',
      userAgent: 'user_agent',
    }))
      .toThrow()
  })

  test('when try connect with correct values', () => {
    const client = cadujs.connect({
      environment: 'sandbox',
      privateKey: certPriv,
      clientId: 'client_id',
      userAgent: 'user_agent',
    })

    expect(client).toBeInstanceOf(Object)
  })

  test('when try connectKycProxy with correct values', () => {
    const client = cadujs.connectKycProxy({
      environment: 'sandbox',
      clientApplicationKey: '1234-1234-1234',
      secret: '1234',
      userIdentifier: 'test@pagar.me',
    })

    expect(client).toBeInstanceOf(Object)
  })
})
