export class WorkerNode implements WorkerNode {
    ip: string;
    host: string;
    speed: number;
    maxConnections: number;
    constructor(ip: string, host: string, speed: number, maxConnections: number) {
        this.ip = ip;
        this.host = host;
        this.speed = speed;
        this.maxConnections = maxConnections;
    }
}
