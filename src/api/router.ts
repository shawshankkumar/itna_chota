import express, { Router, Request, Response } from 'express';
import { createLink, fetchLink } from './controller';

const app = Router();

export const routerHandler = () => {
  app.get('/', (req: express.Request, res: express.Response) => {
    //test
    res.send('Hein');
  });
  app.post('/create', createLinkHandler);
  app.get('/:code', fetchLinkHandler);
  return app;
};

const createLinkHandler = (req: express.Request, res: express.Response) => {
  createLink(req.body.url as string)
    .then(code => {
      res.json(code);
    })
    .catch(error => {
      res.status(error.code).json({ code: error.code, success: false, message: error.message });
    });
};

const fetchLinkHandler = (req: express.Request, res: express.Response) => {
  fetchLink(req.params.code as string)
    .then(link => {
      res.status(301).redirect(link.url);
    })
    .catch(error => {
      res.status(error.code).json({ code: error.code, success: false, message: error.message });
    });
};
