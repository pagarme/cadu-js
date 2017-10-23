const memberAPI = '/membership/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/partners`,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/partners/{partnerKey}`,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/partners`,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/partners/{partnerKey}`,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/partners/{partnerKey}`,
  },
}
