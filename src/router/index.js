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
        redirect: "/console/index",
        meta: {
            name: "控制台"
        },
        component: () =>
            import ("../views/Layout/index.vue"),
        children: [{
                path: "/console/index",
                name: "Index",
                meta: {
                    icon: "home",
                    name: "后台首页"
                },
                component: () =>
                    import ("../views/Console/index.vue")
            },
            {
                path: "/console/info",
                name: "Info",
                meta: {
                    icon: "info",
                    name: "个人信息"
                },
                component: () =>
                    import ("../views/Console/module/info.vue")
            },
            {
                path: "/console/resc",
                name: "Resc",
                meta: {
                    icon: "res",
                    name: "资源管理"
                },
                component: () =>
                    import ("../views/Console/module/resc.vue")
            },
            {
                path: "/console/userc",
                name: "Userc",
                meta: {
                    icon: "custom",
                    name: "用户管理"
                },
                component: () =>
                    import ("../views/Console/module/userc.vue")
            }
        ]
    },

    //用户模块路由
    {
        path: "/user",
        name: "User",
        redirect: "/user/index",
        meta: {
            name: "用户模块"
        },
        component: () =>
            import ("../views/userLayout/index.vue"),
        children: [{
                path: "/user/index",
                name: "userIndex",
                meta: {
                    icon: "home",
                    name: "首页"
                },
                component: () =>
                    import ("../views/User/index.vue")
            },
            {
                path: "/user/resc",
                name: "Resc",
                meta: {
                    icon: "res2",
                    name: "资源管理"
                },
                component: () =>
                    import ("../views/User/module/resc.vue"),
            },
            {
                path: "/user/info",
                name: "Info",
                meta: {
                    icon: "info",
                    name: "个人中心"
                },
                component: () =>
                    import ("../views/Console/module/info.vue")
            },
        ]
    },

    //test模块，未启用
    // {
    //     path: "/test",
    //     name: "Test",
    //     redirect: "/test/resc",
    //     meta: {
    //         name: "测试模块"
    //     },
    //     component: () =>
    //         import ("../views/userLayout/index.vue"),
    //     children: [{
    //             path: "/test/index",
    //             name: "testIndex",
    //             meta: {
    //                 icon: "home",
    //                 name: "首页"
    //             },
    //             component: () =>
    //                 import ("../views/User/index.vue")
    //         },
    //         {
    //             path: "/test/resc",
    //             name: "Resc",
    //             meta: {
    //                 icon: "res2",
    //                 name: "资源管理"
    //             },
    //             component: () =>
    //                 import ("../views/User/module/resc.vue"),
    //         }, {
    //             path: "/test/info",
    //             name: "Info",
    //             meta: {
    //                 icon: "info",
    //                 name: "个人中心"
    //             },
    //             component: () =>
    //                 import ("../views/Console/module/info.vue")
    //         },
    //     ]
    // }
];

const router = new VueRouter({
    routes
});

export default router;