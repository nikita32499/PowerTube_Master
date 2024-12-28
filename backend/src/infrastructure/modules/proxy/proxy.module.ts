import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RmqModule } from 'infrastructure/common/modules/rmq/rmq.module'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { UserModule } from '../user/user.module'
import { WorkerModule } from '../worker/worker.module'
import { ProxyRabbitController } from './controllers/RabbitMQ/proxy.rabbit.controller'
import { ProxyRestController } from './controllers/RestApi/proxy.controller'
import { ProxyDB } from './db/proxy.typeorm'
import { ProxyCheckImpl } from './impl/ProxyCheckImpl'
import { ProxyDatabaseImpl } from './impl/ProxyDatabaseImpl'
import { ProxySocketWorkerImpl } from './impl/ProxySocketWorkerImpl'
import { NestProxyAdapter } from './NestProxyAdapter'




@Module({
	imports: [
		RmqModule,
		UserModule,
		WorkerModule,
		TypeOrmModule.forFeature([ProxyDB])
	],
	controllers: [
		ProxyRabbitController,
		ProxyRestController
	],
	providers: [
		NestProxyAdapter,
		{
			provide: DI_TOKENS.PROXY.DATABASE,
			useClass: ProxyDatabaseImpl,
		},
		{
			provide: DI_TOKENS.PROXY.SOCKET_WORKER,
			useClass: ProxySocketWorkerImpl,
		},
		{
			provide: DI_TOKENS.PROXY.CHECK,
			useClass: ProxyCheckImpl,
		}
	],
})
export class ProxyModule { }
