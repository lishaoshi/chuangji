const MyInfo = () => import(/* webpackChunkName: "user" */ '@/page/setting/MyInfo.vue')
const SafeInfo = () => import(/* webpackChunkName: "user" */ '@/page/setting/safeSetting.vue')
const LoginPasswordChange = () => import(/* webpackChunkName: "user" */ '@/page/setting/LoginPasswordChange.vue')
const PayPassword = () => import(/* webpackChunkName: "user" */ '@/page/setting/PayPassword.vue')
const ForgetPayPassword = () => import(/* webpackChunkName: "user" */ '@/page/setting/ForgetPayPassword.vue')
const RemoberPayPassword = () => import(/* webpackChunkName: "user" */ '@/page/setting/RemoberPassword.vue')
const changePhone = () => import(/* webpackChunkName: "setting" */ '@/page/setting/changePhone.vue');
const ChangeLogo = () => import(/* webpackChunkName: "setting" */ '@/page/setting/ChangeLogo.vue');

export default [
    {
        path: "/change-phone",
        component: changePhone,
        meta: {
            title: "更换手机号",
            requiresAuth: true
        }
    },
    {
        path: "/change-logo",
        component: ChangeLogo,
        meta: {
            title: "更换头像",
            requiresAuth: true
        }
    },
    {
        path:"/user/info",
        component: MyInfo,
        meta:{
            title:"个人信息",
            keepAlive: true,
            requiresAuth: true,
        },

    },
    {
        path:"/user/safe-info",
        component: SafeInfo,
        meta:{
            title:"安全设置",
            keepAlive: true,
            requiresAuth: true,
        },
        
    },
    {
        path:"/user/login-password-change",
        component: LoginPasswordChange,
        meta:{
            title:"登陆密码设置",
            keepAlive: true,
            requiresAuth: true,
        },
        
    },
    {
        path:"/user/pay-password-change",
        component: PayPassword,
        meta:{
            title:"支付密码设置",
            keepAlive: true,
            requiresAuth: true,
        },
        
    },
    {
        path:"/user/forget-pay-password",
        component: ForgetPayPassword,
        meta:{
            title:"忘记支付密码",
            requiresAuth: true,
        },
        
    },
    {
        path:"/remober-pay-password",
        component: RemoberPayPassword,
        meta:{
            title:"记得支付密码",
            requiresAuth: true,
        },
        
    },

]