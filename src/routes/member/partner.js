const memberAPI = '/membership/v1/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/partners`,
    headers,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/partners/{partnerKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/partners`,
    headers,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/partners/{partnerKey}`,
    headers,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/partners/{partnerKey}`,
    headers,
  },
})
