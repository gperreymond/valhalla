
const { node: { name, datacenter },  moleculer: { transporter, metrics } } = require('./application.config')

process.on('exit', () => {
  console.log('==============> NOMAD process', global.APP_NOMAD_PID)
  process.kill(global.APP_NOMAD_PID)
})

module.exports = {
  nodeID: `node-${name}-${datacenter}`,
  logger: true,
  transporter,
  metrics: {
    enabled: metrics.enabled,
    reporter: [{
      type: 'Prometheus',
      options: {
        port: metrics.port,
        path: '/metrics',
        defaultLabels: registry => ({
          namespace: registry.broker.namespace,
          nodeID: registry.broker.nodeID
        })
      }
    }]
  },
  async started (broker) {
  }
}
