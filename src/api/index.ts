import { Router, Request, Response } from 'express';
import { routerHandler } from './router';
export default (): Router => {
  const app = Router();

  //TODO: add routes here...
  app.use('/hi', (req: Request, res: Response) => {
    res.send('Hi');
  });
  app.use('/hello', (req: Request, res: Response) => {
    res.send('Hello');
  });
  app.use('/link', routerHandler);
  return app;
};
