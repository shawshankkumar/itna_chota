import express, { Router, Request, Response } from 'express';
import { createLink, fetchLink } from './controller';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let path = 'C:/URL Short/intachota/src/views';
app.set('views', path);
app.set('view engine', 'ejs');
export const routerHandler = () => {
    app.get('/test', (req: express.Request, res: express.Response) => {
        //test
        res.render('hein');
    });
    app.get('/', landingPage);
    app.post('/create', createLinkHandler);
    app.get('/:code', fetchLinkHandler);
    app.get('/display/:code', display);
    return app;
};

const createLinkHandler = (req: express.Request, res: express.Response) => {
    createLink(req.body.link as string)
        .then(code => {
            let url = 'http://localhost:3000/api/link/display/' + code;
            console.log(url);
            res.redirect(url);
        })
        .catch(error => {
            res.status(error.code).json({ code: error.code, success: false, message: error.message });
        });
};

const display = (req: express.Request, res: express.Response) => {
    let url = 'http://localhost:3000/api/link/' + req.params.code;
    console.log(url);
    res.render('code', { url: url });
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

const landingPage = (req: express.Request, res: express.Response) => {
    res.render('index');
};
