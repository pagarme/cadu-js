const handleAuthorizationToken = getJwtToken => getJwtToken()
  .then(jwtToken => jwtToken)

const headerAuthPandaMiddleware = getJwtToken => () => ({
  request (request) {
    return Promise
      .resolve(handleAuthorizationToken(getJwtToken))
      .then((token) => {
        const headers = {
          Authorization: `Bearer ${token.value}`,
        }

        return request.enhance({ headers })
      })
  },

  response (next, renew) {
    return next().catch((response) => {
      if (response.status() === 401) {
        return renew()
      }

      return next()
    })
  },
})

module.exports = headerAuthPandaMiddleware
