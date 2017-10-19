const memberAPI = '/membership/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones`,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones/{phoneKey}`,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones`,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones/{phoneKey}`,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/contacts/{contactKey}/phones/{phoneKey}`,
  },
}
