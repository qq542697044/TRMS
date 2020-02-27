import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "login"
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ("../views/Login/index.vue")
    },
    {
        path: "/console",
        name: "Console",
        redirect: "/index",
        component: () =>
            import ("../views/Layout/index.vue"),
        children: [{
            path: "/index",
            name: "Index",
            component: () =>
                import ("../views/Console/index.vue")
        }]
    },
    {
        path: "/user",
        name: "user",
        redirect: "/userindex",
        component: () =>
            import ("../views/Layout/index.vue"),
        children: [{
            path: "/userindex",
            name: "userIndex",
            component: () =>
                import ("../views/Console/index.vue")
        }]
    }
];

const router = new VueRouter({
    routes
});

export default router;