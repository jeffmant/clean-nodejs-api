import request from 'supertest'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import app from '../../config/app'
import env from '../../config/env'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

describe('Auth Routes', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(String(env.MONGO_URI))
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return 200 with success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          email: 'valid_email@test.com',
          password: 'valid_password',
          passwordConfirmation: 'valid_password'
        })
        .expect(200)
    })
  })

  describe('POST /signin', () => {
    test('Should return 200 with success', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password,
        passwordConfirmation: password
      })

      await request(app)
        .post('/api/signin')
        .send({
          email: 'valid_email@email.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 if fails', async () => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'valid_email@email.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
