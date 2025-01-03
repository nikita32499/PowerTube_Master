import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { WorkerNodeDB } from './db/worker.typeorm'
import { WorkerNodeDatabaseImpl } from './impl/WorkerNodeDatabaseImpl'
import { NestWorkerAdapter } from './NestWorkerAdapter'




@Module({
	imports: [TypeOrmModule.forFeature([WorkerNodeDB])],
	providers: [
		NestWorkerAdapter,
		{
			provide: DI_TOKENS.WORKER.DATABASE,
			useClass: WorkerNodeDatabaseImpl
		}
	],
	exports: [NestWorkerAdapter]
})
export class WorkerModule { }