import env from '../../../../main/config/env'
import { MongoHelper as sut } from './mongo-helper'

describe('Mongo helper', () => {
  beforeAll(async () => {
    await sut.connect(String(env.MONGO_URI))
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect mongodb if it is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
