import { Router } from 'express'
import { routeAdapter } from '@src/main/adapters/express/express-route.adapter'
import { makeSigninController } from '@src/main/factories/controllers/signin/signin-controller.factory'
import { makeSignupController } from '@src/main/factories/controllers/signup/signup-controller.factory'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignupController()))
  router.post('/signin', routeAdapter(makeSigninController()))
}
