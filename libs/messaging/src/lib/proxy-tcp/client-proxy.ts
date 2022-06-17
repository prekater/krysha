import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class ClientProxyTCP {

  constructor(
    private configService: ConfigService
  ) {
  }


  getClientProxyContractsInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>('CONTRACTS_MICROSERVICE_HOST') || 'contracts',
        port: Number(this.configService.get<string>('CONTRACTS_MICROSERVICE_PORT')) || 3002
      }
    })
  }

  getClientProxyOffersInstance(): ClientProxy {

    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>('OFFERS_MICROSERVICE_HOST') || 'offers',
        port: Number(this.configService.get<string>('OFFERS_MICROSERVICE_PORT')) || 3001
      }
    })
  }


}
