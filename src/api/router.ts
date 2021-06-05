import express, { Request, Response } from 'express';
import { createLink, fetchLink } from './controller';
import * as yup from 'yup';
import LoggerInstance from '../loaders/logger';

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const routerHandler = () => {
    app.post('/create/link', createLinkHandler);
    app.get('/fetch/link/', fetchLinkHandler);
    return app;
};

const createLinkHandler = (req: Request, res: Response) => {
    const linkSchema = yup.object().shape({ link: yup.string().required() });
    linkSchema
        .validate(req.body)
        .then(() => {
            createLink(req.body.link as string)
                .then(code => {
                    res.status(201).json({ succces: true, message: 'url shortened!', code: code });
                })
                .catch(error => {
                    res.status(error.code).json({ code: error.code, success: false, message: error.message });
                });
        })
        .catch(err => {
            LoggerInstance.error(err.message);
            res.status(400).json({ success: false, message: err.message });
        });
};

const fetchLinkHandler = (req: express.Request, res: express.Response) => {
    const fetchSchema = yup.object().shape({
        code: yup.string().length(6).required(),
    });
    fetchSchema
        .validate(req.query)
        .then(() => {
            fetchLink(req.query.code as string)
                .then(link => {
                    res.status(200).json({ link: link, success: true, message: 'original link fetched' });
                })
                .catch(error => {
                    res.status(error.code).json({ code: error.code, success: false, message: error.message });
                });
        })
        .catch(err => {
            LoggerInstance.error(err.message);
            res.status(400).json({ success: false, message: err.message });
        });
};
