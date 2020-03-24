import { setCollapse, getCollapse } from "../../utils/cookie";

//后台模块
const state = {
  isCollapse: JSON.parse(getCollapse()) && true
};
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
  }
};

const actions = {
  isCollapse(content) {
    content.commit("SET_COLLAPSE");
    setCollapse(content.state.isCollapse);
  }
};

export default {
  namespaced: true,
  actions,
  state,
  mutations
};
