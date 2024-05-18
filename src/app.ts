import express from 'express'
import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

const app = express()
const port = config.get<number>('port')

app.use(express.json())

//handle error - place at the bottom of the middleware

app.listen(port, async () => {
  logger.info(`Digital Shop running on 'http://localhost:${port}'`)

  await connect()

  routes(app)
})
