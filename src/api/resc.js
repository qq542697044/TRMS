import service from '@/utils/request';

//增加资源请求
export function Add_resource(data) {
    return service.request({
        method: "post",
        url: "manage/add_resource",
        data: data,
    })
};

//查询资源请求
export function Check_resource(data) {
    return service.request({
        method: "post",
        url: ' ',
        data: data,
    })
}
//修改资源信息请求
export function Update_resource(data) {
    return service.request({
        method: "post",
        url: ' ',
        data: data,
    })
}
//删除资源请求
export function Delete_resource(data) {
    return service.request({
        method: "post",
        url: ' ',
        data: data,
    })
}

//查询资源分类信息
export function Get_sort_info() {
    return service.request({
        method: 'post',
        url: " ",
    })
}