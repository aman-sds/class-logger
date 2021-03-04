import { IClassLoggerConfig } from './Log.types';
export declare function LogClass({ logger, pid, level, labels }?: IClassLoggerConfig): <TFunction extends Function>(target: TFunction) => TFunction;
export declare function LogMethod({ logger, pid, level, labels }: IClassLoggerConfig): (target: any, key: string, descriptor: PropertyDescriptor) => any;
