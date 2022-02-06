const nconf = require('nconf')
nconf.argv().env().file({ file: 'nconf.json' })

// ************************************
let APP_MOLECULER_METRICS_ENABLED = false
let APP_MOLECULER_METRICS_PORT = 5050
let APP_RETHINKDB_PORT = 28015
let APP_NATS_PORT = 4222
// ************************************
if (nconf.get('APP_MOLECULER_METRICS_ENABLED') && nconf.get('APP_MOLECULER_METRICS_ENABLED') === 'true') { APP_MOLECULER_METRICS_ENABLED = true }
if (nconf.get('APP_MOLECULER_METRICS_PORT')) { APP_MOLECULER_METRICS_PORT = parseInt(nconf.get('APP_MOLECULER_METRICS_PORT')) }
if (nconf.get('APP_RETHINKDB_PORT')) { APP_RETHINKDB_PORT = parseInt(nconf.get('APP_RETHINKDB_PORT')) }
if (nconf.get('APP_NATS_PORT')) { APP_NATS_PORT = parseInt(nconf.get('APP_NATS_PORT')) }
// ************************************

const APP_ENVIRONMENT = nconf.get('APP_ENVIRONMENT') || 'development'
const APP_NODE_NAME = nconf.get('APP_NODE_NAME') || 'localhost'
const APP_NODE_DATACENTER = nconf.get('APP_NODE_DATACENTER') || 'datacenter'

const APP_RETHINKDB_HOSTNAME = nconf.get('APP_RETHINKDB_HOSTNAME') || 'localhost'
const APP_RETHINKDB_USERNAME = nconf.get('APP_RETHINKDB_USERNAME') || 'infra'
const APP_RETHINKDB_PASSWORD = nconf.get('APP_RETHINKDB_PASSWORD') || 'changeme'

const APP_NATS_HOSTNAME = nconf.get('APP_NATS_HOSTNAME') || 'localhost'
const APP_NATS_USERNAME = nconf.get('APP_NATS_USERNAME') || 'infra'
const APP_NATS_PASSWORD = nconf.get('APP_NATS_PASSWORD') || 'changeme'

module.exports = {
  environment: APP_ENVIRONMENT,
  node: {
    name: APP_NODE_NAME,
    datacenter: APP_NODE_DATACENTER
  },
  moleculer: {
    metrics: {
      enabled: APP_MOLECULER_METRICS_ENABLED,
      port: APP_MOLECULER_METRICS_PORT
    },
    transporter: {
      type: 'NATS',
      options: {
        url: `nats://${APP_NATS_HOSTNAME}:${APP_NATS_PORT}`,
        user: APP_NATS_USERNAME,
        pass: APP_NATS_PASSWORD
      }
    }
  },
  rethinkdb: {
    hostname: APP_RETHINKDB_HOSTNAME,
    port: APP_RETHINKDB_PORT,
    username: APP_RETHINKDB_USERNAME,
    password: APP_RETHINKDB_PASSWORD
  }
}
