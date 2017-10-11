const forge = require('mappersmith').default

const moundHeader = () => {
  'Content-type': 'application/json',
}

const defineHost () => 'https://api-sandbox-cadu.stone.com.br/'


const client = forge({
  host: defineHost(),
  resource: {
    Member: {
      all: {
        path: '/membership'
      },
      byId: {
        path: '/membership/{memberKey}'
      },
      create: {
        method: 'post',
        path: '/membership',
        headers: mountHeader()
      }
    }
  }
})
