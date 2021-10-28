const { default: encodeJson } = require('mappersmith/middlewares/encode-json')
const headerAuthPandaMiddleware = require('./middlewares/header-auth-panda')
const buildGetJwtToken = require('./middlewares/utils/build-get-jwt')
const forge = require('mappersmith').default
const { configs } = require('mappersmith')

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
  validateConnectConfig,
} = require('./validations/client')

configs.Promise = require('bluebird')

configs.maxMiddlewareStackExecutionAllowed = 2

const chooseHost = ifElse(
  equals('live'),
  always('https://api-cadu.stone.com.br'),
  always('https://api-staging-cadu.stone.com.br')
)

const chooseHostKycProxy = ifElse(
  equals('live'),
  always('https://kyc-proxy.risco.pagar.me'),
  always('https://kyc-proxy.stg.risco.pagar.me')
)

const connect = (config = {}) => {
  validateConnectConfig(config)

  const {
    environment,
    privateKey,
    clientId,
    userAgent,
  } = config

  const getJwtToken = buildGetJwtToken({
    environment,
    privateKey,
    clientId,
    userAgent,
  })

  const AuthorizationTokenHeader = headerAuthPandaMiddleware(getJwtToken)

  const library = forge({
    middlewares: [
      AuthorizationTokenHeader,
      encodeJson,
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
    privateKey,
    clientId,
    userAgent,
  } = config

  const getJwtToken = buildGetJwtToken({
    environment,
    privateKey,
    clientId,
    userAgent,
  })

  const AuthorizationTokenHeader = headerAuthPandaMiddleware(getJwtToken)

  const library = forge({
    middlewares: [
      AuthorizationTokenHeader,
      encodeJson,
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
