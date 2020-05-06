const { merge } = require('ramda')

const addressAdapter = require('../../../src/adapters/pagarme/address')

const buildAddressMock = merge({
  neighborhood: 'bairro',
  street: 'rua',
  street_number: '240',
  zipcode: '04571020',
  complementary: 'complemento',
  state: 'PA',
  city: 'Belém',
})


test('the adapter must return a fulfilled address object', () => {
  const addressMock = buildAddressMock({
    street: '  rua  ',
    street_number: '240   ',
    complementary: 'complemento ',
  })
  const address = addressAdapter(addressMock)

  expect(address).toHaveProperty('typeId', 2)
  expect(address).toHaveProperty('streetName', 'rua')
  expect(address).toHaveProperty('entranceNumber', '240')
  expect(address).toHaveProperty('neighborhood', 'bairro')
  expect(address).toHaveProperty('complement', 'complemento')
  expect(address).toHaveProperty('cityName', 'Belém')
  expect(address).toHaveProperty('countrySubdivisionCode', 'PA')
  expect(address).toHaveProperty('countryId', 76)
})

describe('the adapter must return a fulfilled address object with entrance number equal to SN', () => {
  test('when street_number is null', () => {
    const addressMock = buildAddressMock({
      street_number: null,
    })
    const address = addressAdapter(addressMock)

    expect(address).toHaveProperty('entranceNumber', 'SN')
  })

  test('when street_number is undefined', () => {
    const addressMock = buildAddressMock({
      street_number: undefined,
    })
    const address = addressAdapter(addressMock)

    expect(address).toHaveProperty('entranceNumber', 'SN')
  })

  test('when street_number is an empty string', () => {
    const addressMock = buildAddressMock({
      street_number: '',
    })
    const address = addressAdapter(addressMock)

    expect(address).toHaveProperty('entranceNumber', 'SN')
  })

  test('when street_number is a string with whitespaces', () => {
    const addressMock = buildAddressMock({
      street_number: '    ',
    })
    const address = addressAdapter(addressMock)

    expect(address).toHaveProperty('entranceNumber', 'SN')
  })
})
