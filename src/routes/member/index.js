const memberAPI = '/membership/v1/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: memberAPI,
    headers,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: memberAPI,
    headers,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}`,
    headers,
  },
})
