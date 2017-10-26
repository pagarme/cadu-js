const {
  applySpec,
  prop,
  propEq,
  always,
  ifElse,
} = require('ramda')

const getAccountTypeId = ifElse(
  propEq('type', 'conta_corrente'),
  always(1),
  always(2)
)

const adapter = applySpec({
  countryId: always(76),
  bankId: prop('bank_code'),
  branchCode: prop('agencia'),
  branchCodeCheckDigit: prop('agencia_dv'),
  accountNumber: prop('conta'),
  accountNumberCheckDigit: prop('conta_dv'),
  statusId: always(2),
  accountTypeId: getAccountTypeId,
})

module.exports = adapter
