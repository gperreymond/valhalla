const { moleculer: { transporter, metrics } } = require('./application.config')

module.exports = {
  nodeID: `node-${Date.now()}`,
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
