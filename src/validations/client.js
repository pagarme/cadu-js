const {
  when,
  allPass,
  has,
  complement,
} = require('ramda')

const tokenAndEnvrionmentException = () => {
  throw new Error('Token or Environment is not defined.')
}

const hasEnv = has('env')
const hasToken = has('token')
const notHasAllRequiredOptions = complement(allPass([hasEnv, hasToken]))

exports.checkTokenAndEnvironment = when(
  notHasAllRequiredOptions,
  tokenAndEnvrionmentException
)
