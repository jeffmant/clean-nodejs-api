import swaggerConfig from '@src/main/docs'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import env from './env'

export default (app: Express): void => {
  app.use(`/api/${env.API_VERSION}/api-docs`, serve, setup(swaggerConfig))
}
