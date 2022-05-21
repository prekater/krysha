import { Module } from '@nestjs/common';
import { ClientProxyTCP } from './client-proxy'

@Module({
    providers: [ClientProxyTCP],
    exports: [ClientProxyTCP]
})
export class ProxyTCPModule {}
