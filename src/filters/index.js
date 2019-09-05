import moment from 'moment'
// 根据用户姓名生成图标
export function usernameIcon(val) {
    if (val && val.length > 2) {
        return val.slice(-2)
    }
    return val
}

export function dateFormat(val) {
    if (val) {
        return moment(val).format('YYYY-MM-DD')
    }
    return val
}


export function formatQuotaScore(quotaScore, quotaType ) {
    return `${quotaType===0 && quotaScore!== 0? '+' : quotaType===1 && quotaScore !==0 ? '-' : ''}${quotaScore}`
}