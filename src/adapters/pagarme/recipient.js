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
  of,
  uniq,
  anyPass,
} = require('ramda')

const hasRegisterInformation = has('register_information')

const isIndividual = pathEq(['register_information', 'type'], 'individual')

const legalNameCompany = ifElse(
  isIndividual,
  path(['register_information', 'name']),
  path(['register_information', 'company_name'])
)

const tradeNameCompany = ifElse(
  isIndividual,
  path(['register_information', 'name']),
  path(['register_information', 'trading_name'])
)

const legalName = ifElse(
  hasRegisterInformation,
  legalNameCompany,
  path(['bankAccount', 'legal_name'])
)

const tradeName = ifElse(
  hasRegisterInformation,
  tradeNameCompany,
  always(null)
)

const documentTypeCode = ifElse(__, always(2), always(1))

const personCode = ifElse(
  hasRegisterInformation,
  documentTypeCode(isIndividual),
  documentTypeCode(pathEq(['bankAccount', 'document_type'], 'cpf'))
)

const taxId = ifElse(
  hasRegisterInformation,
  path(['register_information', 'document_number']),
  path(['bankAccount', 'document_number'])
)

const formatedBirthDate = register =>
  moment(register.register_information.birthdate, 'DD/MM/YYYY')
    .format('YYYY-MM-DD')

const birthdate = ifElse(
  path(['register_information', 'birthdate']),
  formatedBirthDate,
  always(null)
)

const bankAccounts = ifElse(
  has('bankAccount'),
  pipe(prop('bankAccount'), bankAccountAdapter, of),
  always(null)
)

const hasAddress = anyPass([
  path(['register_information', 'address']),
  path(['register_information', 'addresses']),
  path(['register_information', 'main_address']),
])

const getAdresses = (recipient) => {
  let addressesArray = []

  if (hasAddress(recipient)) {
    const { addresses, address, main_address } = recipient.register_information

    if (isIndividual(recipient)) {
      addressesArray.push(addressAdapter(address))
    } else {
      addressesArray = addresses.map(addressAdapter)
      addressesArray.push(addressAdapter(main_address))
    }
  }

  return uniq(addressesArray)
}

const notNil = compose(not, isNil)
const notEmpty = compose(not, isEmpty)
const filterNotNil = filter(notNil)
const filterNotEmpty = filter(notEmpty)

const recipient = applySpec({
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

module.exports = pipe(
  recipient,
  filterNotEmpty,
  filterNotNil
)

