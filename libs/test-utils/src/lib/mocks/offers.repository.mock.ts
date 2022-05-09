export class MockOffersRepository {

  // @ts-ignore
  public persist = jest.fn()

  // @ts-ignore
  public getAllByAuthorId =  jest.fn()

  // @ts-ignore
  public getById = jest.fn()
}
