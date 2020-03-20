const {
  always,
  applySpec,
  is,
  pipe,
  prop,
  slice,
  when,
} = require('ramda')

const isString = is(String)

const complement = pipe(
  prop('complementary'),
  when(isString, slice(0, 63))
)

const adapter = applySpec({
  typeId: always(2),
  streetName: prop('street'),
  entranceNumber: prop('street_number'),
  neighborhood: prop('neighborhood'),
  postalCode: prop('zipcode'),
  complement,
  cityName: prop('city'),
  countrySubdivisionCode: prop('state'),
  countryId: always(76),
})

module.exports = adapter
