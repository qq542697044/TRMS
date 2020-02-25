import axios from 'axios'
import { Message } from 'element-ui'

//创建axios，赋给变量service
//服务端请求地址,地址：
const BASEURL = "/api";

const service = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
});

// Add a request interceptor
service.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function(response) {
    // Do something with response data
    let data = response.data
    if (data.rescode == '0') {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        Message({
            message: data.message,
            type: 'success'
        });
        return Promise.resolve(response);
    }
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});


export default service;