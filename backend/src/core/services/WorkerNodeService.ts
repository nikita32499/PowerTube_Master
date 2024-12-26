import { WorkerNode } from 'core/entities/worker/worker.entity'
import { TWorkerNodeService, WorkerNodeRepository } from 'core/entities/worker/worker.repository'





export class WorkerNodeService implements TWorkerNodeService {
	constructor(private readonly workerNodeRepo: WorkerNodeRepository) { }



	async getBestWorkerNode(): Promise<WorkerNode> {
		const workerNodeList = await this.workerNodeRepo.getAllWorkerNodes()
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
		return this.workerNodeRepo.getWorkerNodeByIp(ip)
	}



	async connectWorkerNode(workerNode: WorkerNode): Promise<boolean> {
		return this.workerNodeRepo.connectWorkerNode(workerNode)
	}


}