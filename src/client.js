const { default: mappersmith, configs } = require('mappersmith')
const { default: encodeJson } = require('mappersmith/middlewares/encode-json')
const headerAuth = require('./middlewares/header-auth')

const {
  always,
  equals,
  ifElse,
  assoc,
} = require('ramda')

const {
  memberRoutes,
  contactRoutes,
  bankAccountRoutes,
  emailRoutes,
  addressRoutes,
  partnerRoutes,
  phoneRoutes,
  countryRoutes,
  economicActivitiesRoutes,
  analysisRoutes,
  kycProxyAnalysisRoutes,
} = require('./routes')

const adapters = require('./adapters')

const {
  validateConfig,
} = require('./validations/client')

configs.Promise = require('bluebird')

const chooseHost = ifElse(
  equals('live'),
  always('https://api-cadu.stone.com.br'),
  always('https://api-sandbox-cadu.stone.com.br')
)

const chooseHostKycProxy = ifElse(
  equals('live'),
  always('https://kyc-proxy.risco.pagar.me'),
  always('https://kyc-proxy.stg.risco.pagar.me')
)

const connect = (config = {}) => {
  validateConfig(config)

  const {
    environment,
    secret,
    clientApplicationKey,
    userIdentifier,
  } = config

  const library = mappersmith({
    middlewares: [
      encodeJson,
      headerAuth({
        secret,
        clientApplicationKey,
        userIdentifier,
      }),
    ],
    host: chooseHost(environment),
    resources: {
      Member: memberRoutes,
      Contact: contactRoutes,
      BankAccount: bankAccountRoutes,
      Email: emailRoutes,
      Address: addressRoutes,
      Partner: partnerRoutes,
      Phone: phoneRoutes,
      Country: countryRoutes,
      EconomicActivity: economicActivitiesRoutes,
      Analysis: analysisRoutes,
    },
  })

  return assoc('adapters', adapters, library)
}

const connectKycProxy = (config = {}) => {
  validateConfig(config)

  const {
    environment,
    secret,
    clientApplicationKey,
    userIdentifier,
  } = config

  const library = mappersmith({
    middlewares: [
      encodeJson,
      headerAuth({
        secret,
        clientApplicationKey,
        userIdentifier,
      }),
    ],
    host: chooseHostKycProxy(environment),
    resources: {
      Analysis: kycProxyAnalysisRoutes,
    },
  })

  return assoc('adapters', adapters, library)
}

module.exports = {
  connectKycProxy,
  connect,
  adapters,
}
