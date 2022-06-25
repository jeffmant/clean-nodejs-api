import { DbGetAccountByToken } from '../../../../data/useCases/get-account-by-token/get-account-by-tone.usecase'
import { GetAccountByToken } from '../../../../domain/useCases/getAccountByToken'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo.repository'
import env from '../../../config/env'

export const makeDbGetAccountByToken = (): GetAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbGetAccountByToken(jwtAdapter, accountMongoRepository)
}
