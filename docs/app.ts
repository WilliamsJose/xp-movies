import express, { Response as ExResponse, Request as ExRequest } from 'express'
import routes from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')))
})

// eslint-disable-next-line no-console
app.listen(3001, () => console.log('docs up'))
