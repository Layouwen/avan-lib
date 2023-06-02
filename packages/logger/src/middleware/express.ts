import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils';

export const expressMid = (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
  const {method, url, query, body, headers, ip} = req;
  logger.daily.info(method, url, query, body, headers['user-agent'], headers.host, ip);
  next();
};
