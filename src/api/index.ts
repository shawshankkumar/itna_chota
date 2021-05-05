import express, { Router, Request, Response } from 'express';
import { routerHandler } from './router';

export default (): Router => {
    const app = express();
    app.use(routerHandler());
    return app;
};
