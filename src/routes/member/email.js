const memberAPI = '/membership/v1/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails`,
    headers,
  },
  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails/{emailKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails`,
    headers,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails/{emailKey}`,
    headers,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails/{emailKey}`,
    headers,
  },
})
