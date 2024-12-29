import { TypeormLib } from 'infrastructure/common/helpers/typeorm/typeorm.libs'
import { SchemaWorkerNodeParameters, SchemaWorkerNodeState, WorkerNode, WorkerNodeHistory, WorkerNodeLib, WorkerNodeParameters, WorkerNodeState } from 'powertube-shared'
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
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
	rating!: number

	@TypeormLib.ColumnJsonbValidator(SchemaWorkerNodeParameters)
	parameters!: WorkerNodeParameters

	@TypeormLib.ColumnJsonbValidator(SchemaWorkerNodeState)
	state!: WorkerNodeState

	@TypeormLib.ColumnJsonbValidator(z.array(z.object({
		rating: z.number(),
		timestamp: z.string(),
	})))
	history!: WorkerNodeHistory[]

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt!: Date

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
	lastConnectionAt!: Date | null


	@BeforeInsert()
	@BeforeUpdate()
	calculateRating() {
		this.rating = WorkerNodeLib.getWorkerNodeRating(this)
	}

}