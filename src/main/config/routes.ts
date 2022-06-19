/* eslint-disable node/no-path-concat */
import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api/v1', router)
  readdirSync(`${__dirname}/../routes`).map(async file => {
    readdirSync(`${__dirname}/../routes/${file}`).map(async route => {
      if (!route.includes('.test.')) {
        (await import(`${__dirname}/../routes/${file}/${route}`)).default(router)
      }
    })
  })
}
