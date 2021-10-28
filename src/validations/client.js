const { pluck, isNil } = require('ramda')
const Joi = require('joi')

const configSchema = Joi.object().keys({
  secret: Joi.string().required(),
  environment: Joi.string().required().valid(['live', 'sandbox']),
  clientApplicationKey: Joi.string().required(),
  userIdentifier: Joi.string().required(),
}).required()

const connectConfigSchema = Joi.object().keys({
  environment: Joi.string().required().valid(['live', 'sandbox', 'test']),
  privateKey: Joi.object().required(),
  clientId: Joi.string().required(),
  userAgent: Joi.string().required(),
}).required()

const validateConfig = (config) => {
  const result = Joi.validate(config, configSchema)

  if (!isNil(result.error)) {
    throw new Error(pluck('message', result.error.details))
  }
}

const validateConnectConfig = (config) => {
  const result = Joi.validate(config, connectConfigSchema)

  if (!isNil(result.error)) {
    throw new Error(pluck('message', result.error.details))
  }
}

module.exports = {
  validateConfig,
  validateConnectConfig,
}
