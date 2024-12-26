// import { Injectable } from '@nestjs/common';
// import { Redis } from 'ioredis';

// @Injectable()
// export class CacheService {
//     constructor(private readonly redis: Redis) {}

//     async get<T>(key: string): Promise<T | null> {
//         const cached = await this.redis.get(key);
//         return cached ? JSON.parse(cached) : null;
//     }

//     async set(key: string, value: any, ttl?: number): Promise<void> {
//         await this.redis.set(key, JSON.stringify(value), 'EX', ttl || 3600);
//     }
// }
