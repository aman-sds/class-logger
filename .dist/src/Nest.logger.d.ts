import { LogWriter } from './Log.writer';
export declare class NestLogger {
    private logger;
    private labels;
    constructor(logger: LogWriter, labels?: string[]);
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
