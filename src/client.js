const { default: mappersmith, configs } = require('mappersmith')
const { default: encodeJson } = require('mappersmith/middlewares/encode-json')
const headerAuth = require('./middlewares/header-auth')

const {
  always,
  equals,
  ifElse,
  assoc,
} = require('ramda')

const memberRoutes = require('./routes/member')
const contactRoutes = require('./routes/member/contact')
const bankAccountRoutes = require('./routes/member/bank-account')
const emailRoutes = require('./routes/member/email')
const addressRoutes = require('./routes/member/address')
const partnerRoutes = require('./routes/member/partner')
const phoneRoutes = require('./routes/member/phone')
const countryRoutes = require('./routes/others/country')
const economicActivitiesRoutes = require('./routes/others/economic-activities')
const analysisRoutes = require('./routes/risk/analysis')
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

module.exports = {
  connect,
  adapters,
}
