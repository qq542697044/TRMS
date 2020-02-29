import router from "./index";
import { getToken } from "../utils/cookie"
import login from "../store/moudels/login";

const whiteRouter = ['/login'];

//路由守卫
router.beforeEach((to, from, next) => {
    if (getToken() == login.state.toKen) {
        next();
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }
    }
})