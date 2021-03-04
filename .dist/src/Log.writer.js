"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_helpers_1 = require("./Log.helpers");
class LogWriter {
    constructor(logger, config) {
        this.levels = ['ERR', 'WRN', 'LOG', 'INF', 'DBG', 'TRC', 'ALL'];
        this.globalLevel = config.globalLevel || 'INF';
        this.levelByLabel = config.levelByLabel || {};
        this.mode = config.mode || 'production';
        this.logger = logger;
        this.pid = config.pid || 0;
    }
    write(levelLabel, labels, data, err) {
        if (!this.isNeedToSkip(levelLabel, labels)) {
            const timestamp = Log_helpers_1.currentDatetimeToString();
            const caller = Log_helpers_1.getLogCaller();
            const formattedLabels = this.prepareLabels(labels);
            const pid = this.pid;
            const stack = (err && (err.stack || Log_helpers_1.stringify(err))) || '';
            const level = this.levels.indexOf(levelLabel);
            if (this.mode === 'development') {
                this.logger.log(`${timestamp} [PID ${pid}] [${caller}] [${formattedLabels}] ${levelLabel}: ${Log_helpers_1.stringify(data)}, ${stack ? ', stack:' + stack : ''}`);
            }
            else {
                Log_helpers_1.print(this.logger, {
                    timestamp,
                    pid,
                    caller,
                    level,
                    levelLabel,
                    labels: formattedLabels,
                    message: Log_helpers_1.stringify(data),
                    stack
                });
            }
        }
    }
    isNeedToSkip(level, labels) {
        for (let i = labels.length - 1; i >= 0; i--) {
            const label = labels[i].trim().toUpperCase();
            const levelForLabel = this.levelByLabel[label];
            if (levelForLabel) {
                return this.levels.indexOf(level) > this.levels.indexOf(levelForLabel);
            }
        }
        return this.levels.indexOf(level) > this.levels.indexOf(this.globalLevel);
    }
    isLevelEnabled(level, labels) {
        return !this.isNeedToSkip(level, labels);
    }
    isTraceEnabled(labels) {
        return this.isLevelEnabled('TRC', labels);
    }
    isDebugEnabled(labels) {
        return this.isLevelEnabled('DBG', labels);
    }
    setLevel(level, label) {
        if (label) {
            this.levelByLabel[label.trim().toUpperCase()] = level;
        }
        else {
            this.globalLevel = level;
        }
    }
    prepareLabels(labels) {
        return labels.map(label => label.toUpperCase());
    }
    trace(labels, data) {
        this.write('TRC', labels, data);
    }
    dbg(labels, data) {
        this.write('DBG', labels, data);
    }
    info(labels, data) {
        this.write('INF', labels, data);
    }
    log(labels, data) {
        this.write('LOG', labels, data);
    }
    wrn(labels, data) {
        this.write('WRN', labels, data);
    }
    err(labels, data, err) {
        this.write('ERR', labels, data, err);
    }
}
exports.LogWriter = LogWriter;
//# sourceMappingURL=Log.writer.js.map