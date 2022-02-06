const path = require('path')
const spawn = require('child_process').spawn

const handler = async function (ctx) {
  try {
    this.logger.info(ctx.action.name, ctx.params)
    return { success: true }
    if (global.APP_NOMAD_PID) {
      this.logger.info(ctx.action.name, 'Nomad already running')
      return { success: false }
    }
    const dirpath = path.resolve(__dirname, '../../../bin')
    const child = spawn(`${dirpath}/nomad`, ['agent', '-dev'], {
      stdio: 'ignore', // piping all stdio to /dev/null
      detached: true
    })
    ctx.broker.broadcastLocal('nomad.started', { pid: child.pid })
    return { success: true }
  } catch (e) {
    /* istanbul ignore next */
    this.logger.error(ctx.action.name, `Message: ${e.message}`)
    /* istanbul ignore next */
    return Promise.reject(e)
  }
}

module.exports = {
  params: {
    mode: { type: 'string' } // ['server', 'client']
  },
  handler
}
