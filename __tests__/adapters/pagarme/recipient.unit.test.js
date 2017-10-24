const recipientAdapter = require('../../../src/adapters/pagarme/recipient')

const companyRecipient = {
  id: 're_cj8uhzne9000v01pe9westv13',
  anticipation_fee: null,
  automatic_anticipation_type: 'full',
  automatic_anticipation_1025_delay: 15,
  allow_inter_recipient_transfer: true,
  cadu_id: null,
  register_information: {
    type: 'corporation',
    document_number: '43633675456',
    company_name: 'Full Name Company',
    trading_name: 'Known Company Name',
    cnae: '9999-9/99',
    phone_numbers: [Object],
    corporation_type: 'ltda',
    founding_date: '06/06/1966',
    managing_partners: [Object],
    main_address: {
      neighborhood: 'bairro',
      street: 'rua',
      street_number: '240',
      zipcode: '04571020',
      complementary: 'complemento',
      state: 'PA',
      city: 'Belém',
    },
    addresses: [
      {
        neighborhood: 'bairro',
        street: 'rua',
        street_number: '240',
        zipcode: '04571020',
        complementary: 'complemento',
        state: 'PA',
        city: 'cidade',
      },
      {
        neighborhood: 'foo bairro',
        street: 'outra rua',
        street_number: '241',
        zipcode: '04571020',
        complementary: 'foo complemento',
        state: 'SP',
        city: 'foo cidade',
      }],
  },
  company_id: '59e4f6aa190bd601000cfe92',
  bank_account_id: 2059,
  transfer_enabled: false,
  postback_url: '',
  transfer_interval: 'daily',
  transfer_day: 0,
  automatic_anticipation_enabled: false,
  anticipatable_volume_percentage: 0,
  status: 'registration',
  last_transfer: null,
  automatic_anticipation_days: null,
  mdrs: null,
  status_reason: null,
  metadata: null,
  bankAccount: {
    id: 2080,
    company_id: '59e4f7e45d83380100ee3f12',
    bank_code: '341',
    agencia: '3830',
    agencia_dv: null,
    conta: '15025',
    conta_dv: '0',
    document_type: 'cpf',
    type: 'conta_corrente',
    document_number: '12388151708',
    legal_name: 'PEDRO H C FRANCESCHI',
    charge_transfer_fees: true,
  },
}

const companyRecipientWithRepeatedAddresses = {
  id: 're_cj8uhzne9000v01pe9westv13',
  anticipation_fee: null,
  automatic_anticipation_type: 'full',
  automatic_anticipation_1025_delay: 15,
  allow_inter_recipient_transfer: true,
  cadu_id: null,
  register_information: {
    type: 'corporation',
    document_number: '43633675456',
    company_name: 'Full Name Company',
    trading_name: 'Known Company Name',
    cnae: '9999-9/99',
    phone_numbers: [Object],
    corporation_type: 'ltda',
    founding_date: '06/06/1966',
    managing_partners: [Object],
    main_address: {
      neighborhood: 'bairro',
      street: 'rua',
      street_number: '240',
      zipcode: '04571020',
      complementary: 'complemento',
      state: 'PA',
      city: 'Belém',
    },
    addresses: [
      {
        neighborhood: 'bairro',
        street: 'rua',
        street_number: '240',
        zipcode: '04571020',
        complementary: 'complemento',
        state: 'PA',
        city: 'Belém',
      },
      {
        neighborhood: 'foo bairro',
        street: 'outra rua',
        street_number: '241',
        zipcode: '04571020',
        complementary: 'foo complemento',
        state: 'SP',
        city: 'foo cidade',
      }],
  },
  company_id: '59e4f6aa190bd601000cfe92',
  bank_account_id: 2059,
  transfer_enabled: false,
  postback_url: '',
  transfer_interval: 'daily',
  transfer_day: 0,
  automatic_anticipation_enabled: false,
  anticipatable_volume_percentage: 0,
  status: 'registration',
  last_transfer: null,
  automatic_anticipation_days: null,
  mdrs: null,
  status_reason: null,
  metadata: null,
  bankAccount: {
    id: 2080,
    company_id: '59e4f7e45d83380100ee3f12',
    bank_code: '341',
    agencia: '3830',
    agencia_dv: null,
    conta: '15025',
    conta_dv: '0',
    document_type: 'cpf',
    type: 'conta_corrente',
    document_number: '12388151708',
    legal_name: 'PEDRO H C FRANCESCHI',
    charge_transfer_fees: true,
  },
}

