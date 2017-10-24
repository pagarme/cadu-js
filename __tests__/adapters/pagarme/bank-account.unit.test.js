const bankAccountAdapter = require('../../../src/adapters/pagarme/bank-account')

const bankAccount = {
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
}

test('the adapter must return a fulfilled bank account object', () => {
  const bAccount = bankAccountAdapter.adapt(bankAccount)

  expect(bAccount).toHaveProperty('countryId', 76)
  expect(bAccount).toHaveProperty('bankId', '341')
  expect(bAccount).toHaveProperty('branchCode', '3830')
  expect(bAccount).toHaveProperty('branchCodeCheckDigit', null)
  expect(bAccount).toHaveProperty('accountNumber', '15025')
  expect(bAccount).toHaveProperty('accountNumberCheckDigit', '0')
  expect(bAccount).toHaveProperty('statusId', 2)
  expect(bAccount).toHaveProperty('accountTypeId', 1)
})
