const { createTerminus } = require('@godaddy/terminus')
const mongoose = require('mongoose')
const { getLogger } = require('@fatmatto/jetpack').Logger
const config = require('../../configuration')
const logger = getLogger(config)

/**
 *  Disconnect from database before shutting down
 * @param {HTTPServer} httpServerInstance
 * @returns
 */
function createShutdownHandler (httpServerInstance) {
  return createTerminus(httpServerInstance, {
    signals: ['SIGINT', 'SIGTERM'],
    onSignal: async () => {
      console.log('Shutdown: received shutdown signal, starting cleanup before closing... It should take up to 10 seconds.')
      logger.log('info', 'Received signal. Starting cleanup')
      try {
        await mongoose.disconnect()
        logger.log('info', 'Disconnected from database.')
      } catch (err) {
        console.log(err)
      }
    },
    onShutdown: () => {
      logger.log('info', 'Cleanup finished. Shutting down.')
    },
    logger: (mess, arg) => { logger.log('info', mess, { context: arg }) },
    timeout: 1000
  })
}

module.exports = { createShutdownHandler }
