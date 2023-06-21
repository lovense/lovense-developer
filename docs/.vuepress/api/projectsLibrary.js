import request from '../utils/axiosReq'

/**
 * 项目列表(论坛调用)
 * @returns {*}
 */
export function queryProjectList(data) {
    return request({
        url: '/hyttoAdminPlusApi/website/queryProjectList',
        data,
        bfLoading: true,
        method: 'post',
        isAlertErrorMsg: false,
        baseURL:'https://test1.lovense.com'
    })
}
