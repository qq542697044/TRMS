import { Login } from "@/api/login";
import {
    setToken,
    setuserLoc,
    setuserName,
    getuserName,
    getuserLoc
} from "../../utils/cookie";
import {set } from "cookie_js";

//登录模块
const state = {
    toKen: "",
    userName: getuserName() || "",
    userLoc: getuserLoc() || "",
    module: localStorage.getItem("module") || "user"
};

const mutations = {
    SET_TOKEN(state, value) {
        state.toKen = value;
    },
    SET_USERNAME(state, value) {
        state.userName = value;
    },
    SET_USERLOC(state, value) {
        state.userLoc = value;
    },
    SET_MODULE(state, value) {
        state.module = value;
    }
};

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            //接口
            Login(requestData)
                .then(response => {
                    let data = response.data.data;
                    content.commit("SET_USERNAME", requestData.userName);
                    content.commit("SET_TOKEN", data.token);
                    content.commit("SET_USERLOC", data.userLoc);
                    setToken(data.token);
                    setuserLoc(data.userLoc);
                    setuserName(requestData.userName);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    setModule(content, value) {
        return content.commit("SET_MODULE", value);
    }
};

export default {
    namespaced: true,
    actions,
    state,
    mutations
};