import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { UserRoles } from '@entities/User';
import { cookieProps } from '@shared/constants';
import { IClientData, JwtService } from '@shared/JwtService';

import { member } from './values'

const jwtService = new JwtService();
const { UNAUTHORIZED } = StatusCodes;

declare global {
    namespace Express {
        export interface Response {
            sessionUser: IClientData;
        }
    }
}

export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('is authenticated')
        next()
    } else {
        console.log('error!!! is not authenticated')
        res.status(403).send("로그인 필요")
    }
}

export const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('is not authenticated')
        next();
    } else {
        console.log('error!!! is authenticated')
    }
}

const authURL = [
    member.path + member.login,
    member.path + member.auth_app_info,
    member.path + member.join,
]

export const memberCheckMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (authURL.indexOf(req.baseUrl + req.path) >= 0 ) {
            console.log('before login func')
            return next();
        } else {
            console.log(authURL.indexOf(req.baseUrl + req.path), req.baseUrl + req.path);
        }

        // Get json-web-token
        console.log('jwt??', req.signedCookies, req.cookies)
        // console.log('req??', req)
        const jwt = req.signedCookies[cookieProps.key] || req.cookies[cookieProps.key] || req.headers.authorization?.split('Bearer ')[1];
        if (!jwt) {
            console.log('member check jwt none!')
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        console.log('CLientData??', clientData)
        if (clientData.type === UserRoles.Member) {
            res.sessionUser = clientData;
            console.log('member check clear!')
            next();
        } else {
            console.log('member check not match type!')
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err:any) {
        console.log('member check err!')
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};