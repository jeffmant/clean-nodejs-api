import { DbAddAccount } from '@src/data/useCases/add-account/db-add-account'
import { AddAccount } from '@src/domain/useCases/addAccount'
import { BcryptAdapter } from '@src/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@src/infra/db/mongodb/account/account-mongo.repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
