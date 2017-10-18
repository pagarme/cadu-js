const {applySpec, prop, always} = require('ramda')

module.exports.getState = getState

module.exports.adapt = applySpec({
    typeId: always(2),
    streetName: prop('street'),
    entranceNumber: prop('street_number'),
    neighborhood: prop('neighborhood'),
    postalCode: prop('zipcode'),
    complement: prop('complementary'),
    cityName: prop('city'),
    countrySubdivisionCode: getState,
    countryId: always(76)
})

function getState(address) {
    return `BR-${address.state}`
}