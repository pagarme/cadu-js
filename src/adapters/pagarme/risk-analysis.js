const recipientAdapter = require('./recipient')
const {
  always,
  applySpec,
  assoc,
  cond,
  has,
  of,
  pathEq,
  pipe,
  prop,
  T,
} = require('ramda')

const isIndividual = pathEq(['recipient', 'document_type'], 'cpf')

const getPolicyId = cond([
  [has('policyId'), prop('policyId')],
  [isIndividual, always(6)],
  [T, always(5)],
])

const createPolicy = applySpec({
  id: getPolicyId,
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
    prop('recipient'),
    recipientAdapter,
    addServiceAgreements
  ),
})

module.exports = adapter
