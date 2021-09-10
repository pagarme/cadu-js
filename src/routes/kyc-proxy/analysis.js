const riskAPI = '/risk/v1/members'

module.exports = {
  byId: {
    method: 'get',
    path: `${riskAPI}/{memberKey}/analyses/{analysisKey}`,
  },

  create: {
    method: 'post',
    path: `${riskAPI}/{memberKey}/analyses`,
  },
}
