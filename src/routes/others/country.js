const countryAPI = '/membership/v1/countries'

module.exports = headers => ({
  list: {
    method: 'get',
    path: countryAPI,
    headers,
  },

  byId: {
    method: 'get',
    path: `${countryAPI}/{countryCode}`,
    headers,
  },

  listSubDivisions: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions`,
    headers,
  },

  subDivisionById: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions/{subDivisionCode}`,
    headers,
  },

  listCities: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions/{subDivisionCode}/cities`,
    headers,
  },

  cityById: {
    method: 'get',
    path: `${countryAPI}/{countryCode}/subdivisions/{subDivisionCode}/cities/{cityCode}`,
    headers,
  },
})
