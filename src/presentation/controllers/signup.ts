export class SingupController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missim param: name')
    }
  }
}
