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

test('the adapter must return a fulfilled adress object', () => {
  const riskAnalysis = riskAnalysisAdapter(individualRecipient)

  expect(riskAnalysis).toHaveProperty('policies')

  expect(riskAnalysis.policies).toHaveLength(1)
  expect(riskAnalysis.policies[0]).toHaveProperty('id', 4)
  expect(riskAnalysis.policies[0]).toHaveProperty('forceReanalysis', false)

  expect(riskAnalysis).toHaveProperty('data')

  expect(riskAnalysis.data).not.toHaveProperty('addresses')
  expect(riskAnalysis.data).toHaveProperty('legalName', 'John Doe')
  expect(riskAnalysis.data).toHaveProperty('tradeName', 'John Doe')
  expect(riskAnalysis.data).toHaveProperty('legalPersonalityId', 2)
  expect(riskAnalysis.data).toHaveProperty('taxId', '92545278157')
  expect(riskAnalysis.data).toHaveProperty('taxIdTypeId', 2)
  expect(riskAnalysis.data).toHaveProperty('birthdate', '1980-10-30')
  expect(riskAnalysis.data).toHaveProperty('motherName', "John Doe's Mom")
  expect(riskAnalysis.data).toHaveProperty('bankAccounts')
})
