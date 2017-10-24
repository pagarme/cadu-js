const moment = require('moment')
const bankAccountAdapter = require('./bank-account')
const addressAdapter = require('./address')
const {
  applySpec,
  prop,
  path,
  always,
  not,
  isNil,
  isEmpty,
  compose,
  filter,
  pipe,
  has,
  ifElse,
  pathEq,
  __,
  both,
  of,
  uniq,
} = require('ramda')

const legalNameCompany = ifElse(
  pathEq(['register_information', 'type'], 'individual'),
  path(['register_information', 'name']),
  path(['register_information', 'company_name'])
)

const tradeNameCompany = ifElse(
  pathEq(['register_information', 'type'], 'individual'),
  path(['register_information', 'name']),
  path(['register_information', 'trading_name'])
)

const legalName = ifElse(
  has('register_information'),
  legalNameCompany,
  path(['bankAccount', 'legal_name'])
)

const tradeName = ifElse(
  has('register_information'),
  tradeNameCompany,
  always(null)
)

const ternary = ifElse(__, always(2), always(1))

const isIndividual = both(
  has('register_information'),
  pathEq(['register_information', 'type'], 'individual')
)

const personCode = ifElse(
  has('register_information'),
  ternary(isIndividual),
  ternary(pathEq(['bankAccount', 'document_type'], 'cpf'))
)

const taxId = ifElse(
  has('register_information'),
  path(['register_information', 'document_number']),
  path(['bankAccount', 'document_number'])
)

const formatedBirthDate = recipient =>
  moment(recipient.register_information.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')

const birthdate = ifElse(
  both(has('register_information'), path(['register_information', 'birthdate'])),
  formatedBirthDate,
  always(null)
)

const bankAccounts = ifElse(
  has('bankAccount'),
  pipe(prop('bankAccount'), bankAccountAdapter.adapt, of),
  always(null)
)

const hasRegisterInformation = recipient =>
  !isNil(recipient.register_information)

const hasAddress = recipient => hasRegisterInformation(recipient) &&
  (recipient.register_information.address ||
  recipient.register_information.main_address ||
  recipient.register_information.addresses)

const getAdresses = (recipient) => {
  let addressesArray = []

  if (hasAddress(recipient)) {
    const { addresses, address, main_address } = recipient.register_information

    if (isIndividual(recipient)) {
      addressesArray.push(addressAdapter.adapt(address))
    } else {
      addressesArray = addresses.map(addressAdapter.adapt)
      addressesArray.push(addressAdapter.adapt(main_address))
    }
  }

  return uniq(addressesArray)
}

const notNil = compose(not, isNil)
const notEmpty = compose(not, isEmpty)
const filterNotNil = filter(notNil)
const filterNotEmpty = filter(notEmpty)

const adaptRecipientToMember = (recipient) => {
  const adaptToMember = applySpec({
    legalName,
    tradeName,
    taxId,
    legalPersonalityId: personCode,
    taxIdTypeId: personCode,
    birthdate,
    motherName: path(['register_information', 'mother_name']),
    bankAccounts,
    addresses: getAdresses,
  })

  const adapt = pipe(adaptToMember, filterNotEmpty, filterNotNil)

  return adapt(recipient)
}

module.exports = {
  adaptRecipientToMember,
}
