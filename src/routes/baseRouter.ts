import { Router, NextFunction, Request, Response } from 'express';

import UtilDao from '../daos/Util/UtilDao'
import { Values, util } from './values';
import { setResponseData } from '../model/Result';

const utilDao = new UtilDao();


// Export the base-router
const baseRouter = Router();
baseRouter.all('/*', function (req, res, next) {
    console.log('in baseRouter',req.url, req.method)
    next();
});

baseRouter.post('/users', (req, res) => {
    let user_info:any = null;
    console.log('req : ', req.user, req.session)
    console.log('req : ', req.isAuthenticated())
    if (!req.user) {
        console.log('!user!!')
        user_info = [];
    } else {
        console.log('req user : ',req.user)
        user_info = JSON.parse(JSON.stringify(req.user));
    }
    res.json(user_info)
})

baseRouter.get('/main', (req: any, res) => {
        res.redirect('/v0')
})

baseRouter.get(util.displayImage, (req: Request, res: Response, next: NextFunction) => {
    let fileName: string = req.query.fileName as string, res_json: any = {};
    console.log(fileName)

    if (fileName.length == 0 || fileName == 'undefined') {
        res_json = setResponseData(res_json, Values.FAIL_CODE, Values.FAIL_MESSAGE);
        res.json(res_json)
    } else {
        utilDao.displayImage(fileName, (data: any) => {
            if (data) {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                res.write(data.Body, 'binary')
                res.end(null, 'binary')
            } else {
                res_json = setResponseData(res_json, Values.FAIL_CODE, Values.FAIL_MESSAGE);
                res.json(res_json)
            }
        })
    }
})

baseRouter.get(util.displayFile, async (req, res) => {
    let fileName: string = req.query.fileName as string, res_json: any = {};
    console.log(fileName)

    if (fileName.length == 0 || fileName == 'undefined') {
        console.log('fail')
        res_json = setResponseData(res_json, Values.FAIL_CODE, Values.FAIL_MESSAGE);
        res.json(res_json)
    } else {        
        utilDao.displayFile(fileName).then((data: any) => {
            console.log('data!', data, typeof data)
            res.contentType("application/pdf");
            res.send(data.Body)
        }).catch(err => {
            console.log('err!', err);
            res_json = setResponseData(res_json, Values.FAIL_CODE, Values.FAIL_MESSAGE);
            res.json(res_json)
        })
    }
})

export default baseRouter;
