import { WorkerNode } from "powertube-shared"


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

    getByHost(host: string): Promise<WorkerNode>


    getByID(id: string): Promise<WorkerNode>

    create(workerNode: Entity<WorkerNode, "rating" | "lastConnectionAt">): Promise<WorkerNode>

    update(id: string, workerNode: Partial<WorkerNode>): Promise<boolean>
}


export interface WorkerNodeProducerRepository {
    confirmWorkerNodeConnection(host: string): Promise<boolean>

    disconnectWorkerNode(host: string): Promise<boolean>
}