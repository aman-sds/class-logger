"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Log_types_1 = require("./Log.types");
const Log_helpers_1 = require("./Log.helpers");
function LogClass({ logger = console, pid = process ? process.pid : 0, level = Log_types_1.ELevels.Debug, labels = [] } = {}) {
    return function (target) {
        Object.getOwnPropertyNames(target).map(fn => {
            const descriptor = Object.getOwnPropertyDescriptor(target, fn);
            if (descriptor && descriptor.value instanceof Function)
                return Object.defineProperty(target, fn, decorator(target, fn, Object.getOwnPropertyDescriptor(target, fn), level, target.name, logger, labels, pid));
        });
        return class extends target {
            constructor(...args) {
                super(...args);
                const prototype = super.constructor.prototype;
                Object.getOwnPropertyNames(prototype).map(fn => {
                    const descriptor = Object.getOwnPropertyDescriptor(prototype, fn);
                    if (descriptor && descriptor.value instanceof Function)
                        return Object.defineProperty(this, fn, decorator(this, fn, Object.getOwnPropertyDescriptor(prototype, fn), level, target.name, logger, labels, pid));
                });
            }
        };
    };
}
exports.LogClass = LogClass;
function LogMethod({ logger = console, pid = process ? process.pid : 0, level = Log_types_1.ELevels.Debug, labels = [] }) {
    return (target, key, descriptor) => {
        const name = target.prototype ? target.prototype.constructor.name : target.constructor.name;
        return decorator(descriptor.value, key, descriptor, level, name, logger, labels, pid);
    };
}
exports.LogMethod = LogMethod;
function decorator(fn, key, descriptor, level, name, logger, labels, pid) {
    if (Log_types_1.ELevels.Debug <= level) {
        const method = descriptor.value;
        return Object.assign(Object.assign({}, descriptor), { value: method.constructor.name === 'AsyncFunction'
                ? function (...args) {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const { startTime, caller, arg, callId } = onStart(args, key, level, name, logger, labels, pid);
                        try {
                            const result = yield method.apply(this, args);
                            onSuccess(startTime, result, key, level, name, logger, labels, pid, caller, callId, arg);
                            return result;
                        }
                        catch (e) {
                            onFail(startTime, key, level, name, logger, labels, pid, caller, callId, arg, e);
                        }
                    });
                }
                : function (...args) {
                    const { startTime, caller, arg, callId } = onStart(args, key, level, name, logger, labels, pid);
                    try {
                        const result = method.apply(this, args);
                        onSuccess(startTime, result, key, level, name, logger, labels, pid, caller, callId, arg);
                        return result;
                    }
                    catch (e) {
                        onFail(startTime, key, level, name, logger, labels, pid, caller, callId, arg, e);
                    }
                } });
    }
    else {
        return descriptor;
    }
}
function onStart(args, key, level, name, logger, labels, pid) {
    const arg = args.map(arg => {
        const res = Log_helpers_1.stringify(arg) || '';
        const sliced = res.slice(0, 400);
        return sliced.length !== res.length ? sliced : arg;
    });
    const callId = Math.random()
        .toString()
        .slice(2, 8);
    const e = new Error();
    const stack = e && e.stack ? e.stack : '';
    const caller = `...${stack.split('\n')[3].slice(-35, -1)}`;
    const startTime = Date.now();
    Log_helpers_1.print(logger, {
        timestamp: Log_helpers_1.currentDatetimeToString(),
        caller,
        levelLabel: 'DBG',
        level: Log_types_1.ELevels.Debug,
        origin: `${name}.${key}`,
        labels,
        callId,
        operationStage: 'START',
        pid,
        params: arg,
        message: `Start execution method ${key}`
    });
    return { startTime, caller, arg, callId };
}
function onSuccess(startTime, result, key, level, name, logger, labels, pid, caller, callId, arg) {
    const executionTime = Date.now() - startTime;
    const resString = (Log_helpers_1.stringify(result) || '').slice(0, 150);
    Log_helpers_1.print(logger, {
        timestamp: Log_helpers_1.currentDatetimeToString(),
        caller,
        levelLabel: 'DBG',
        level: Log_types_1.ELevels.Debug,
        origin: `${name}.${key}`,
        labels,
        callId,
        operationStage: 'SUCCESS',
        pid,
        executionTime,
        params: arg,
        message: resString
    });
}
function onFail(startTime, key, level, name, logger, labels, pid, caller, callId, arg, e) {
    const executionTime = Date.now() - startTime;
    if (!e) {
        e = new Error('Undefined error');
    }
    Log_helpers_1.print(logger, {
        timestamp: Log_helpers_1.currentDatetimeToString(),
        caller,
        levelLabel: 'DBG',
        level: Log_types_1.ELevels.Debug,
        origin: `${name}.${key}`,
        labels,
        callId,
        operationStage: 'FAIL',
        pid,
        executionTime,
        message: e,
        params: arg,
        stack: e.stack
    });
    throw e;
}
//# sourceMappingURL=Log.decorator.js.map