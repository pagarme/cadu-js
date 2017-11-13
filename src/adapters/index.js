const pagarmeRecipientAdapter = require('./pagarme/recipient')
const pagarmeBankAccountAdapter = require('./pagarme/bank-account')
const pagarmeAddressAdapter = require('./pagarme/address')
const pagarmeRiskAnalysisAdapter = require('./pagarme/risk-analysis')

module.exports = {
  pagarme: {
    address: pagarmeAddressAdapter,
    bankAccount: pagarmeBankAccountAdapter,
    recipient: pagarmeRecipientAdapter,
    riskAnalysis: pagarmeRiskAnalysisAdapter,
  },
}
