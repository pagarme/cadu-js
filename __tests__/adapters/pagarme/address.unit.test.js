const addressAdapter = require('../../../src/adapters/pagarme/address')

const addressMock = {
  neighborhood: 'bairro',
  street: 'rua',
  street_number: '240',
  zipcode: '04571020',
  complementary: 'complemento',
  state: 'PA',
  city: 'Belém',
}

test('the adapter must return a fulfilled adress object', () => {
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
