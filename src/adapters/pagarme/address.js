const { applySpec, prop, always } = require('ramda')

const adapter = applySpec({
  typeId: always(2),
  streetName: prop('street'),
  entranceNumber: prop('street_number'),
  neighborhood: prop('neighborhood'),
  postalCode: prop('zipcode'),
  complement: prop('complementary'),
  cityName: prop('city'),
  countrySubdivisionCode: prop('state'),
  countryId: always(76),
})

module.exports = adapter
