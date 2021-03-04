import { ILogger, ILogMessage } from './Log.types';
export declare function stringify(o: any): string;
export declare function currentDatetimeToString(): string;
export declare function getLogCaller(): string;
export declare function print(logger: ILogger, msg: ILogMessage): void;
