
export function getMember() {
    const memberString:any = localStorage.getItem('member')
    const member:any = memberString ? JSON.parse(memberString) : null;

    return member;
}

export function makeURL(url_str:string, params_obj?:any){

    const url = new URL(url_str);
    if (params_obj != null) {
        const params = params_obj
        url.search = new URLSearchParams(params).toString();
    }
    

    return url;
}