import { Login } from "@/api/login"
import { setToken, setuserLoc, setuserName, getuserName, getuserLoc } from "../../utils/cookie"


const state = {
    toKen: '',
    userName: getuserName() || '',
    userLoc: getuserLoc() || '',
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
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            //接口      
            Login(requestData).then((response) => {
                console.log(response);

                let data = response.data.data;
                content.commit('SET_USERNAME', requestData.userName);
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERLOC', data.userLoc);
                setToken(data.token);
                setuserLoc(data.userLoc);
                setuserName(requestData.userName);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })

    }
}

export default {
    namespaced: true,
    actions,
    state,
    mutations
};