import env from './env'
import swaggerConfig from '@src/main/docs'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { noCache } from '../middlewares'

export default (app: Express): void => {
  app.use(`/api/${env.API_VERSION}/api-docs`, noCache, serve, setup(swaggerConfig))
}
