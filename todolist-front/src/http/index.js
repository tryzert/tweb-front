import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'http://192.168.1.102:9010/todolist/api'
    baseURL: '/todolist/api'
})
// const token = "tangzheng.1633071656.87cf58d97c2f949e2cafc3001812fcec";
const getToken = () => {
    return localStorage.getItem("twebToken");
}
// // http request 拦截器
// instance.interceptors.request.use(
//     config => {
//         const token = sessionStorage.getItem('token')
//         if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.authorization = token  //请求头加上token
//         }
//         return config
//     },
//     err => {
//         return Promise.reject(err)
//     })

// http response 拦截器
axiosInstance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        return response.data
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        // return Promise.reject(error.response.status) // 返回接口返回的错误信息
        return Promise.reject(error)
    })

const http = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            axiosInstance.get(url).
                then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
        })
    },
    authGet: (url) => {
        //todo
        return new Promise((resolve, reject) => {
            axiosInstance.get(url, {
                headers: { "Authorization": getToken() }
            }).
                then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
        })
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(url, data).
                then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
        })
    },
    authPost: (url, data) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(url, data, {
                headers: { "Authorization": getToken() }
            }).
                then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
        })
    }
}
export default http