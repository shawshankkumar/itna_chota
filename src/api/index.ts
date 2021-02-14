import { Router, Request, Response } from 'express';
import { routerHandler } from './router';
export default (): Router => {
  const app = Router();

  //TODO: add routes here...
  app.use('/test', (req: Request, res: Response) => {
    res.send('Test successful');
  });

  app.use('/link', routerHandler());
  return app;
};
