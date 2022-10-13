import express, { Request, Response } from 'express';
import { createLink, fetchLink } from './controller';
import * as yup from 'yup';
import LoggerInstance from '../loaders/logger';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
export const routerHandler = () => {
    app.post('/create/link', createLinkHandler);
    app.get('/fetch/link/', fetchLinkHandler);
    return app;
};

const createLinkHandler = async (req: Request, res: Response) => {
    try {
        const linkSchema = yup.object().shape({ link: yup.string().required() });
        await linkSchema.validate(req.body);
        const code = await createLink(req.body.link as string);
        res.status(201).json({ succces: true, message: 'url shortened!', code: code });
    } catch (err) {
        LoggerInstance.error(err.message);
        res.status(err.code || 400).json({ success: false, message: err.message });
    }
};

const fetchLinkHandler = async (req: express.Request, res: express.Response) => {
    try {
        const fetchSchema = yup.object().shape({
            code: yup.string().length(6).required(),
        });

        await fetchSchema.validate(req.query);
        const link = await fetchLink(req.query.code as string);
        res.status(200).json({ link: link, success: true, message: 'original link fetched' });
    } catch (err) {
        LoggerInstance.error(err.message);
        res.status(err.code || 400).json({ success: false, message: err.message });
    }
};
