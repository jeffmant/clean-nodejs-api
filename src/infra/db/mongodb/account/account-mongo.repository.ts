import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account.repository'
import { AddAccountModel } from '../../../../domain/useCases/addAccount'
import { AccountModel } from '../../../../domain/models/account.model'
import { MongoHelper } from '../helpers/mongo-helper'
import { GetAccountByEmailRepository } from '../../../../data/protocols/db/account/get-account-by-email.repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token.repository'

export class AccountMongoRepository implements AddAccountRepository, GetAccountByEmailRepository, UpdateAccessTokenRepository {
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: id }, { $set: { accessToken: token } })
  }
}
