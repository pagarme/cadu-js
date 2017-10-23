const memberAPI = '/membership/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/addresses`,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/addresses/{addressKey}`,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/addresses`,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/addresses/{addressKey}`,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/addresses/{addressKey}`,
  },
}
