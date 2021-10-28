const riskAPI = '/risk/v2/members/analyses'

module.exports = {
  byId: {
    method: 'get',
    path: `${riskAPI}/{analysisKey}`,
  },

  create: {
    method: 'post',
    path: `${riskAPI}`,
  },
}
