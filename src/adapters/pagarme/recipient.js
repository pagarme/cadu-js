const {applySpec, prop, path, always} = require('ramda')
const moment = require('moment')

module.exports.adaptRecipientToMember = applySpec({
  legalName: getLegalName,
  tradeName: getTradeName,
  legalPersonalityId: getPersonCode,
  taxId: path(['register_information', 'document_number']),
  taxIdTypeId: getPersonCode,
  birthdate: getBirthDate,
  motherName: path(['register_information', 'mother_name']),
  bankAccounts: getBankAccounts,
  addresses: getAdresses
})

function isIndividualRecipient(recipient) {
    return recipient.register_information && recipient.register_information.type === 'individual'
}

function getLegalName(recipient) {
    if (isIndividualRecipient(recipient)) {
        return recipient.register_information.name
    }

    return recipient.register_information.company_name
}

function getTradeName(recipient) {
    if (isIndividualRecipient(recipient)) {
        return recipient.register_information.name
    }

    return recipient.register_information.trading_name
}

function getPersonCode (recipient) {
    if (isIndividualRecipient(recipient)) {
        return 2
    }

    return 1
}

function getBirthDate (recipient) {
    if (recipient.register_information.birthdate) {
        return moment(recipient.register_information.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }

    return null
}

function getBankAccounts (recipient) {

    const bankAccount = applySpec({
        countryId: always(76),
        bankId: path(['bankAccount', 'bank_code']),
        branchCode:path(['bankAccount', 'agencia']),
        branchCodeCheckDigit: path(['bankAccount', 'agencia_dv']),
        accountNumber: path(['bankAccount', 'conta']),
        accountNumberCheckDigit: path(['bankAccount', 'conta_dv']),
        statusId: always(2),
        accountTypeId: getAccountTypeId
    })

    return [bankAccount(recipient)]
}

const isContaCorrente = (recipient) => {
    return recipient.bankAccount.type === 'conta_corrente'
}

const getAccountTypeId = (recipient) => {
    if (isContaCorrente) {
        return 1
    }

    return 2
}

function getAdresses (recipient) {
    const addresses = []

    if (isIndividualRecipient(recipient)) {
        addresses.push(adaptAddress(recipient.register_information.address))
    } else {
        addresses.push(adaptAddress(recipient.register_information.main_address))
        recipient.register_information.addresses.forEach((address) => {
    
            let hasAddress = addresses.some((addr) => {
                return addr.streetName === address.street &&
                    addr.entranceNumber === address.street_number &&
                    addr.neighborhood === address.neighborhood &&
                    addr.postalCode === address.zipcode &&
                    addr.complement === address.complementary &&
                    addr.cityName === address.city &&
                    addr.countrySubdivisionCode === getState(address)
            })
    
            if (!hasAddress) {
                addresses.push(adaptAddress(address))
            }
        })
    }
    
    return addresses
}

const adaptAddress = (recipientAddress) => {
    const address = applySpec({
        typeId: always(2),
        streetName: prop('street'),
        entranceNumber: prop('street_number'),
        neighborhood: prop('neighborhood'),
        postalCode: prop('zipcode'),
        complement: prop('complementary'),
        cityName: prop('city'),
        countrySubdivisionCode: getState,
        countryId: always(76)
    })

    return address(recipientAddress)
}

const getState = (recipientAddress) => {
    return `BR-${recipientAddress.state}`
}
