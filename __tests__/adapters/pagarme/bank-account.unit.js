const bankAccountAdapter = require('../../../src/adapters/pagarme/bank-account')

const bankAccountMock = {
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
  const bankAccount = bankAccountAdapter(bankAccountMock)

  expect(bankAccount).toHaveProperty('countryId', 76)
  expect(bankAccount).toHaveProperty('bankId', '341')
  expect(bankAccount).toHaveProperty('branchCode', '3830')
  expect(bankAccount).toHaveProperty('branchCodeCheckDigit', null)
  expect(bankAccount).toHaveProperty('accountNumber', '15025')
  expect(bankAccount).toHaveProperty('accountNumberCheckDigit', '0')
  expect(bankAccount).toHaveProperty('statusId', 2)
  expect(bankAccount).toHaveProperty('accountTypeId', 1)
})
