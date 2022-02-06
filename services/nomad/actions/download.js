const path = require('path')
const fse = require('fs-extra')
const get = require('async-get-file')
const anzip = require('anzip')
const sh = require('exec-sh').promise

const APP_NOMAD_VERSION = '1.2.5'

const handler = async function (ctx) {
  try {
    this.logger.info(ctx.action.name, ctx.params)
    const dirpath = path.resolve(__dirname, '../../../bin')
    await fse.ensureDir(dirpath)
    const url = `https://releases.hashicorp.com/nomad/${APP_NOMAD_VERSION}/nomad_${APP_NOMAD_VERSION}_linux_amd64.zip`
    const options = {
      directory: dirpath,
      filename: 'nomad.zip'
    }
    await get(url, options)
    await anzip(`${dirpath}/nomad.zip`, { outputPath: dirpath })
    await fse.removeSync(`${dirpath}/nomad.zip`)
    await sh(`chmod +x ${dirpath}/nomad`, true)
    return { success: true }
  } catch (e) {
    /* istanbul ignore next */
    this.logger.error(ctx.action.name, `Message: ${e.message}`)
    /* istanbul ignore next */
    return Promise.reject(e)
  }
}

module.exports = {
  handler
}
