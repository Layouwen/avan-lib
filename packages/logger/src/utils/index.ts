import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { SPLAT } from "triple-beam";
import path from "path";

const getTimestampFormat = () =>
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  });

const getErrorsFormat = () => format.errors({ stack: true });

const getPrintfFormat = () =>
  format.printf(({ level, service, timestamp, message, ...rest }) => {
    const parseMessage = (message: any) => {
      return typeof message === "object" ? JSON.stringify(message) : message;
    };

    let result = `[${timestamp}] [${service}] [${level.toUpperCase()}]: ${parseMessage(
      message
    )}`;

    const splat = rest[SPLAT];
    if (splat?.length) {
      splat.forEach((i: any) => {
        result += ` ${parseMessage(i)}`;
      });
    }

    return result;
  });

const getBaseFormat = () =>
  format.combine(getTimestampFormat(), getErrorsFormat(), getPrintfFormat());

export class Logger {
  error: winston.Logger;
  daily: winston.Logger;
  debug: winston.Logger;

  constructor({
    logPath = path.resolve(process.cwd(), "logs"),
    projectName = "project",
  }: {
    logPath?: string;
    projectName?: string;
  } = {}) {
    this.error = winston.createLogger({
      level: "debug",
      defaultMeta: { service: projectName },
      format: getBaseFormat(),
      transports: [
        new DailyRotateFile({
          level: "debug",
          dirname: path.join(logPath, "error"),
          filename: "error.%DATE%.log",
          datePattern: "YYYY-MM-DD",
          // maxSize: '20m',
          // maxFiles: '14d',
        }),
        new transports.Console(),
      ],
    });

    this.daily = winston.createLogger({
      level: "debug",
      defaultMeta: { service: projectName },
      format: getBaseFormat(),
      transports: [
        new DailyRotateFile({
          level: "debug",
          dirname: path.resolve(logPath, "daily"),
          filename: "daily.%DATE%.log",
          datePattern: "YYYY-MM-DD",
        }),
        new transports.Console(),
      ],
    });

    this.debug = winston.createLogger({
      level: "debug",
      defaultMeta: { service: projectName },
      format: getBaseFormat(),
      transports: [
        new transports.File({
          level: "debug",
          dirname: path.resolve(logPath),
          filename: "debug.log",
        }),
        new transports.Console(),
      ],
    });
  }
}
