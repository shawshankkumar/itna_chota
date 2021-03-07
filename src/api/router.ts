import express, { Router, Request, Response } from 'express';
import { createLink, fetchLink } from './controller';
import config from './../config/index';
import urljoin from 'url-join';

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let path = require('path');
let dirname = __dirname;
let l = dirname.length;
let path3 = dirname.substring(0, l - 10);
let path1 = path.join(path3, '/src', '/views');

app.set('views', path1);

app.set('view engine', 'ejs');
export const routerHandler = () => {
    app.get('/test', (req: express.Request, res: express.Response) => {
        //test
        res.render('hein');
    });
    app.get('/', landingPage);
    app.post('/display', createLinkHandler);
    app.get('/:code', fetchLinkHandler);
    app.get('/display/:code', display);
    return app;
};

const createLinkHandler = (req: express.Request, res: express.Response) => {
    createLink(req.body.link as string)
        .then(code => {
            res.redirect('display/' + code);
        })
        .catch(error => {
            res.status(error.code).json({ code: error.code, success: false, message: error.message });
        });
};

const display = (req: express.Request, res: express.Response) => {
    let portno = config.port;
    let portno1 = portno.toString();
    let url = 'http://localhost:' + portno1 + '/api/link/' + req.params.code;
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
