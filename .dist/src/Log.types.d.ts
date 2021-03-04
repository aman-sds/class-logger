export declare type Levels = 'ALL' | 'TRC' | 'DBG' | 'INF' | 'LOG' | 'WRN' | 'ERR';
export declare type Mode = 'production' | 'development';
export interface ILogger {
    log(...args: any[]): void;
}
export declare enum ELevels {
    Error = 0,
    Warning = 1,
    Log = 2,
    Info = 3,
    Debug = 4,
    Trace = 5,
    All = 6
}
export interface ILogMessage {
    timestamp: string;
    pid: number;
    caller: string;
    labels: string[];
    message: any;
    level: ELevels;
    levelLabel: Levels;
    callId?: string;
    operationStage?: string;
    executionTime?: number;
    origin?: string;
    params?: any;
    stack?: string;
}
export interface ILoggerConfig {
    globalLevel?: Levels;
    levelByLabel?: {};
    mode?: Mode;
    pid?: number;
}
export interface IClassLoggerConfig {
    logger?: ILogger;
    pid?: number;
    level?: ELevels;
    labels?: string[];
}
