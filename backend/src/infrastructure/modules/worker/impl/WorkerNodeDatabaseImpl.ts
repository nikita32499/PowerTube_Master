import { InjectRepository } from '@nestjs/typeorm'
import { WorkerNodeDatabaseRepository as Repo, WorkerNodeDatabaseRepository } from 'core/repository/worker.repository'
import { TypeormLib } from 'infrastructure/common/helpers/typeorm/typeorm.libs'
import { Repository } from 'typeorm'
import { WorkerNodeDB } from '../db/worker.typeorm'



export class WorkerNodeDatabaseImpl implements WorkerNodeDatabaseRepository {
	constructor(@InjectRepository(WorkerNodeDB) private readonly workerNodeRepo: Repository<WorkerNodeDB>) {

	}
	getAll: Repo["getAll"] = async () => {
		return this.workerNodeRepo.find()
	}
	getByHost: Repo["getByHost"] = async (host) => {
		const result = await this.workerNodeRepo.findOne({ where: { host } })
		if (!result) throw new Error('WorkerNode not found')
		return result
	}
	getByID: Repo["getByID"] = async (id) => {
		const result = await this.workerNodeRepo.findOne({ where: { id } })
		if (!result) throw new Error('WorkerNode not found')
		return result
	}
	create: Repo["create"] = async (workerNode) => {
		return this.workerNodeRepo.save(workerNode)
	}
	update: Repo["update"] = async (id, workerNode) => {
		const result = await this.workerNodeRepo.update(id, workerNode)
		return TypeormLib.isAffectedSuccess(result)
	}





}



