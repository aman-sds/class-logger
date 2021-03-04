"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NestLogger {
    constructor(logger, labels = ['APP']) {
        this.logger = logger;
        this.labels = labels;
    }
    log(message) {
        this.logger.log(this.labels, message);
    }
    error(message, trace) {
        this.logger.err(this.labels, message, trace);
    }
    warn(message) {
        this.logger.wrn(this.labels, message);
    }
    debug(message) {
        this.logger.dbg(this.labels, message);
    }
    verbose(message) {
        this.logger.trace(this.labels, message);
    }
}
exports.NestLogger = NestLogger;
//# sourceMappingURL=Nest.logger.js.map