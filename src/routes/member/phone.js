const memberAPI = '/membership/v1/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones`,
    headers,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones/{phoneKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones`,
    headers,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones/{phoneKey}`,
    headers,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones/{phoneKey}`,
    headers,
  },
})
