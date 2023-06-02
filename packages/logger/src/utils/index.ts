import log4js from 'log4js';
import path from 'path';

export class Logger {
  private readonly logger: log4js.Log4js;

  debug: log4js.Logger;
  error: log4js.Logger;
  daily: log4js.Logger;

  constructor (logPath: string) {
    this.logger = log4js;
    this.logger.configure({
      appenders: {
        console: {type: 'console'},
        debug: {
          type: 'file',
          filename: path.join(logPath, 'debug.log'),
        },
        daily: {
          type: 'dateFile',
          filename: path.join(logPath, 'daily', 'daily.log'),
          pattern: 'yyyy-MM-dd',
          alwaysIncludePattern: true,
          keepFileExt: true,
        },
        error: {
          type: 'dateFile',
          filename: path.join(logPath, 'error', 'error.log'),
          pattern: 'yyyy-MM-dd',
          alwaysIncludePattern: true,
          keepFileExt: true,
        },
      },
      categories: {
        default: {
          appenders: ['console', 'debug'],
          level: 'all',
        },
        debug: {
          appenders: ['console', 'debug'],
          level: 'all',
        },
        daily: {
          appenders: ['console', 'daily'],
          level: 'all',
        },
        error: {
          appenders: ['console', 'error'],
          level: 'all',
        },
      },
    });

    this.daily = this.logger.getLogger('daily');
    this.debug = this.logger.getLogger('debug');
    this.error = this.logger.getLogger('error');
  }
}