const individualRecipient = {
  id: 're_cj8unlow8000r01peowiwiv76',
  anticipation_fee: null,
  automatic_anticipation_type: 'full',
  automatic_anticipation_1025_delay: 15,
  allow_inter_recipient_transfer: true,
  cadu_id: null,
  register_information: {
    type: 'individual',
    address: {
      neighborhood: 'Miramar',
      street: 'Rua Doutor Télio Barreto',
      street_number: '240',
      zipcode: '04571020',
      complementary: 'Apt 202',
      state: 'RJ',
      city: 'Macaé',
    },
    document_number: '92545278157',
    email: 'some@email.com',
    name: 'John Doe',
    mother_name: "John Doe's Mom",
    birthdate: '30/10/1980',
  },
  company_id: '59e51b7c2c8a22010014f9c8',
  bank_account_id: 2181,
  transfer_enabled: false,
  postback_url: '',
  transfer_interval: 'daily',
  transfer_day: 0,
  automatic_anticipation_enabled: false,
  anticipatable_volume_percentage: 0,
  status: 'registration',
  last_transfer: null,
  automatic_anticipation_days: null,
  mdrs: null,
  status_reason: null,
  metadata: null,
  bankAccount: {
    id: 2202,
    company_id: '59e607f06205130100994282',
    bank_code: '341',
    agencia: '3830',
    agencia_dv: null,
    conta: '15025',
    conta_dv: '0',
    document_type: 'cpf',
    type: 'conta_corrente',
    document_number: '12388151708',
    legal_name: 'PEDRO H C FRANCESCHI',
    charge_transfer_fees: true,
  },
}

const individualRecipientWithoutBankAccount = {
  id: 're_cj8unlow8000r01peowiwiv76',
  anticipation_fee: null,
  automatic_anticipation_type: 'full',
  automatic_anticipation_1025_delay: 15,
  allow_inter_recipient_transfer: true,
  cadu_id: null,
  register_information: {
    type: 'individual',
    address: {
      neighborhood: 'Miramar',
      street: 'Rua Doutor Télio Barreto',
      street_number: '240',
      zipcode: '04571020',
      complementary: 'Apt 202',
      state: 'RJ',
      city: 'Macaé',
    },
    document_number: '92545278157',
    email: 'some@email.com',
    name: 'John Doe',
    mother_name: "John Doe's Mom",
    birthdate: '30/10/1980',
  },
  company_id: '59e51b7c2c8a22010014f9c8',
  bank_account_id: 2181,
  transfer_enabled: false,
  postback_url: '',
  transfer_interval: 'daily',
  transfer_day: 0,
  automatic_anticipation_enabled: false,
  anticipatable_volume_percentage: 0,
  status: 'registration',
  last_transfer: null,
  automatic_anticipation_days: null,
  mdrs: null,
  status_reason: null,
  metadata: null,
}

const individualRecipientWithoutAddress = {
  id: 're_cj8unlow8000r01peowiwiv76',
  anticipation_fee: null,
  automatic_anticipation_type: 'full',
  automatic_anticipation_1025_delay: 15,
  allow_inter_recipient_transfer: true,
  cadu_id: null,
  register_information: {
    type: 'individual',
    document_number: '92545278157',
    email: 'some@email.com',
    name: 'John Doe',
    mother_name: "John Doe's Mom",
    birthdate: '30/10/1980',
  },
  company_id: '59e51b7c2c8a22010014f9c8',
  bank_account_id: 2181,
  transfer_enabled: false,
  postback_url: '',
  transfer_interval: 'daily',
  transfer_day: 0,
  automatic_anticipation_enabled: false,
  anticipatable_volume_percentage: 0,
  status: 'registration',
  last_transfer: null,
  automatic_anticipation_days: null,
  mdrs: null,
  status_reason: null,
  metadata: null,
  bankAccount: {
    id: 2202,
    company_id: '59e607f06205130100994282',
    bank_code: '341',
    agencia: '3830',
    agencia_dv: null,
    conta: '15025',
    conta_dv: '0',
    document_type: 'cpf',
    type: 'conta_corrente',
    document_number: '12388151708',
    legal_name: 'PEDRO H C FRANCESCHI',
    charge_transfer_fees: true,
  },
}

