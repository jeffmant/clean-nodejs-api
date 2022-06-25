import { LogErrorRepository } from '@src/data/protocols/db/log/log-error.repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoErrorRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
