import { PaymentDB } from 'infrastructure/modules/payment/db/payment.typeorm'
import { ProxyDB } from 'infrastructure/modules/proxy/db/proxy.typeorm'
import { EnumSubscriptionStatus, EnumUserRole, User } from 'powertube-shared'
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

    @Column({ type: 'timestamp', nullable: true })
    lastAt!: Date | null

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date

    @Column({ type: 'enum', enum: EnumSubscriptionStatus })
    status!: EnumSubscriptionStatus

    @Column({ type: 'boolean' })
    active!: boolean

    @OneToMany(() => PaymentDB, payment => payment.user, { eager: true })
    payments!: PaymentDB[]

    @OneToOne(() => ProxyDB)
    @JoinColumn({ name: 'proxyId' })
    proxy!: ProxyDB | null
}   
