import { EnumUserRole, TUser } from 'core/entities/user/types/user.entities'
import { EntitySchemaTyped, TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs'
import { SubscriptionDB } from 'infrastructure/modules/payment/db/payment.typeorm'
import { ProxyDB } from 'infrastructure/modules/proxy/db/proxy.typeorm'

export const UserDB = new EntitySchemaTyped<TUser, 'subscription' | 'proxy'>({
    name: 'User', // Имя сущности
    tableName: 'users', // Опционально, если имя таблицы отличается
    columns: {
        id: {
            type: 'varchar',
            nullable: false,
            primary: true,
            generated: 'uuid',
        },
        authId: {
            type: 'varchar',
            nullable: false,
            unique: true,
        },

        passwordHash: {
            type: 'varchar',
            nullable: true,
        },
        email: {
            type: 'varchar',
            nullable: true,
            unique: true,
        },
        role: {
            type: 'enum',
            enum: EnumUserRole,
            nullable: false,
        },
        jwtVersion: {
            type: 'int',
            nullable: false,
        },
        lastAt: {
            type: 'bigint',
            nullable: true,
            default: null,
            transformer: new TypeormLib.BigIntConverter(),
        },
        createdAt: {
            type: 'bigint',
            nullable: false,
            transformer: new TypeormLib.BigIntConverter(),
        },
        active: {
            type: 'boolean',
            nullable: false,
        },
    },
    embeddeds: {
        subscription: {
            schema: SubscriptionDB,
        },
        proxy: {
            schema: ProxyDB,
        },
    },
})
