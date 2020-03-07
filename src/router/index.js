import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    //登陆注册页
    {
        path: "/",
        redirect: "login",
        meta: {
            name: "主页"
        }
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            name: "登录注册"
        },
        component: () =>
            import ("../views/Login/index.vue")
    },





    //管理员模块路由
    {
        path: "/console",
        name: "Console",
        redirect: "/index",
        meta: {
            name: "控制台"
        },
        component: () =>
            import ("../views/Layout/index.vue"),
        children: [{
                path: "/index",
                name: "Index",
                meta: {
                    icon: "home",
                    name: "后台首页"
                },
                component: () =>
                    import ("../views/Console/index.vue")
            },
            {
                path: "/info",
                name: "Info",
                meta: {
                    icon: "info",
                    name: "个人信息"
                },
                component: () =>
                    import ("../views/Console/module/info.vue")
            },
            {
                path: "/resc",
                name: "Resc",
                meta: {
                    icon: "res",
                    name: "资源管理"
                },
                component: () =>
                    import ("../views/Console/module/resc.vue")
            },
            {
                path: "/userc",
                name: "Userc",
                meta: {
                    icon: "custom",
                    name: "用户管理"
                },
                component: () =>
                    import ("../views/Console/module/userc.vue")
            },
        ]
    },







    //用户模块路由
    {
        path: "/user",
        name: "User",
        redirect: "/userindex",
        meta: {
            name: "用户模块"
        },
        component: () =>
            import ("../views/Layout/index.vue"),
        children: [{
            path: "/userindex",
            name: "userIndex",
            meta: {
                name: "用户首页"
            },
            component: () =>
                import ("../views/User/index.vue")
        }]
    }
];

const router = new VueRouter({
    routes
});

export default router;