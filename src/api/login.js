import service from '@/utils/request';

/**
 * 获取用户信息
 */

/**
 * 登录 注册
 */
export function Login(data) {
    return service.request({
        method: 'post',
        url: "/login",
        data: data
    })
}