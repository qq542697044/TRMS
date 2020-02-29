const path = require("path");
module.exports = {
    // 基本路径
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    // 输出文件目录
    outputDir: "dist",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //   compiler: false,
    runtimeCompiler: true, //关键点在这
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: config => {
        Object.assign(config, {
            // 开发生产共同配置

            // externals: {
            //   'vue': 'Vue',
            //   'element-ui': 'ELEMENT',
            //   'vue-router': 'VueRouter',
            //   'vuex': 'Vuex'
            // } // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
            resolve: {
                extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                    "@c": path.resolve(__dirname, "./src/components"),
                    "@v": path.resolve(__dirname, "./src/views"),
                    "@u": path.resolve(__dirname, "./src/utils"),
                    "@s": path.resolve(__dirname, "./src/service")
                }, // 别名配置
                plugins: []
            }
        });
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true, //注释css热更新生效
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/main.scss";`
            },
            // postcss: {
            //     // options here will be passed to postcss-loader
            //     plugins: [require('postcss-px2rem')({
            //         remUnit: 75
            //     })]
            // }
        },
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require("os").cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        /* 自动打开浏览器 */
        open: false,
        // host: "192.168.0.105",
        host: "192.168.0.105",
        port: 8080,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            "/api": {
                /* 目标代理服务器地址 */
                // target: "http://192.168.0.105:8090/",数据接口IP,
                target: "http://54.169.193.25:8888/", //
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        },
        before: () => {}
    },
    // 第三方插件配置
    pluginOptions: {}
};