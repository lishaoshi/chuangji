import Home from "@/page/Home";
import My from "@/page/My";
import SiteUpgrade from "@/page/SiteUpgrade";
import Collect from "@/page/Collect";
import GlobalWarehouse from "@/page/GlobalWarehouse";
import Spread from "@/page/Spread";
import ItemCategories from "@/page/ItemCategories";
import GrabOrder from "@/page/GrabOrder";

import HomeExtension from "@/page/Home/ExtensionHome";
import Profit from "@/page/Profit";
import MyExtension from "@/page/My/ExtensionMy";

import WechatSignin from '@/page/wechat/WechatSignin'
import WechatSignup from '@/page/wechat/WechatSignup.vue'
import WechatBindUser from '@/page/wechat/WechatBindUser.vue';
import ShowDetail from "@/page/RoleExtension/showDetail";

// 广告banner详情页
const BannerDetail = () => import('@/page/BannerDetail/bannerDetail')

//总授权 我的
import MyRoot from "@/page/My/RootMy";

export default [
    {
        name: "home",
        path:"/home",
        component: Home,
        meta:{
            title:"首页",
            keepAlive: false,
            requiresAuth: true,
        },
    },
    {
        path: "/extension-home",
        component: HomeExtension,
        meta:{
            title:"推广首页",
        }
    },
    {
        path: "/root-my",
        component: MyRoot,
        meta:{
            title:"总授权我的",
        }
    },
    {
        path: "/extension-my",
        component: MyExtension,
        meta:{
            title:"推广个人中心",
        }
    },
    {
        path: "/global-warehouse",
        component: GlobalWarehouse,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: "/collect",
        component: Collect,
        meta:{
            title:'集采订制',
            requiresAuth: true
        }
    },
    {
        path: "/spread",
        component: Spread,
        meta:{
            title:'推广',
            requiresAuth: true
        }
    },
    {
        path: "/profit",
        component: Profit,
        meta:{
            title:'收益',
            requiresAuth: true
        }
    },
    {
        path: "/item-categories",
        component: ItemCategories,
        meta:{
            title:'商品分类',
            requiresAuth: true
        }
    },
    {
        path: "/bannerDetail",
        name: "BannerDetail",
        component: BannerDetail, 
        meta: {
            title: '广告详情',
            requiresAuth: true
        }
    },
    {
        path: "/grab-order",
        component: GrabOrder,
        meta:{
            title:'抢单',
            requiresAuth: true
        }
    },
    {
        path: "/my",
        component: My,
        meta:{
            title:'我的',
            requiresAuth: true
        }
    },

    {
        path: "/develop",
        component: SiteUpgrade,
        meta: {
            title: "功能开发中"
        }
    },
    {
        path:'/wechat',
        component:WechatSignin,
        meta:{
            title: "微信登录",
            forGuest: true,
        },
        beforeEnter (to, from, next) {
            navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1
                ? to.query.code
                ? next()
                : next('/signin')
                : next('/signin')
        },

    },
    {
        path: '/wechat/signup',
        component: WechatSignup,
        meta: {
            title: '完善资料',
            forGuest: true,
        },
        beforeEnter (to, from, next) {
            const accessToken = window.$lstore.getData('H5_WECHAT_MP_ASTOKEN')
            const nickname = window.$lstore.getData('H5_WECHAT_NICKNAME')
            accessToken && nickname ? next() : next('/wechat')
        },
    },
    {
        path: '/wechat/bind',
        component: WechatBindUser,
        meta: {
            title: "绑定已有用户",
            forGuest: true,
        },
        beforeEnter (to, from, next) {
            const accessToken = window.$lstore.getData('H5_WECHAT_MP_ASTOKEN')
            accessToken ? next() : next('/wechat')
        },
    },
    {
        name: "showInvitation",
        path:"/showInvitation",
        component: ShowDetail,
        meta:{
            title:"对接人",
            keepAlive: false,
            requiresAuth: true,
        },
    },
]