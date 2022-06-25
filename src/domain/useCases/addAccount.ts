import { AccountModel } from '../models/account.model'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (addAccountModel: AddAccountModel) => Promise<AccountModel>
}
