module.exports = {
    publicPath: process.env.BASE_URL || '/',
    lintOnSave: true,


    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/style/theme.scss";`
            }
        }
    },
    configureWebpack: {
        output: {
            chunkFilename: 'js/[name]-[chunkhash].js',
        },
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {limit: 10240}))
    },

    devServer: {
        open: false,
        disableHostCheck: true,
        
        proxy: {
            '/api': {
                target: 'http://localhost:8000/api',
                changeOrigin: true,
            },
            '/storage': {
                target: process.env.VUE_APP_API_HOST,
                changeOrigin: true,
            },
        },
    },
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },
}