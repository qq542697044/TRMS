import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import login from "./moudels/login";
import console from "./moudels/console";
import resc from "./moudels/resc";
export default new Vuex.Store({
    modules: {
        login,
        console,
        resc
    }
});