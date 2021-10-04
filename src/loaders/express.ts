import bodyParser from 'body-parser';
import cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import routes from '../api';

export default ({ app }: { app: express.Application }): void => {
    /**
     * Health Check endpoints
     */

    app.get('/healthcheck', (req, res) => {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
        };
        try {
            return res.json(healthcheck);
        } catch (e) {
            return res.status(503).send();
        }
    });

    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // Middleware that helps secure app by setting headers
    app.use(helmet());

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    // Load API routes
    app.use('/api', routes());
    app.get('/:code', (req, res) => {
        res.redirect(`https://itnachota.vercel.app/${req.params.code}`);
    });
    app.get('*', (req, res) => {
        res.redirect('https://itnachota.vercel.app/');
    });
};
