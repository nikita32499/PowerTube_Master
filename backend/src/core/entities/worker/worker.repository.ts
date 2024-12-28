import { WorkerNode } from 'core/entities/worker/worker.entity'


export interface TWorkerNodeService {
    getWorkerNodeByIp(ip: string): Promise<WorkerNode>


    getBestWorkerNode(): Promise<WorkerNode>
}



// export interface WorkerDatabaseRepository {

//     getAllWorkerNodes(): Promise<WorkerNode[]>

//     getWorkerNodeByIp(ip: string): Promise<WorkerNode>

//     connectWorkerNode(workerNode: WorkerNode): boolean

//     updateWorkerNode(workerNode: WorkerNode): Promise<WorkerNode>
// }


export interface WorkerNodeDatabaseRepository {

    getAll(): Promise<WorkerNode[]>

    getByIp(ip: string): Promise<WorkerNode>


    getByID(ip: string): Promise<WorkerNode>

    create(workerNode: WorkerNode): Promise<WorkerNode>

    update(id: string, workerNode: Partial<WorkerNode>): Promise<boolean>
}


export interface WorkerNodeSocketRepository {
    (ip: string): Promise<WorkerNode>
}