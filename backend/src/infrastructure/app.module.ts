import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDB } from 'infrastructure/modules/user/db/user.typeorm'
import { Config } from './libs/config'
import { JwtAuthGuard } from './libs/guards/auth.guard'

import { AuthModule } from './modules/auth/auth.module'
import { PaymentDB } from './modules/payment/db/payment.typeorm'
import { PaymentModule } from './modules/payment/payment.module'
import { ProxyDB } from './modules/proxy/db/proxy.typeorm'
import { ProxyModule } from './modules/proxy/proxy.module'
import { RmqModule } from './modules/rmq/rmq.module'
import { UserModule } from './modules/user/user.module'

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
            entities: [UserDB, PaymentDB, ProxyDB],
            autoLoadEntities: true,
            synchronize: true,
            migrationsRun: true
        }),

        PaymentModule,
        UserModule,
        AuthModule,
        ProxyModule
        // LoggerModule,
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
