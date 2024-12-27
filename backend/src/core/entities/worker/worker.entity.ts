import { TWorkerNodeHistory } from './types/worker.types'







export class WorkerNodeData {
    host: string
    speed: number
    maxConnections: number
    currentConnectionsCount: number
    available: boolean
    history: TWorkerNodeHistory[]

    constructor(workerData: WorkerNodeData) {

        this.host = workerData.host
        this.speed = workerData.speed
        this.maxConnections = workerData.maxConnections
        this.currentConnectionsCount = workerData.currentConnectionsCount

        this.available = workerData.available
        this.history = workerData.history
    }




}


export class WorkerNode extends WorkerNodeData {
    id: string
    ip: string
    rating: number

    constructor(workerData: WorkerNode) {
        super(workerData)
        this.id = workerData.id
        this.ip = workerData.ip
        this.rating = this.getWorkerNodeRating()
    }

    private getWorkerNodeRating(): number {


        let rating = this.maxConnections - this.currentConnectionsCount


        return rating
    }
}