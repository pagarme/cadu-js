const recipientAdapter = require('./recipient')
const {
  always,
  applySpec,
  assoc,
  ifElse,
  pathEq,
  pipe,
  of,
} = require('ramda')

const isIndividual = pathEq(['register_information', 'type'], 'individual')

const policyId = ifElse(isIndividual, always(4), always(3))

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
