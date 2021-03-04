"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function stringify(o) {
    try {
        if (typeof o === 'string') {
            return o;
        }
        const cache = [];
        const res = JSON.stringify(o, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.includes(value)) {
                    return;
                }
                cache.push(value);
            }
            return value;
        });
        return res;
    }
    catch (e) {
        return '';
    }
}
exports.stringify = stringify;
function currentDatetimeToString() {
    return new Date().toISOString();
}
exports.currentDatetimeToString = currentDatetimeToString;
function getLogCaller() {
    const e = new Error();
    const stack = e && e.stack ? e.stack : '';
    const caller = `...${stack.split('\n')[4].slice(-35, -6)}`;
    return caller;
}
exports.getLogCaller = getLogCaller;
function print(logger, msg) {
    let str = stringify(msg);
    if (!str) {
        const { params } = msg, m = tslib_1.__rest(msg, ["params"]);
        str = stringify(Object.assign(Object.assign({}, m), { params: 'Stringification error' }));
    }
    logger.log(str);
}
exports.print = print;
//# sourceMappingURL=Log.helpers.js.map