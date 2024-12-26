import { Module } from '@nestjs/common'
import { DI_TOKENS } from 'infrastructure/libs/constants'
import { RmqModule } from '../rmq/rmq.module'
import { ProxyRabbitController } from './controllers/RabbitMQ/proxy.rabbit.controller'
import { ProxyDatabaseImpl } from './impl/ProxyDatabaseImpl'
import { NestProxyAdapter } from './NestProxyAdapter'




@Module({
	imports: [
		RmqModule
	],
	controllers: [
		ProxyRabbitController,
	],
	providers: [
		NestProxyAdapter,
		{
			provide: DI_TOKENS.PROXY_REPOSITORY,
			useClass: ProxyDatabaseImpl,
		},
	],
})
export class ProxyModule { }
