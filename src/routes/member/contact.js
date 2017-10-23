const memberAPI = '/membership/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts`,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}`,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/contacts`,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}`,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}`,
  },
}
