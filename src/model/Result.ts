export default class Result {
    private code!: String;
    private message!: String;

    private result!: any;

    constructor(code?:String, message?:String, result?: any) {
        if (code) this.code = code;
        if (message) this.message = message;
        if (result) this.result = result
    }

    public getCode(): String {
        return this.code;
    }

    public setCode(code: String): void {
        this.code = code;
    }

    public getMessage(): String {
        return this.message;
    }

    public setMessage(message: String): void {
        this.message = message;
    }

    public getResult(): any {
        return this.result;
    }

    public setResult(result: any): void {
        this.result = result;
    }

}

export function setResponseData(json:any, code:string, message:string, msg?:string) {
    json.code = code;
    json.message = message;
    if (msg) {
        json.msg = msg;
    }
    return json;
}