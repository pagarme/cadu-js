const countryAPI = '/membership/v1/countries'

module.exports = {
  list: {
    method: 'get',
    path: countryAPI,
  },

  byId: {
    method: 'get',
    path: `${countryAPI}/{countryCode}`,
  },

  listSubDivisions: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions`,
  },

  subDivisionById: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions/{subDivisionCode}`,
  },

  listCities: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions/{subDivisionCode}/cities`,
  },

  cityById: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions/{subDivisionCode}/cities/{cityCode}`,
  },
}
