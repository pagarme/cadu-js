const recipientAdapter = require('./recipient')
const {
  always,
  applySpec,
  assoc,
  ifElse,
  propEq,
  pipe,
  of,
} = require('ramda')

const isIndividual = propEq('document_type', 'cpf')

const policyId = ifElse(isIndividual, always(6), always(5))

const createPolicy = applySpec({
  id: policyId,
  forceReanalysis: always(false),
})

const serviceAgreements = [{
  products: [{
    id: 5, // Conta de Pagamento
    providerId: 5, // Pagar.me
  }],
}]

const addServiceAgreements = assoc('serviceAgreements', serviceAgreements)

const policies = pipe(createPolicy, of)

const adapter = applySpec({
  policies,
  member: pipe(
    recipientAdapter,
    addServiceAgreements
  ),
})

module.exports = adapter
