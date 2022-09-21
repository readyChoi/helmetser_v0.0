import Result from "./Result";

export default class ResponseVO {
    private result!: Result;
    private data:Map<String, Object> = new Map<String, object>();

    public getData():Map<String, Object> {
        return this.data;
    }

    public setData(key:String, value:Object): void {
        this.data.set(key, value);
    }

    public getResult():Result {
        return this.result;
    }

    public setResult(result:Result):void {
        this.result = result;
    }

}