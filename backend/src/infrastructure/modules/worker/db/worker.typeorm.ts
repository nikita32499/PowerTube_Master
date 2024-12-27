import { WorkerNode } from 'core/entities/worker/worker.entity'
import { EntitySchemaTyped } from 'infrastructure/libs/typeorm/typeorm.libs'



export const WorkerNodeDB = new EntitySchemaTyped<WorkerNode>({
	name: 'WorkerNode',
	tableName: 'worker_node',
	columns: {
		id: {
			type: 'varchar',
			primary: true,
			generated: 'uuid',
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
		speed: {
			type: 'int',
			nullable: false,
		},
		maxConnections: {
			type: 'int',
			nullable: false,
		},
		currentConnectionsCount: {
			type: 'int',
			nullable: false,
		},
		rating: {
			type: 'int',
			nullable: false,
		},
		available: {
			type: 'boolean',
			nullable: false,
		},
		history: {
			type: 'jsonb',
			nullable: false,
		},






	},
})