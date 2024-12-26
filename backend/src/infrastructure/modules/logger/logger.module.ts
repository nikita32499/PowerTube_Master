import { Module } from '@nestjs/common';
import { LoggerRepositoryImpl } from './LoggerRepositoryImpl';

@Module({
    providers: [LoggerRepositoryImpl],
    exports: [LoggerRepositoryImpl],
})
export class LoggerModule {}
