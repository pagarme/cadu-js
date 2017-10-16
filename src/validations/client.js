const { isNil, when } = require('ramda')

const tokenException = () => {
  throw new Error('Token is not defined.')
}

const environmentException = () => {
  throw new Error('Environment is not defined.')
}

exports.checkTokenIsDefined = when(
  isNil,
  tokenException
)

exports.checkEnvironmentIsDefined = when(
  isNil,
  environmentException
)
