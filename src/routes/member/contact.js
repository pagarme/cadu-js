const memberAPI = '/membership/v1/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts`,
    headers,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/contacts`,
    headers,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}`,
    headers,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}`,
    headers,
  },
})
