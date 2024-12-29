import { Injectable } from '@nestjs/common'
import { LoggerRepository } from 'core/repository/logger.repository'
import winston from 'winston'

@Injectable()
export class LoggerRepositoryImpl implements LoggerRepository {
    private readonly logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
            ],
        })
    }

    error(type: string, message: string, details?: string | object): void {
        this.logger.error(type, message, details)
    }

    info(type: string, message: string, details?: string | object): void {
        this.logger.info(type, message, details)
    }

    warn(type: string, message: string, details?: string | object): void {
        this.logger.warn(type, message, details)
    }

    debug(type: string, message: string, details?: string | object): void {
        this.logger.debug(type, message, details)
    }
}
