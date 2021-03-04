import { ILogger, ILoggerConfig, Levels } from './Log.types';
export declare class LogWriter {
    constructor(logger: ILogger, config: ILoggerConfig);
    private globalLevel;
    private readonly mode;
    private readonly pid;
    private readonly logger;
    private readonly levelByLabel;
    private readonly levels;
    private write;
    isNeedToSkip(level: Levels, labels: string[]): boolean;
    isLevelEnabled(level: Levels, labels: string[]): boolean;
    isTraceEnabled(labels: string[]): boolean;
    isDebugEnabled(labels: string[]): boolean;
    setLevel(level: Levels, label?: string): void;
    prepareLabels(labels: string[]): string[];
    trace(labels: string[], data: any): void;
    dbg(labels: string[], data: any): void;
    info(labels: string[], data: any): void;
    log(labels: string[], data: any): void;
    wrn(labels: string[], data: any): void;
    err(labels: string[], data: any, err: any): void;
}
