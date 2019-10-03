const moment = require('moment')
const bankAccountAdapter = require('./bank-account')
const addressAdapter = require('./address')
const {
  always,
  anyPass,
  applySpec,
  complement,
  filter,
  has,
  ifElse,
  isEmpty,
  isNil,
  of,
  path,
  pathEq,
  pathSatisfies,
  propEq,
  pipe,
  prop,
  reject,
  uniq,
  __,
} = require('ramda')

const isNotNil = complement(isNil)
const pathIsNotNil = pathSatisfies(isNotNil)
const hasTradingName = pathIsNotNil(['register_information', 'trading_name'])

const isIndividual = pathEq(['register_information', 'type'], 'individual')

const legalNameCompany = ifElse(
  isIndividual,
  path(['register_information', 'name']),
  path(['register_information', 'company_name'])
)

const tradeNameCompany = ifElse(
  isIndividual,
  path(['register_information', 'name']),
  ifElse(
    hasTradingName,
    path(['register_information', 'trading_name']),
    path(['register_information', 'company_name'])
  )
)

const legalName = ifElse(
  has('register_information'),
  legalNameCompany,
  prop('legal_name')
)

const tradeName = ifElse(
  has('register_information'),
  tradeNameCompany,
  prop('legal_name')
)

const documentTypeCode = ifElse(__, always(2), always(1))

const personCode = ifElse(
  has('register_information'),
  documentTypeCode(isIndividual),
  documentTypeCode(propEq('document_type', 'cpf'))
)

const taxId = ifElse(
  has('register_information'),
  path(['register_information', 'document_number']),
  prop('document_number')
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
  has('BankAccount'),
  pipe(prop('BankAccount'), bankAccountAdapter, of),
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
    const {
      addresses = [],
      address,
      main_address,
    } = recipient.register_information

    if (isIndividual(recipient)) {
      addressesArray.push(addressAdapter(address))
    } else {
      addressesArray = addresses.map(addressAdapter)
      addressesArray.push(addressAdapter(main_address))
    }
  }

  return uniq(addressesArray)
}

const notEmpty = complement(isEmpty)
const filterNotNil = filter(isNotNil)
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
  websiteUrl: path(['register_information', 'site_url']),
})

const rejectNullOrEmpty = reject(isNil)

module.exports = pipe(
  rejectNullOrEmpty,
  recipient,
  filterNotEmpty,
  filterNotNil
)
