import { AddAccountRepository } from '../../../../data/protocols/db/add-account.repository'
import { AddAccountModel } from '../../../../domain/useCases/addAccount'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { GetAccountByEmailRepository } from '../../../../data/protocols/db/get-account-by-email.repository'

export class AccountMongoRepository implements AddAccountRepository, GetAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async getByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
