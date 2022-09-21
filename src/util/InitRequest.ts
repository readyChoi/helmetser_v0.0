import {Request} from 'express';

const initialQuery = (req:any) => {
    // return [ req.query.action ? req.query.action as string : "",
    //     req.query.keyword ? req.query.keyword as string : "" ,
    //     req.user?.admin_email.split('@')[0]]

    return {
        action : req.query.action ? req.query.action as string : "",
        keyword : req.query.keyword ? req.query.keyword as string : "",
        admin_user : req.user?.id.split('@')[0]
    }
}

export const initRequestBody = (req:Request) => {
    req.body.forEach(element => {
        
    });
}

export default initialQuery