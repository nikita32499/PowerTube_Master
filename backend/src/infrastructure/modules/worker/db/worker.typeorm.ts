import { TWorkerNodeHistory } from 'core/entities/worker/types/worker.types'
import { WorkerNode } from 'core/entities/worker/worker.entity'
import { TypeormLib } from 'infrastructure/common/helpers/typeorm/typeorm.libs'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'

@Entity('worker_node')
export class WorkerNodeDB implements Omit<WorkerNode, "getWorkerNodeRating"> {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column("varchar")
	ip!: string

	@Column("varchar")
	host!: string

	@Column("int")
	speed!: number

	@Column("int")
	maxConnections!: number

	@Column("int")
	currentConnectionsCount!: number

	@Column("int")
	rating!: number

	@Column("boolean")
	available!: boolean

	@Column('jsonb', {
		array: true, transformer: new TypeormLib.JsonbValidator(z.array(z.object({
			rating: z.number(),
			timestamp: z.string(),
		})))
	})
	history!: TWorkerNodeHistory[]




}