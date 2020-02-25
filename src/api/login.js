import service from '@/utils/request';

/**
 * 获取验证码
 */
export function getSms(data) {
    service.request({
        method: 'get',
        url: "/getSms/",
        data: data
    })
}


/**
 * 获取用户信息
 */

/**
 * 登录
 */

/**
 * 注册
 */