const recipientWithoutRegisterInformation = {
  id: 're_cj8unlow8000r01peowiwiv76',
  anticipation_fee: null,
  automatic_anticipation_type: 'full',
  automatic_anticipation_1025_delay: 15,
  allow_inter_recipient_transfer: true,
  cadu_id: null,
  company_id: '59e51b7c2c8a22010014f9c8',
  bank_account_id: 2181,
  transfer_enabled: false,
  postback_url: '',
  transfer_interval: 'daily',
  transfer_day: 0,
  automatic_anticipation_enabled: false,
  anticipatable_volume_percentage: 0,
  status: 'registration',
  last_transfer: null,
  automatic_anticipation_days: null,
  mdrs: null,
  status_reason: null,
  metadata: null,
  bankAccount: {
    id: 2202,
    company_id: '59e607f06205130100994282',
    bank_code: '341',
    agencia: '3830',
    agencia_dv: null,
    conta: '15025',
    conta_dv: '0',
    document_type: 'cpf',
    type: 'conta_corrente',
    document_number: '12388151708',
    legal_name: 'PEDRO H C FRANCESCHI',
    charge_transfer_fees: true,
  },
}

test('the adapter must return a fulfilled member object for a company recipient', () => {
  const member = recipientAdapter.adaptRecipientToMember(companyRecipient)

  expect(member).toHaveProperty('legalName', 'Full Name Company')
  expect(member).toHaveProperty('tradeName', 'Known Company Name')
  expect(member).toHaveProperty('legalPersonalityId', 1)
  expect(member).toHaveProperty('taxId', '43633675456')
  expect(member).toHaveProperty('taxIdTypeId', 1)
  expect(member).not.toHaveProperty('birthdate')
  expect(member).toHaveProperty('motherName', undefined)
  expect(member).toHaveProperty('bankAccounts')
  expect(member).toHaveProperty('addresses')
})

test('the adapter must return a fulfilled bankAccounts array object for a company recipient', () => {
  const member = recipientAdapter.adaptRecipientToMember(companyRecipient)
  const bankAccount = member.bankAccounts[0]

  expect(member.bankAccounts).toHaveLength(1)
  expect(bankAccount).toHaveProperty('countryId', 76)
  expect(bankAccount).toHaveProperty('bankId', '341')
  expect(bankAccount).toHaveProperty('branchCode', '3830')
  expect(bankAccount).toHaveProperty('branchCodeCheckDigit', null)
  expect(bankAccount).toHaveProperty('accountNumber', '15025')
  expect(bankAccount).toHaveProperty('accountNumberCheckDigit', '0')
  expect(bankAccount).toHaveProperty('statusId', 2)
  expect(bankAccount).toHaveProperty('accountTypeId', 1)
})

test('the adapter must return a fulfilled adresses array object for a company recipient', () => {
  const member = recipientAdapter.adaptRecipientToMember(companyRecipient)
  const address1 = member.addresses[2]
  const address3 = member.addresses[1]

  expect(member.addresses).toHaveLength(3)

  expect(address1).toHaveProperty('typeId', 2)
  expect(address1).toHaveProperty('streetName', 'rua')
  expect(address1).toHaveProperty('entranceNumber', '240')
  expect(address1).toHaveProperty('neighborhood', 'bairro')
  expect(address1).toHaveProperty('complement', 'complemento')
  expect(address1).toHaveProperty('cityName', 'Belém')
  expect(address1).toHaveProperty('countrySubdivisionCode', 'PA')
  expect(address1).toHaveProperty('countryId', 76)

  expect(address3).toHaveProperty('typeId', 2)
  expect(address3).toHaveProperty('streetName', 'outra rua')
  expect(address3).toHaveProperty('entranceNumber', '241')
  expect(address3).toHaveProperty('neighborhood', 'foo bairro')
  expect(address3).toHaveProperty('complement', 'foo complemento')
  expect(address3).toHaveProperty('cityName', 'foo cidade')
  expect(address3).toHaveProperty('countrySubdivisionCode', 'SP')
  expect(address3).toHaveProperty('countryId', 76)
})

test('the adapter must return non repeated addresses', () => {
  const member = recipientAdapter
    .adaptRecipientToMember(companyRecipientWithRepeatedAddresses)
  expect(member.addresses).toHaveLength(2)
})

