import express, { Router, Request, Response } from 'express';
import { createLink, fetchLink } from './controller';

const app = Router();

export const routerHandler = () => {
  const app2 = Router();
  app2.get('/link', (req: express.Request, res: express.Response) => {
    //test
    res.send('Hi');
  });
  app2.post('/create', createLinkHandler);
  app2.get('/:code', fetchLinkHandler);
  return app;
};

const createLinkHandler = (req: express.Request, res: express.Response) => {
  createLink(req.body as string)
    .then(code => {
      res.json(code);
    })
    .catch(error => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};

const fetchLinkHandler = (req: express.Request, res: express.Response) => {
  fetchLink(req.params.code as string)
    .then(link => {
      res.redirect(link);
    })
    .catch(error => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
