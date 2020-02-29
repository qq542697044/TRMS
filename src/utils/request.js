import axios from 'axios'
import { Message } from 'element-ui'

//创建axios，赋给变量service
//服务端请求地址,地址：
const BASEURL = "/api";

const service = axios.create({
    baseURL: BASEURL,
    timeout: 6000,
});
service.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
service.interceptors.request.use(function(config) {
    // Do something before request is sent
    config.headers['token'] = '';
    config.headers['userName'] = '';
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
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        Message.error("请求超时");
    }
    // Do something with response error
    return Promise.reject(error);
});


export default service;