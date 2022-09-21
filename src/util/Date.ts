
export const getDate = () => {
    let date = new Date()
    let year = date.getFullYear()

    let month = date.getMonth() + 1
    let month_str = month >= 10 ? month : '0' + month

    let day = date.getDate()
    let day_str = day >= 10 ? day : '0' + day

    let hour = date.getHours()
    let hour_str = hour >= 10 ? hour : '0' + hour

    let min = date.getMinutes()

    let sec = date.getSeconds()
    let sec_str = sec >= 10 ? sec : '0' + sec

    return year + '-' + month_str + '-' + day_str + ' ' 
            + hour_str + ':' + min + ':' + sec_str

}
