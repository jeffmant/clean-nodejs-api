export class AlreadyExistsError extends Error {
  constructor (entityName: string, fieldName: string, value: string) {
    super(`The ${entityName} with ${fieldName} as ${value} already exists`)
    this.name = 'AlreadyExistsError'
  }
}
