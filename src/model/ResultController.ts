import ResponseVO from "./ResponseVO";
import Result from "./Result";

export default class ResultController {
    private resultCode!: String;
    private resultMessage!: String;

    public getResultCode(): String {
        return this.resultCode;
    }

    public getResultMessage(): String {
        return this.resultMessage;
    }

    public getResultData( code: String, msg: String) {
        this.resultCode = code;
        this.resultMessage = msg;

        let result:Result = new Result();
        result.setCode(code);
        result.setMessage(msg);
        return result;
    }

    public setResponseData(response:ResponseVO, result:Result, key?:String, value?:Object):void {
        response.setResult(result);
        if(key != null && value != null) {
            response.setData(key, value);
        }
    }

}