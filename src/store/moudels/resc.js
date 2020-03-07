import { Add_resource, Get_sort_info, Delete_resource, Check_resource, Update_resource } from "@/api/resc";

const state = {}
const mutations = {}
const actions = {
    //新增资源
    add_resource(content, requestData) {
        return new Promise((resolve, reject) => {
            Add_resource(requestData)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    },

    //查询资源
    check_resource(content, requestData) {
        return new Promise((resolve, reject) => {
            Check_resource(requestData)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    },

    //修改资源信息

    update_resource(content, requestData) {
        return new Promise((resolve, reject) => {
            Update_resource(requestData)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    },
    //删除资源
    delete_resource(content, requestData) {
        return new Promise((resolve, reject) => {
            Delete_resource(requestData).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },


    //查询资源分类信息(类别，地址，供应商)
    get_sort_info(content) {
        return new Promise((resolve, reject) => {
            Get_sort_info().then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }
}

export default {
    namespaced: true,
    actions
};