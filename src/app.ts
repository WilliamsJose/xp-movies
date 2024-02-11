import express, { Response as ExResponse, Request as ExRequest } from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(routes)
  app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(swaggerUi.generateHTML(await import('../dist/swagger.json')))
  })

  // eslint-disable-next-line no-console
  return app.listen(process.env.PORT, () => console.log('server up'))
})
