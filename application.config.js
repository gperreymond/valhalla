const nconf = require('nconf')
nconf.argv().env().file({ file: 'nconf.json' })

// ************************************
let APP_MOLECULER_METRICS_ENABLED = false
let APP_MOLECULER_API_GATEWAY_PORT = 5000
let APP_MOLECULER_METRICS_PORT = 5050
let APP_NATS_PORT = 4222
// ************************************
if (nconf.get('APP_MOLECULER_METRICS_ENABLED') && nconf.get('APP_MOLECULER_METRICS_ENABLED') === 'true') { APP_MOLECULER_METRICS_ENABLED = true }
if (nconf.get('APP_MOLECULER_API_GATEWAY_PORT')) { APP_MOLECULER_API_GATEWAY_PORT = parseInt(nconf.get('APP_MOLECULER_API_GATEWAY_PORT')) }
if (nconf.get('APP_MOLECULER_METRICS_PORT')) { APP_MOLECULER_METRICS_PORT = parseInt(nconf.get('APP_MOLECULER_METRICS_PORT')) }
if (nconf.get('APP_NATS_PORT')) { APP_NATS_PORT = parseInt(nconf.get('APP_NATS_PORT')) }
// ************************************

const APP_ENVIRONMENT = nconf.get('APP_ENVIRONMENT') || 'development'

const APP_NATS_HOSTNAME = nconf.get('APP_NATS_HOSTNAME') || 'localhost'
const APP_NATS_USERNAME = nconf.get('APP_NATS_USERNAME') || 'infra'
const APP_NATS_PASSWORD = nconf.get('APP_NATS_PASSWORD') || 'changeme'

module.exports = {
  environment: APP_ENVIRONMENT,
  moleculer: {
    port: APP_MOLECULER_API_GATEWAY_PORT,
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
  }
}
