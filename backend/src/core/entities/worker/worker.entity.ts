

enum EnumWorkerNodeHistoryType {
    USER_CONNECTION_FAILED = 'USER_CONNECTION_FAILED',
}

export type TWorkerNodeHistory = {
    type: EnumWorkerNodeHistoryType.USER_CONNECTION_FAILED
    date: number
}



export class WorkerNode {
    ip: string
    host: string
    speed: number
    maxConnections: number
    currentConnectionsCount: number
    rating: number
    available: boolean
    history: TWorkerNodeHistory[]

    constructor(workerData: WorkerNode) {
        this.ip = workerData.ip
        this.host = workerData.host
        this.speed = workerData.speed
        this.maxConnections = workerData.maxConnections
        this.currentConnectionsCount = workerData.currentConnectionsCount
        this.rating = this.getWorkerNodeRating()
        this.available = workerData.available
        this.history = workerData.history
    }



    private getWorkerNodeRating(): number {
        // let rating = workerNode.history.reduce((acc, curr) => {
        //     if (curr.type === EnumWorkerNodeHistoryType.USER_CONNECTION_FAILED) {
        //         acc -= 1
        //     }
        //     return acc
        // }, 0)

        let rating = this.maxConnections - this.currentConnectionsCount


        return rating
    }
}
