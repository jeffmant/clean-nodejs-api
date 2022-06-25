import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account-mongo.repository'
import env from '../../../../main/config/env'

describe('Account MongoDB Repository', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add', () => {
    test('Should return an account on add successed', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
    })
  })

  describe('getByEmail', () => {
    test('Should return an account on getByEmail seccessed', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password'
      })
      const account = await sut.getByEmail('valid_email@email.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
    })

    test('Should return null if getByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.getByEmail('valid_email@email.com')
      expect(account).toBeFalsy()
    })
  })

  describe('getByToken', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const response = await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password'
      })
      const fakeAccount = response.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('getByToken', () => {
    test('Should return an account on getByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        accessToken: 'any_token'
      })
      const account = await sut.getByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
    })

    test('Should return an account on getByToken with role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        accessToken: 'any_token',
        role: 'any_role'
      })
      const account = await sut.getByToken('any_token', 'any_role')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
    })

    test('Should return null if getByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.getByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
