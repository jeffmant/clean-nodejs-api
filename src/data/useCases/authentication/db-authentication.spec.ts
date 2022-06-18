import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

describe('Db Authentication Use Case', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          password: 'any_password'
        }
        return await new Promise((resolve) => resolve(account))
      }
    }
    const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepository)

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')

    await sut.auth({
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
