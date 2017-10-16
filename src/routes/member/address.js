const memberAPI = '/membership/v1/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/addresses`,
    headers,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/addresses/{addressKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/addresses`,
    headers,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/addresses/{addressKey}`,
    headers,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/addresses/{addressKey}`,
    headers,
  },
})
