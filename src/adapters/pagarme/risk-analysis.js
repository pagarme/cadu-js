const recipientAdapter = require('./recipient')
const {
  applySpec,
  always,
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

const policies = pipe(createPolicy, of)

const adapter = applySpec({
  policies,
  member: recipientAdapter,
})

module.exports = adapter
