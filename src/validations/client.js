const { pluck } = require('ramda')
const Joi = require('joi')

const configSchema = Joi.object().keys({
  secret: Joi.string().required(),
  environment: Joi.string().required().valid(['live', 'sandbox']),
  clientApplicationKey: Joi.string().required(),
  userIdentifier: Joi.string().required(),
}).required()

const validateConfig = (config) => {
  const result = Joi.validate(config, configSchema)

  if (result.error) {
    throw new Error(pluck('message', result.error.details))
  }
}

module.exports = {
  validateConfig,
}
