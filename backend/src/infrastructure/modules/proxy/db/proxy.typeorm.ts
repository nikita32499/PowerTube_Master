// import { EnumProxyType, TProxy } from 'shared-vpn-master';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserDB } from 'infrastructure/modules/user/db/user.typeorm'
import { EnumProxyType, Proxy } from 'powertube-shared'
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

// export const ProxyDB = new EntitySchema<Proxy>({
//     name: 'Proxy', // Название сущности
//     tableName: 'proxy',
//     columns: {
//         id: {
//             type: 'varchar',
//             primary: true,
//             generated: 'uuid',
//             nullable: false,
//         },
//         type: {
//             type: 'enum',
//             enum: EnumProxyType, // Привязка к enum
//             nullable: false,
//         },
//         login: {
//             type: 'varchar',
//             nullable: false,
//         },
//         password: {
//             type: 'varchar',
//             nullable: false,
//         },
//         ip: {
//             type: 'varchar',
//             nullable: false,
//         },
//         host: {
//             type: 'varchar',
//             nullable: false,
//         },
//         port: {
//             type: 'int',
//             nullable: false,
//         },
//         avail: {
//             type: 'boolean',
//             nullable: false,
//             default: true, // Значение по умолчанию
//         },

//         userId: {
//             type: 'varchar',
//             nullable: true,
//         },

//     },
//     indices: [
//         {
//             name: 'IDX_PROXY_UNIQUE_COMBINATION',
//             unique: true,
//             columns: ['host', 'port', 'login', 'password'],
//             synchronize: false
//         },
//     ],


// })
@Entity('Proxy')
@Index('IDX_PROXY_UNIQUE_COMBINATION', ['host', 'port', 'login', 'password'], { unique: true })
export class ProxyDB implements Proxy {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: 'enum', enum: EnumProxyType })
    type!: EnumProxyType

    @Column("varchar")
    login!: string

    @Column("varchar")
    password!: string

    @Column("varchar")
    ip!: string

    @Column("varchar")
    host!: string

    @Column("int")
    port!: number

    @Column({ default: true })
    avail!: boolean

    @Column({ type: 'varchar', nullable: true })
    userId!: string | null


    @OneToOne(() => UserDB)
    @JoinColumn({ name: 'userId' })
    user?: UserDB
}
