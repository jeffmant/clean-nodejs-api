import { AccountModel, AddAccountModel } from '@src/data/useCases/add-account/db-add-account.protocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
