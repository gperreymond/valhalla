module.exports = {
  name: 'valhalla',
  events: {
    'nomad.started' (ctx) {
      try {
        this.logger.info(ctx.eventName, ctx.params)
        if (global.APP_NOMAD_PID) { global.APP_NOMAD_PID = ctx.params.pid }
      } catch (e) {
        /* istanbul ignore next */
        this.logger.error(ctx.eventName, `Message: ${e.message}`)
        /* istanbul ignore next */
        return false
      }
    }
  }
}
