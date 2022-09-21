// Global

import { STATUS_CODES } from "http";

// path
const VERSION = '/v0';

export const CLIENT = 'http://3.39.177.242:3000'
export const CLIENT_DEV = 'http://localhost:3000'

const MAIN = '/main'
const MEMBER = '/member'

// method
const UPD = '/upd'
const DELETE = '/delete'
const AUTH = '/auth'
const JOIN = '/join'
const LOGIN = '/login'
const LOGOUT = '/logout'


// object
const APP = '/app'
const PWD = '/pwd'
const TOKEN = '/token'
const INFO = '/info'

const DISPLAYIMAGE = '/displayImage'
const DISPLAYFILE = '/displayFile'


const basic = {
    version : VERSION,
}


export const routes = {
    home : VERSION,
}

export const path_value = {
    pathURL : (path:string, target:string)=> {
        return path + target;
    } ,
    pathView : (target:string)=> {
        return target.substring(1)
    }
}

export const member = {
    path : VERSION + MEMBER,
    member : MEMBER,
    basic : basic,
    main : MAIN,
    join : JOIN,
    auth_app_info : AUTH + APP + INFO,
    login : LOGIN,
    logout : LOGOUT,
    delete :  DELETE,

    pwd_upd : PWD + UPD,
    token_upd : TOKEN + UPD,
}

export const util = {
    home : VERSION,
    displayImage : DISPLAYIMAGE,
    displayFile: DISPLAYFILE,
}

export const code = {
    SUCCESS_CODE: "9200",
	SUCCESS_MESSAGE: "success",
	FAIL_CODE : "9400",
	FAIL_MESSAGE : "fail",
	EXCEPTION_CODE : "9500",
	EXCEPTION_MESSAGE : "exception",
}

export const Values = {

	S3_URL : "https://s3.ap-northeast-2.amazonaws.com/",
	BUCKET_NAME : "pstartup-bucket",
	
	SUCCESS_CODE :"9200" ,
	SUCCESS_MESSAGE : "success",
	FAIL_CODE :"9400" ,
	FAIL_MESSAGE : "fail",
	EXCEPTION_CODE : "9500",
    EXCEPTION_MESSAGE : "exception",
	
	FIREBASE_SERVER_KEY : "AAAAaP_kEcw:APA91bFlTWA76-kbKp5wNzQiMlEClavQqSnc54YWz9Q1pkOGgQuSaLDxuS6LO6kIN_A6ovfd3kVt9mmkwWuuRFyh4hd9WMTSrrBJbm9j0cHyuZTYvCISiC47oJrtNU89PX8MiElUNaE_K8zZNpF8BR7K3E3IbmpR4A",
	FIREBASE_API_URL : "https://fcm.googleapis.com/fcm/send",

	AUTH_ACTION : "AUTH",
	PUSH_TITLE : "해커톤",

	MEMBER_DUPLICATION_LOGIN_MESSAGE : "다른기기에서 로그인되었습니다.",
}
