import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes/baseRouter';
import logger from '@shared/Logger';
import { cookieProps } from '@shared/constants';
import bodyParser from 'body-parser';
import passport from 'passport'
// import { config as passportConfig } from './config/passport';
import passportConfig from './config/passport';

const { createProxyMiddleware } = require('http-proxy-middleware');
// var proxy = require('http-proxy-middleware');
// import cors from 'cors'
const cors = require('cors');
import { CLIENT, CLIENT_DEV } from './routes/values'

import DatabaseService from './database/DatabaseService';
import expressSession from "express-session";

const app = express();
export const database = new DatabaseService();

const { BAD_REQUEST } = StatusCodes;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));
app.use(expressSession({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));

// app.use(createProxyMiddleware('/', {
//     target : CLIENT,
//     changeOrigin: true,
// }))

// app.use(express.static(path.join(__dirname, '../client/build')))
// app.use("/", function (req, res, next) {
//     console.log('client html', path.join(__dirname, '../client/build'))
//     console.log('url : ',req.url);

//     if (req.url === '/') {
//         console.log('access /');
//         res.sendFile(path.join(__dirname + "../client/build", "index.html"));
//     } else if ( req.url === '/logo192.png') {
//         console.log('logo!')
//         res.sendFile(path.join(__dirname + "/public/images/logo_green.png"))
//     } else {
//         console.log('next!')
//         next();
//     }

// });

if (process.env.NODE_ENV === 'production') {
    app.use(cors({ origin: CLIENT, credentials: true }));
} else {
    // app.use(cors({ origin: CLIENT_DEV, credentials: true }));
    app.use(cors({ origin: true, credentials: true }));
}

// app.use(cors());

// const corsOpt = function(req, callbank) {
//     callbank(null, {origin: true});
//   };
// app.options('*', cors(corsOpt));


// app.use(session({
//     secret: 'mittelstand',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         httpOnly: false,
//         // 10 hour
//         maxAge: 1000 * 60 * 60 * 10,
//     }
// }))

passportConfig(app, passport);


app.all('/*', function (req, res, next) {
    console.log(req.url, req.method)

    // res.header("Access-Control-Allow-Origin", "http://59.23.138.171:3000");
    if (process.env.NODE_ENV === 'production') {
        res.header("Access-Control-Allow-Origin", CLIENT);
    } else {
        res.header("Access-Control-Allow-Origin", CLIENT_DEV);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
// app.use('/api', BaseRouter);
app.use('/v0', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('/v3', (req: Request, res: Response) => {
    let action = req.params.action;

    res.render('admin/login.ejs', { action: action });
});

// Export express instance
export default app;
