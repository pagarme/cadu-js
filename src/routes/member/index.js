const memberAPI = '/membership/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: memberAPI,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}`,
  },

  create: {
    method: 'post',
    path: memberAPI,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}`,
  },
}
