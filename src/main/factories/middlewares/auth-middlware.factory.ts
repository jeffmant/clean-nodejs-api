import { AuthMiddleware } from '../../../presentation/middlewares/auth/auth.middleware'
import { Middlware } from '../../../presentation/protocols'
import { makeDbGetAccountByToken } from '../usecases/get-account-by-token/get-account-by-token-usecase.factory'

export const authMiddleware = (role?: string): Middlware => {
  return new AuthMiddleware(makeDbGetAccountByToken(), role)
}
