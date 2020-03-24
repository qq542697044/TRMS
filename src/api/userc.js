import service from "@/utils/request";

//查询用户信息
export function Query_user(data) {
  return service.request({
    method: "post",
    url: "/manage/search_users",
    data: data
  });
}

//更新用户信息
export function Update_user(data) {
  return service.request({
    method: "post",
    url: "/manage/update_user",
    data: data
  });
}

//删除用户
export function Delete_user(data) {
  return service.request({
    method: "post",
    url: "/manage/delete_user",
    data: data
  });
}

//设置-取消用户为管理员
export function Set_user(data) {
  return service.request({
    method: "post",
    url: "/manage/operate_admin",
    data: data
  });
}
