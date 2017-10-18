const {applySpec, prop, always} = require('ramda')

module.exports.adapt = applySpec({
    countryId: always(76),
    bankId: prop('bank_code'),
    branchCode:prop('agencia'),
    branchCodeCheckDigit: prop('agencia_dv'),
    accountNumber: prop('conta'),
    accountNumberCheckDigit: prop('conta_dv'),
    statusId: always(2),
    accountTypeId: getAccountTypeId
})

function getAccountTypeId(bankAccount) {
    if (bankAccount.type === 'conta_corrente') {
        return 1
    }

    return 2
}