test('the adapter must return a fulfilled member object for a individual recipient', () => {
  const member = recipientAdapter.adaptRecipientToMember(individualRecipient)

  expect(member).toHaveProperty('legalName', 'John Doe')
  expect(member).toHaveProperty('tradeName', 'John Doe')
  expect(member).toHaveProperty('legalPersonalityId', 2)
  expect(member).toHaveProperty('taxId', '92545278157')
  expect(member).toHaveProperty('taxIdTypeId', 2)
  expect(member).toHaveProperty('birthdate', '1980-10-30')
  expect(member).toHaveProperty('motherName', "John Doe's Mom")
  expect(member).toHaveProperty('bankAccounts')
  expect(member).toHaveProperty('addresses')
})

test('the adapter must return a fulfilled bankAccounts array object for a individual recipient', () => {
  const member = recipientAdapter.adaptRecipientToMember(individualRecipient)
  const bankAccount = member.bankAccounts[0]

  expect(member.bankAccounts).toHaveLength(1)
  expect(bankAccount).toHaveProperty('countryId', 76)
  expect(bankAccount).toHaveProperty('bankId', '341')
  expect(bankAccount).toHaveProperty('branchCode', '3830')
  expect(bankAccount).toHaveProperty('branchCodeCheckDigit', null)
  expect(bankAccount).toHaveProperty('accountNumber', '15025')
  expect(bankAccount).toHaveProperty('accountNumberCheckDigit', '0')
  expect(bankAccount).toHaveProperty('statusId', 2)
  expect(bankAccount).toHaveProperty('accountTypeId', 1)
})

test('the adapter must return a fulfilled adresses array object for a individual recipient', () => {
  const member = recipientAdapter.adaptRecipientToMember(individualRecipient)
  const address = member.addresses[0]

  expect(member.addresses).toHaveLength(1)

  expect(address).toHaveProperty('typeId', 2)
  expect(address).toHaveProperty('streetName', 'Rua Doutor Télio Barreto')
  expect(address).toHaveProperty('entranceNumber', '240')
  expect(address).toHaveProperty('neighborhood', 'Miramar')
  expect(address).toHaveProperty('complement', 'Apt 202')
  expect(address).toHaveProperty('cityName', 'Macaé')
  expect(address).toHaveProperty('countrySubdivisionCode', 'RJ')
  expect(address).toHaveProperty('countryId', 76)
})

test('the adapter must return a fulfilled member object with no bank account', () => {
  const member = recipientAdapter
    .adaptRecipientToMember(individualRecipientWithoutBankAccount)
  expect(member).not.toHaveProperty('bankAccounts')

  expect(member).toHaveProperty('legalName', 'John Doe')
  expect(member).toHaveProperty('tradeName', 'John Doe')
  expect(member).toHaveProperty('legalPersonalityId', 2)
  expect(member).toHaveProperty('taxId', '92545278157')
  expect(member).toHaveProperty('taxIdTypeId', 2)
  expect(member).toHaveProperty('birthdate', '1980-10-30')
  expect(member).toHaveProperty('motherName', "John Doe's Mom")
  expect(member).toHaveProperty('addresses')
})

test('the adapter must return a fulfilled member object with no address', () => {
  const member = recipientAdapter
    .adaptRecipientToMember(individualRecipientWithoutAddress)
  expect(member).not.toHaveProperty('addresses')

  expect(member).toHaveProperty('legalName', 'John Doe')
  expect(member).toHaveProperty('tradeName', 'John Doe')
  expect(member).toHaveProperty('legalPersonalityId', 2)
  expect(member).toHaveProperty('taxId', '92545278157')
  expect(member).toHaveProperty('taxIdTypeId', 2)
  expect(member).toHaveProperty('birthdate', '1980-10-30')
  expect(member).toHaveProperty('motherName', "John Doe's Mom")
  expect(member).toHaveProperty('bankAccounts')
})

test('the adapter must return a fulfilled member object for a recipient with no register information', () => {
  const member = recipientAdapter
    .adaptRecipientToMember(recipientWithoutRegisterInformation)

  expect(member).toHaveProperty('legalName', 'PEDRO H C FRANCESCHI')
  expect(member).not.toHaveProperty('tradeName')
  expect(member).toHaveProperty('legalPersonalityId', 2)
  expect(member).toHaveProperty('taxId', '12388151708')
  expect(member).toHaveProperty('taxIdTypeId', 2)
  expect(member).not.toHaveProperty('birthdate')
  expect(member).not.toHaveProperty('motherName')
  expect(member).toHaveProperty('bankAccounts')
  expect(member).not.toHaveProperty('addresses')
})
