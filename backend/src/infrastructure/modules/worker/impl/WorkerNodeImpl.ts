import { InjectRepository } from '@nestjs/typeorm'
import { WorkerNode } from 'core/entities/worker/worker.entity'
import { WorkerNodeDatabaseRepository } from 'core/entities/worker/worker.repository'
import { TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs'
import { Repository } from 'typeorm'
import { WorkerNodeDB } from '../db/worker.typeorm'




export class WorkerNodeDatabaseImpl implements WorkerNodeDatabaseRepository {
	constructor(@InjectRepository(WorkerNodeDB) private readonly workerNodeRepo: Repository<WorkerNode>) { }
	async getAll(): Promise<WorkerNode[]> {
		return this.workerNodeRepo.find()
	}
	async getByIp(ip: string): Promise<WorkerNode> {
		const result = await this.workerNodeRepo.findOne({ where: { ip } })
		if (!result) throw new Error('WorkerNode not found')
		return result
	}
	async getByID(id: string): Promise<WorkerNode> {
		const result = await this.workerNodeRepo.findOne({ where: { id } })
		if (!result) throw new Error('WorkerNode not found')
		return result
	}
	async create(workerNode: WorkerNode): Promise<WorkerNode> {
		return this.workerNodeRepo.save(workerNode)
	}
	async update(id: string, workerNode: Partial<WorkerNode>): Promise<boolean> {
		const result = await this.workerNodeRepo.update(id, workerNode)
		return TypeormLib.isAffectedSuccess(result)
	}



}