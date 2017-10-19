const memberAPI = '/membership/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails`,
  },
  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails/{emailKey}`,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails`,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails/{emailKey}`,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/emails/{emailKey}`,
  },
}
