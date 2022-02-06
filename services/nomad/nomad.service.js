module.exports = {
  name: 'nomad',
  actions: {
    download: require('./actions/download'),
    run: require('./actions/run')
  }
}
