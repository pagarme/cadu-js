const riskAPI = '/risk/v2/members/analyses'

module.exports = {
  all: {
    method: 'get',
    path: `${riskAPI}`,
  },

  byId: {
    method: 'get',
    path: `${riskAPI}/{analysisKey}`,
  },

  create: {
    method: 'post',
    path: `${riskAPI}`,
  },
}
