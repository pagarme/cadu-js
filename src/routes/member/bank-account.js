const memberAPI = '/membership/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/bankaccounts`,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/bankaccounts/{bankAccountKey}`,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/bankaccounts`,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/bankaccounts/{bankAccountKey}`,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/bankaccounts/{bankAccountKey}`,
  },
}
