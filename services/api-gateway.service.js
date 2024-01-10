const WebMixin = require('moleculer-web')

const { moleculer: { port } } = require('../application.config')

module.exports = {
  name: 'valhalla',
  mixins: [WebMixin],
  settings: {
    port,
    cors: {
      origin: '*',
      methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: [],
      exposedHeaders: [],
      credentials: false,
      maxAge: 3600
    },
    routes: [{
      mappingPolicy: 'restrict',
      aliases: {
        'GET api/v1/nodes': 'server.getNodes'
      }
    }]
  }
}
