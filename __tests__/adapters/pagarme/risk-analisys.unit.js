const riskAnalysisAdapter = require('../../../src/adapters/pagarme/risk-analysis')

const individualRecipient = {
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
  document_type: 'cpf',
  document_number: '92545278157',
  legal_name: 'PEDRO H C FRANCESCHI',
  BankAccount: {
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
  document_type: 'cpf',
  document_number: '92545278157',
  legal_name: 'John Doe',
}

const corporationRecipient = {
  id: 're_cj8unlow8000r01peowiwiv76',
  anticipation_fee: null,
  automatic_anticipation_type: 'full',
  automatic_anticipation_1025_delay: 15,
  allow_inter_recipient_transfer: true,
  cadu_id: null,
  register_information: {
    type: 'corporation',
    document_number: '35848767000150',
    email: 'some@email.com',
    name: 'John Doe Corporation',
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
  document_type: 'cnpj',
  document_number: '35848767000150',
  legal_name: 'John Doe Corporation',
  BankAccount: {
    id: 2202,
    company_id: '59e607f06205130100994282',
    bank_code: '341',
    agencia: '3830',
    agencia_dv: null,
    conta: '15025',
    conta_dv: '0',
    document_type: 'cnpj',
    type: 'conta_corrente',
    document_number: '35848767000150',
    legal_name: 'John Doe Corporation',
    charge_transfer_fees: true,
  },
}

test('the adapter must return a fulfilled address object', () => {
  const riskAnalysis = riskAnalysisAdapter({
    recipient: individualRecipient
  })

  expect(riskAnalysis).toHaveProperty('policies')

  expect(riskAnalysis.policies).toHaveLength(1)
  expect(riskAnalysis.policies[0]).toHaveProperty('id', 6)
  expect(riskAnalysis.policies[0]).toHaveProperty('forceReanalysis', false)

  expect(riskAnalysis).toHaveProperty('member')

  expect(riskAnalysis.member).not.toHaveProperty('addresses')
  expect(riskAnalysis.member).toHaveProperty('legalName', 'John Doe')
  expect(riskAnalysis.member).toHaveProperty('tradeName', 'John Doe')
  expect(riskAnalysis.member).toHaveProperty('legalPersonalityId', 2)
  expect(riskAnalysis.member).toHaveProperty('taxId', '92545278157')
  expect(riskAnalysis.member).toHaveProperty('taxIdTypeId', 2)
  expect(riskAnalysis.member).toHaveProperty('birthdate', '1980-10-30')
  expect(riskAnalysis.member).toHaveProperty('motherName', "John Doe's Mom")
  expect(riskAnalysis.member).toHaveProperty('bankAccounts')
  expect(riskAnalysis.member).toHaveProperty('serviceAgreements')

  expect(riskAnalysis.member.serviceAgreements).toHaveLength(1)
  expect(riskAnalysis.member.serviceAgreements[0]).toHaveProperty('products')
  expect(riskAnalysis.member.serviceAgreements[0].products[0]).toHaveProperty('id', 5)
  expect(riskAnalysis.member.serviceAgreements[0].products[0]).toHaveProperty('providerId', 5)
})

test('the adapter must return a fulfilled document_number object', () => {
  const riskAnalysis =
    riskAnalysisAdapter({
      recipient: individualRecipientWithoutBankAccount
    })

  expect(riskAnalysis).toHaveProperty('policies')

  expect(riskAnalysis.policies).toHaveLength(1)
  expect(riskAnalysis.policies[0]).toHaveProperty('id', 6)
  expect(riskAnalysis.policies[0]).toHaveProperty('forceReanalysis', false)

  expect(riskAnalysis).toHaveProperty('member')

  expect(riskAnalysis.member).not.toHaveProperty('addresses')
  expect(riskAnalysis.member).toHaveProperty('legalName', 'John Doe')
  expect(riskAnalysis.member).toHaveProperty('tradeName', 'John Doe')
  expect(riskAnalysis.member).toHaveProperty('legalPersonalityId', 2)
  expect(riskAnalysis.member).toHaveProperty('taxId', '92545278157')
  expect(riskAnalysis.member).toHaveProperty('taxIdTypeId', 2)
  expect(riskAnalysis.member).toHaveProperty('serviceAgreements')

  expect(riskAnalysis.member.serviceAgreements).toHaveLength(1)
  expect(riskAnalysis.member.serviceAgreements[0]).toHaveProperty('products')
  expect(riskAnalysis.member.serviceAgreements[0].products[0]).toHaveProperty('id', 5)
  expect(riskAnalysis.member.serviceAgreements[0].products[0]).toHaveProperty('providerId', 5)
})

test('the adapter must return policy id 5 for corporations', () => {
  const riskAnalysis = riskAnalysisAdapter({
    recipient: corporationRecipient
  })

  expect(riskAnalysis).toHaveProperty('policies')

  expect(riskAnalysis.policies).toHaveLength(1)
  expect(riskAnalysis.policies[0]).toHaveProperty('id', 5)
  expect(riskAnalysis.policies[0]).toHaveProperty('forceReanalysis', false)

  expect(riskAnalysis).toHaveProperty('member')
})

test('the adapter must return the chosen policy id', () => {
  const customPolicyId = 42
  const riskAnalysis = riskAnalysisAdapter({
    recipient: individualRecipient,
    policyId: customPolicyId
  })

  expect(riskAnalysis).toHaveProperty('policies')

  expect(riskAnalysis.policies).toHaveLength(1)
  expect(riskAnalysis.policies[0]).toHaveProperty('id', customPolicyId)
  expect(riskAnalysis.policies[0]).toHaveProperty('forceReanalysis', false)
})
