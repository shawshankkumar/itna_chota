import express, { Router, Request, Response } from 'express';
import { routerHandler } from './router';

export default (): Router => {
    const app = express();
    const app2 = express();
    let path = 'C:/URL Short/intachota/src/views';
    app.set('views', path);
    app.set('view engine', 'ejs');

    //TODO: add routes here...
    app.use('/test', (req: Request, res: Response) => {
        res.send('Test successful');
    });

    app.use('/link/', routerHandler());

    app.get('*', (req: Request, res: Response) => {
        res.render('error');
    });
    return app;
};
