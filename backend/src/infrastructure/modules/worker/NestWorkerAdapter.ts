import { Inject, Injectable } from '@nestjs/common'
import { WorkerNode } from 'core/entities/worker/worker.entity'
import { WorkerNodeDatabaseRepository } from 'core/entities/worker/worker.repository'
import { DI_TOKENS } from 'infrastructure/config/constants'




@Injectable()
export class NestWorkerAdapter {
	constructor(@Inject(DI_TOKENS.WORKER.DATABASE) private readonly workerNodeDatabase: WorkerNodeDatabaseRepository) { }



	async getBestWorkerNode(): Promise<WorkerNode> {
		const workerNodeList = await this.workerNodeDatabase.getAll()
		if (!workerNodeList[0]) {
			throw new Error('No worker nodes found')
		}

		const bestWorkerNode = workerNodeList.reduce<WorkerNode>((acc, curr) => {
			if (curr.rating > acc.rating) {
				return curr
			}
			return acc
		}, workerNodeList[0])

		return bestWorkerNode
	}


	async getWorkerNodeByIp(ip: string): Promise<WorkerNode> {
		return this.workerNodeDatabase.getByIp(ip)
	}



	async createWorkerNode(workerNode: WorkerNode): Promise<WorkerNode> {
		return this.workerNodeDatabase.create(workerNode)
	}


}