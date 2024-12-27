import { Payment } from 'core/entities/payment/payment.entity'
import {
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    TPaymentMethod,
    TSubscriptionTariff
} from 'core/entities/payment/types/payment.types'
import { UserDB } from 'infrastructure/modules/user/db/user.typeorm'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('payment')
export class PaymentDB implements Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column("varchar")
    transactionId!: string

    @Column("varchar")
    userId!: string

    @Column({ type: 'enum', enum: EnumPaymentStatus })
    status!: EnumPaymentStatus

    @Column({ type: 'bigint' })
    createdAt!: number

    @Column({ type: 'jsonb' })
    method!: TPaymentMethod

    @Column({ type: 'enum', enum: EnumSubscriptionPeriod })
    period!: EnumSubscriptionPeriod

    @Column({ type: 'jsonb' })
    tariff!: TSubscriptionTariff

    @Column({ type: "jsonb", nullable: true })
    details!: object | null



    @ManyToOne(() => UserDB, user => user.payments)
    @JoinColumn({ name: 'userId' })
    user!: UserDB
}   
