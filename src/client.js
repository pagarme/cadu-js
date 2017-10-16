const Promise = require('bluebird')
const {
  default: mappersmith,
  configs,
} = require('mappersmith')

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

configs.Promise = Promise

const connect = (options = {}) => {
  const { token, env } = options

  checkTokenIsDefined(token)
  checkEnvironmentIsDefined(env)

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const connectRoute = route => route(headers)

  const chooseHost = ifElse(
    equals('live'),
    always('https://api-cadu.stone.com.br'),
    always('https://api-sandbox-cadu.stone.com.br')
  )

  const library = mappersmith({
    host: chooseHost(env),
    resources: {
      Member: connectRoute(memberRoutes),
      Contact: connectRoute(contactRoutes),
      BankAccount: connectRoute(bankAccountRoutes),
      Email: connectRoute(emailRoutes),
      Address: connectRoute(addressRoutes),
      Partner: connectRoute(partnerRoutes),
      Phone: connectRoute(phoneRoutes),
      Country: connectRoute(countryRoutes),
      EconomicActivity: connectRoute(economicActivitiesRoutes),
      Analysis: connectRoute(analysisRoutes),
    },
  })

  return library
}

module.exports = { connect }
