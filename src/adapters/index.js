const pagarmeRecipientAdapter = require('./pagarme/recipient')
const pagarmeBankAccountAdapter = require('./pagarme/bank-account')
const pagarmeAddressAdapter = require('./pagarme/address')

module.exports = {
  pagarme: {
    address: pagarmeAddressAdapter,
    bankAccount: pagarmeBankAccountAdapter,
    recipient: pagarmeRecipientAdapter,
  },
}
