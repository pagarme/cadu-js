const economicActivitioesAPI = '/membership/v1/economicactivities'

module.exports = {
  all: {
    method: 'get',
    path: economicActivitioesAPI,
  },

  byId: {
    method: 'get',
    path: `${economicActivitioesAPI}/{key}`,
  },
}
