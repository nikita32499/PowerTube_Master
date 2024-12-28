import { WorkerNodeData } from '../worker.entity'




export class WorkerNodeLib {
	static getWorkerNodeRating(workerData: WorkerNodeData): number {
		return workerData.maxConnections - workerData.currentConnectionsCount
	}
}