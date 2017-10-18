const {applySpec, prop, path, always} = require('ramda')
const moment = require('moment')
const bankAccountAdapter = require('./bank-account')
const addressAdapter = require('./address')

module.exports.adaptRecipientToMember = (recipient) => {
    const adaptToMember =  applySpec({
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

    let member = adaptToMember(recipient)

    // for (let att in member) {
    //     if (att instanceof Array && att.length === 0) {
    //         delete att
    //     }
    // }

    if (member.bankAccounts.length === 0) {
        delete member.bankAccounts
    }

    if (member.addresses.length === 0) {
        delete member.addresses
    }
    
    return member
}

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
    let accounts = []

    if (recipient.bankAccount) {
        accounts.push(bankAccountAdapter.adapt(recipient.bankAccount))
    }

    return accounts
}

function getAdresses (recipient) {
    const addresses = []

    if (hasAddress(recipient) && isIndividualRecipient(recipient)) {
        addresses.push(addressAdapter.adapt(recipient.register_information.address))
    } else if (hasAddress(recipient)) {
        addresses.push(addressAdapter.adapt(recipient.register_information.main_address))
        recipient.register_information.addresses.forEach((address) => {
        
            let alreadyHasAddress = addresses.some((addr) => {
                return addr.streetName === address.street &&
                    addr.entranceNumber === address.street_number &&
                    addr.neighborhood === address.neighborhood &&
                    addr.postalCode === address.zipcode &&
                    addr.complement === address.complementary &&
                    addr.cityName === address.city &&
                    addr.countrySubdivisionCode === addressAdapter.getState(address)
            })
        
            if (!alreadyHasAddress) {
                addresses.push(addressAdapter.adapt(address))
            }
        })
    }
    
    return addresses
}

const hasAddress = (recipient) => {
    return recipient.register_information.address || recipient.register_information.main_address || recipient.register_information.addresses
}