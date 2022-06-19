import { DbAuthentication } from '../../../../data/useCases/authentication/db-authentication'
import { Authentication } from '../../../../domain/useCases/authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo.repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
