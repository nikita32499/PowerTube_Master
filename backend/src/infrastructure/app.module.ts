import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDB } from 'infrastructure/modules/user/db/user.typeorm'
import { JwtAuthGuard } from './common/guards/auth.guard'
import { Config } from './config/config'

import { RmqModule } from './common/modules/rmq/rmq.module'
import { AuthModule } from './modules/auth/auth.module'
import { PaymentDB } from './modules/payment/db/payment.typeorm'
import { PaymentModule } from './modules/payment/payment.module'
import { ProxyDB } from './modules/proxy/db/proxy.typeorm'
import { ProxyModule } from './modules/proxy/proxy.module'
import { UserModule } from './modules/user/user.module'
import { WorkerNodeDB } from './modules/worker/db/worker.typeorm'
import { WorkerModule } from './modules/worker/worker.module'

@Module({
    imports: [
        RmqModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: Config.POSTGRES_HOST,
            port: Config.POSTGRES_PORT,
            username: Config.POSTGRES_USER,
            password: Config.POSTGRES_PASSWORD,
            database: Config.POSTGRES_DATABASE,
            entities: [UserDB, PaymentDB, ProxyDB, WorkerNodeDB],
            autoLoadEntities: true,
            synchronize: true,
            migrationsRun: true
        }),

        PaymentModule,
        UserModule,
        AuthModule,
        ProxyModule,
        WorkerModule,
        // LoggerModule,
        // CacheModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule { }
