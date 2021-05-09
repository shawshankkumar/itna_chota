import express, { Router, Request, Response } from 'express';
import { createLink, fetchLink } from './controller';
import config from './../config/index';

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const routerHandler = () => {
    app.post('/create/link', createLinkHandler);
    app.get('/fetch/link/', fetchLinkHandler);
    return app;
};

const createLinkHandler = (req: express.Request, res: express.Response) => {
    createLink(req.body.link as string)
        .then(code => {
            res.status(201).json({ succces: true, message: 'url shortened!', code: code });
        })
        .catch(error => {
            res.status(error.code).json({ code: error.code, success: false, message: error.message });
        });
};

const fetchLinkHandler = (req: express.Request, res: express.Response) => {
    fetchLink(req.query.code as string)
        .then(link => {
            res.status(200).json({ link: link, success: true, message: 'original link fetched' });
        })
        .catch(error => {
            res.status(error.code).json({ code: error.code, success: false, message: error.message });
        });
};
