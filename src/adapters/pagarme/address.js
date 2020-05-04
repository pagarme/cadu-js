const {
  always,
  anyPass,
  applySpec,
  is,
  isEmpty,
  isNil,
  pipe,
  prop,
  slice,
  trim,
  when,
} = require('ramda')

const isString = is(String)

const propAndTrim = propName => pipe(
  prop(propName),
  when(isString, trim)
)

const complement = pipe(
  propAndTrim('complementary'),
  when(isString, slice(0, 63))
)

const isEmptyOrNil = anyPass([isEmpty, isNil])
const emptyStreetNumber = always('SN')

const entranceNumber = pipe(
  propAndTrim('street_number'),
  when(isEmptyOrNil, emptyStreetNumber)
)

const adapter = applySpec({
  typeId: always(2),
  streetName: propAndTrim('street'),
  entranceNumber,
  neighborhood: propAndTrim('neighborhood'),
  postalCode: propAndTrim('zipcode'),
  complement,
  cityName: propAndTrim('city'),
  countrySubdivisionCode: propAndTrim('state'),
  countryId: always(76),
})

module.exports = adapter
