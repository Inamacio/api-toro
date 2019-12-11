import * as express from 'express';
import { BusinessError } from '../utils/errors';

/**
 * Trata os erros ocorridos numa requisição. TODO refatorar
 *
 * @param err objeto de erro
 * @param req objeto da requisição HTTP
 * @param res objeto de resposta HTTP
 * @param next próximo handler da cadeia
 */
export default function errorHandler(err: any, req: express.Request, res: express.Response,
  next: express.NextFunction) {

  if (res.headersSent) {
    return next(err);
  }

  if (err.statusCode && err.message) {

    res.set('Content-Type', 'application/json');
    res.status(err.statusCode);
    res.json({ message: err.message });
  } else if (err.name === 'ValidationError') {
    if (res.headersSent) {
      return next(err);
    }

    res.set('Content-Type', 'application/json');
    res.status(422);
    res.json({ message: err.message });
  } else if (err instanceof BusinessError) {
    if (res.headersSent) {
      return next(err);
    }

    res.set('Content-Type', 'application/json');
    res.status(403);
    res.json({ message: err.message });
  } else {
    console.error(`Unexpeced error: ${err.message}`);
    res.status(500);
    res.send(`${err.stack}`);
  }
}
