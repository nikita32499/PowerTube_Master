import { EnumSubscriptionStatus } from 'core/entities/payment/types/payment.types'
import { EnumUserRole } from 'core/entities/user/types/user.types'
import { User } from 'core/entities/user/user.entity'
import { PaymentDB } from 'infrastructure/modules/payment/db/payment.typeorm'
import { ProxyDB } from 'infrastructure/modules/proxy/db/proxy.typeorm'
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'


// export const UserDB = new EntitySchema<User>({
//     name: 'User', // Имя сущности
//     tableName: 'users', // Опционально, если имя таблицы отличается
//     columns: {
//         id: {
//             type: 'varchar',
//             nullable: false,
//             primary: true,
//             generated: 'uuid',
//         },
//         authId: {
//             type: 'varchar',
//             nullable: false,
//             unique: true,
//         },

//         passwordHash: {
//             type: 'varchar',
//             nullable: true,
//         },
//         email: {
//             type: 'varchar',
//             nullable: true,
//             unique: true,
//         },
//         role: {
//             type: 'enum',
//             enum: EnumUserRole,
//             nullable: false,
//         },
//         jwtVersion: {
//             type: 'int',
//             nullable: false,
//         },
//         lastAt: {
//             type: 'bigint',
//             nullable: true,
//             default: null,
//             transformer: new TypeormLib.BigIntConverter(),
//         },
//         createdAt: {
//             type: 'bigint',
//             nullable: false,
//             transformer: new TypeormLib.BigIntConverter(),
//         },
//         active: {
//             type: 'boolean',
//             nullable: false,
//         },

//         status: {
//             type: 'enum',
//             enum: EnumSubscriptionStatus,
//             nullable: false,
//         },
//     },



//     relations: {
//         proxy: {
//             target: 'Proxy',
//             type: 'one-to-one',
//             joinColumn: false
//             // joinColumn: {
//             //     name: 'userId',
//             //     referencedColumnName: 'id'
//             // }
//         },

//         payments: {
//             target: 'Payment',
//             type: 'one-to-many',
//             inverseSide: 'user'
//         },
//     },
// })



@Entity('users')
export class UserDB implements User {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'varchar', unique: true })
    authId!: string

    @Column({ type: 'varchar', nullable: true })
    passwordHash!: string | null

    @Column({ type: 'varchar', nullable: true, unique: true })
    email!: string | null

    @Column({ type: 'enum', enum: EnumUserRole })
    role!: EnumUserRole

    @Column({ type: 'int' })
    jwtVersion!: number

    @Column({ type: 'bigint', nullable: true })
    lastAt!: number | null

    @Column({ type: 'bigint' })
    createdAt!: number

    @Column({ type: 'enum', enum: EnumSubscriptionStatus })
    status!: EnumSubscriptionStatus

    @Column({ type: 'boolean' })
    active!: boolean

    @OneToMany(() => PaymentDB, payment => payment.user)
    payments!: PaymentDB[]

    @OneToOne(() => ProxyDB)
    @JoinColumn({ name: 'proxyId' })
    proxy!: ProxyDB | null
}   
