// import { EnumProxyType, TProxy } from 'shared-vpn-master';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Proxy } from 'core/entities/proxy/proxy.entity'
import { EnumProxyType } from 'core/entities/proxy/types/proxy.types'
import { EntitySchemaTyped } from 'infrastructure/libs/typeorm/typeorm.libs'

export const ProxyDB = new EntitySchemaTyped<Proxy>({
    name: 'Proxy', // Название сущности
    tableName: 'proxy',
    columns: {
        id: {
            type: 'varchar',
            primary: true,
            generated: 'uuid',
            nullable: false,
        },
        type: {
            type: 'enum',
            enum: EnumProxyType, // Привязка к enum
            nullable: false,
        },
        login: {
            type: 'varchar',
            nullable: false,
        },
        password: {
            type: 'varchar',
            nullable: false,
        },
        ip: {
            type: 'varchar',
            nullable: false,
        },
        host: {
            type: 'varchar',
            nullable: false,
        },
        port: {
            type: 'int',
            nullable: false,
        },
        avail: {
            type: 'boolean',
            nullable: false,
            default: true, // Значение по умолчанию
        },
    },
    // indices: [
    //     {
    //         name: 'IDX_PROXY_UNIQUE_COMBINATION',
    //         unique: true,
    //         columns: ['host', 'port', 'login', 'password'],
    //     },
    // ],
})
