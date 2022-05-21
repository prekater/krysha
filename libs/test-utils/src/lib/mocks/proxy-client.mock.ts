
export class ClientProxyMock {
    send = jest.fn()
}


export const proxy = new ClientProxyMock();

export class ClientTCPMock  {

  getClientProxyContractsInstance = () => proxy

  getClientProxyOffersInstance = () => proxy
}
