export type LoggerRepository = {
    error(type: string, message: string, details?: string | object): void;

    info(type: string, message: string, details?: string | object): void;

    warn(type: string, message: string, details?: string | object): void;

    debug(type: string, message: string, details?: string | object): void;
};
