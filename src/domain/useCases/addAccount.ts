import { AccountModel } from '../models/account.model'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (addAccountModel: AddAccountModel) => Promise<AccountModel>
}
