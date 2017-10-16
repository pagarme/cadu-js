const riskAPI = '/membership/v1/risk/members'

module.exports = headers => ({
  all: {
    method: 'get',
    path: `${riskAPI}/{memberKey}/analyses`,
    headers,
  },

  byId: {
    method: 'get',
    path: `${riskAPI}/{memberKey}/analyses/{analysisKey}`,
    headers,
  },

  create: {
    method: 'post',
    path: `${riskAPI}/{memberKey}/analyses`,
    headers,
  },
})
