const economicActivitioesAPI = '/membership/v1/economicactivities'

module.exports = headers => ({
  all: {
    method: 'get',
    path: economicActivitioesAPI,
    headers,
  },

  byId: {
    method: 'get',
    path: `${economicActivitioesAPI}/{key}`,
    headers,
  },
})
