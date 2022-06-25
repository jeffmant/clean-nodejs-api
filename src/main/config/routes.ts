/* eslint-disable node/no-path-concat */
import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import env from './env'

export default (app: Express): void => {
  const router = Router()
  app.use(`/api/${env.API_VERSION}`, router)
  readdirSync(`${__dirname}/../routes`).map(async file => {
    readdirSync(`${__dirname}/../routes/${file}`).map(async route => {
      if (!route.includes('.test.') && !route.endsWith('.map')) {
        (await import(`${__dirname}/../routes/${file}/${route}`)).default(router)
      }
    })
  })
}
