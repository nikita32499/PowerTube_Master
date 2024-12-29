import { Inject, Injectable } from '@nestjs/common'
import { WorkerNodeDatabaseRepository } from 'core/repository/worker.repository'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { WorkerNode, WorkerNodeData, WorkerNodeFactory, WorkerNodeParameters } from 'powertube-shared'




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
	async getWorkerNodeByHost(host: string): Promise<WorkerNode> {
		return this.workerNodeDatabase.getByHost(host)
	}



	getInitParameters(): WorkerNodeParameters {
		return {
			maxConnections: 10,
			incomingSpeed: 1000,
			outgoingSpeed: 1000,
			ssl: true,
		}
	}


	async createWorkerNode(workerNode: WorkerNodeData): Promise<WorkerNode> {


		const workerNodeEntity = WorkerNodeFactory.createWorkerNodeEntity(workerNode.host, this.getInitParameters())


		return this.workerNodeDatabase.create(workerNodeEntity)
	}


}