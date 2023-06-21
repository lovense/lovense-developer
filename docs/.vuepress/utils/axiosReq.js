import axios from 'axios'
// import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
// import { getToken, setToken } from '../utils/storage'
// import bus from "@/utils/bus";
let reqConfig
let loadingE

const service = axios.create()

// const currEnv = process.env.VITE_APP_ENV
// let tagetLink = currEnv === 'prod' ? 'https://portal.hytto.com/#/' : 'https://test1.lovense.com/portal-cms/#/'

// 请求拦截
service.interceptors.request.use(
  (request) => {
      // if(!request.closeLoading){
    //   bus.emit('showLoading')
    // }
    // token setting
    /* download file*/
    if (request.isDownLoadFile) {
      request.responseType = 'blob'
    }
    /* upload file*/
    if (request.isUploadFile) {
      request.headers['Content-Type'] = 'multipart/form-data'
    }
    reqConfig = request
    // if (request.bfLoading) {
    //   loadingE = ElLoading.service({
    //     lock: true,
    //     text: '数据载入中',
    //     // spinner: 'el-icon-ElLoading',
    //     background: 'rgba(0, 0, 0, 0.1)'
    //   })
    // }
    /*
     *params会拼接到url上
     * */
    if (request.isParams) {
      request.params = request.data
      request.data = {}
    }
    return request
  },
  (err) => {
    bus.emit('closeLoading')
    Promise.reject(err)
  }
)
// 响应拦截
service.interceptors.response.use(
  (res) => {
    if (reqConfig.afHLoading && loadingE) {
      loadingE.close()
    }
    // 如果是下载文件直接返回
    if (reqConfig.isDownLoadFile) {
      return res
    }
    const { flag, message, isNeedUpdateToken, updateToken, code } = res.data
    //更新token保持登录状态
    // if (isNeedUpdateToken) {
    //   setToken(updateToken)
    // }
    const successCode = '0,200,20000'
    if (successCode.includes(code)) {
      // setTimeout(()=>{
      //   bus.emit('closeLoading')
      // },2000)
      // if(reqConfig.savaAlertMsg){
      //   ElMessage({
      //     message: message||'保存成功',
      //     type: 'success',
      //     duration: 2 * 1000
      //   })
      // }
      return res.data
    } else {
      if (reqConfig.isAlertErrorMsg || !successCode.includes(code)) {
        // setTimeout(()=>{
        //   bus.emit('closeLoading')
        // },2000)
        // ElMessage({
        //   message: message,
        //   type: 'error',
        //   duration: 2 * 1000
        // })
      }
      //返回错误信息
      //如果未catch 走unhandledrejection进行收集
      //注：如果没有return 则，会放回到请求方法中.then ,返回的res为 undefined
      return Promise.reject(res.data)
    }
  },
  (err) => {
    // 当非本地环境接口状态码为403时，跳转到门户登录页
    // if (err?.response?.status === 403 && window.location.href.indexOf('localhost') === -1) {
    //   if (currEnv !== 'prod') {
    //     // 先把remember me的账号信息取出来，等清除后再单独存回去
    //     const formInlineObj = localStorage.getItem('formInline')
    //     localStorage.clear()
    //     if (formInlineObj) {
    //       localStorage.setItem('formInline', formInlineObj)
    //     }
    //   }
    //   // window.location.href = tagetLink
    // }
    /*http错误处理，处理跨域，404，401，500*/
    if (loadingE) loadingE.close()
    // ElMessage({
    //   message: err,
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    //如果是跨域
    //Network Error,cross origin
    const errObj = {
      msg: err.toString(),
      reqUrl: reqConfig.baseURL + reqConfig.url,
      params: reqConfig.isParams ? reqConfig.params : reqConfig.data
    }
    return Promise.reject(JSON.stringify(errObj))
  }
)

export function axiosReq({
  url,
  data,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg = true,
  savaAlertMsg,
  // 页面loading，只有列表页才需要，所以默认关闭
  closeLoading= true
}) {
  return service({
    url: url,
    method: method ?? 'get',
    data: data ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? false,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg,
    savaAlertMsg:savaAlertMsg??false,
    closeLoading,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL,
    timeout: timeout ?? 30000,
    withCredentials:false,
  })
}

export default axiosReq
