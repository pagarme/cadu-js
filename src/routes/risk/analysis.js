const riskAPI = '/risk/v1/members'

module.exports = {
  all: {
    method: 'get',
    path: `${riskAPI}/{memberKey}/analyses`,
  },

  byId: {
    method: 'get',
    path: `${riskAPI}/{memberKey}/analyses/{analysisKey}`,
  },

  create: {
    method: 'post',
    path: `${riskAPI}/{memberKey}/analyses`,
  },
}
