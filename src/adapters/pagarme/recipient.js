const { applySpec, prop } = require('ramda')

const convertRecipient = applySpec({
  tradeName: prop('name'),
})

module.exports = convertRecipient
