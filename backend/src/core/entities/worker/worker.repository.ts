import { WorkerNode } from 'core/entities/worker/worker.entity'

export interface WorkerNodeRepository {
    workerNodeList: WorkerNode[]

    connectWorkerNode(workerNode: WorkerNode): boolean
}
