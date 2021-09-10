const memberRoutes = require('./member')
const contactRoutes = require('./member/contact')
const bankAccountRoutes = require('./member/bank-account')
const emailRoutes = require('./member/email')
const addressRoutes = require('./member/address')
const partnerRoutes = require('./member/partner')
const phoneRoutes = require('./member/phone')
const countryRoutes = require('./others/country')
const economicActivitiesRoutes = require('./others/economic-activities')
const analysisRoutes = require('./risk/analysis')
const kycProxyAnalysisRoutes = require('./kyc-proxy/analysis')

module.exports = {
  memberRoutes,
  contactRoutes,
  bankAccountRoutes,
  emailRoutes,
  addressRoutes,
  partnerRoutes,
  phoneRoutes,
  countryRoutes,
  economicActivitiesRoutes,
  analysisRoutes,
  kycProxyAnalysisRoutes,
}
