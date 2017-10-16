const memberAPI = '/membership/v1/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/bankaccounts`,
    headers,
  },

  byId: {
    method: 'get',
    path: `${memberAPI}/{memberKey}/bankaccounts/{bankAccountKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: `${memberAPI}/{memberKey}/bankaccounts`,
    headers,
  },

  update: {
    method: 'put',
    path: `${memberAPI}/{memberKey}/bankaccounts/{bankAccountKey}`,
    headers,
  },

  remove: {
    method: 'delete',
    path: `${memberAPI}/{memberKey}/bankaccounts/{bankAccountKey}`,
    headers,
  },
})
