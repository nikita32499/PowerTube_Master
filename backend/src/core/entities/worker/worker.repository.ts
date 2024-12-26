import { WorkerNode } from 'core/entities/worker/worker.entity'


export interface TWorkerNodeService {
    getWorkerNodeByIp(ip: string): Promise<WorkerNode>


    getBestWorkerNode(): Promise<WorkerNode>
}



export interface WorkerNodeRepository {
    workerNodeList: WorkerNode[]

    getAllWorkerNodes(): Promise<WorkerNode[]>

    getWorkerNodeByIp(ip: string): Promise<WorkerNode>

    connectWorkerNode(workerNode: WorkerNode): boolean

    updateWorkerNode(workerNode: WorkerNode): Promise<WorkerNode>
}
