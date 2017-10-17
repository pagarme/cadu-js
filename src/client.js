const Promise = require('bluebird')
const { default: mappersmith, configs } = require('mappersmith')
const { default: encodeJson } = require('mappersmith/middlewares/encode-json')

const {
  always,
  equals,
  ifElse,
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

const {
  checkTokenIsDefined,
  checkEnvironmentIsDefined,
} = require('./validations/client')

const adapters = require('./adapters')
const adapterRecipient = require('./adapters/pagarme/recipient')

configs.Promise = Promise

const connect = (options = {}) => {
  const { token, env } = options

  checkTokenIsDefined(token)
  checkEnvironmentIsDefined(env)

  const chooseHost = ifElse(
    equals('live'),
    always('https://api-cadu.stone.com.br'),
    always('https://api-sandbox-cadu.stone.com.br')
  )

  const library = mappersmith({
    middlewares: [encodeJson],
    host: chooseHost(env),
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

  library.adapters = adapters
  library.adapterRecipient = adapterRecipient

  return library
}

module.exports = { connect }
