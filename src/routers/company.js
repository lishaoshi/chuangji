/**
 * New node file
 */

import GoLogin from "@/page/company/GoLogin.vue";
import CompanyLogin from "@/page/company/CompanyLogin.vue";
import CompanyForgot from "@/page/company/CompanyForgot.vue";

const CompanyShopList = () => import(/* webpackChunkName: "company" */ '@/page/company/companyShop/CompanyShopList.vue');
const CompanyShopDetail = () => import(/* webpackChunkName: "company" */ '@/page/company/companyShop/CompanyShopDetail.vue');
const CompanyPromotion = () => import(/* webpackChunkName: "company" */ '@/page/company/CompanyPromotion/CompanyPromotion.vue');
const CompanyPromotionDetail = () => import(/* webpackChunkName: "company" */ '@/page/company/CompanyPromotion/PromotionDetail.vue');
const CompanyShopFast = () => import(/* webpackChunkName: "company" */ '@/page/company/companyShop/CompanyShopFast.vue');
const CompanyList = () => import(/* webpackChunkName: "company" */ '@/page/company/CompanyClassify/CompanyList.vue');
const CompanyABList = () => import(/* webpackChunkName: "company" */ '@/page/company/CompanyClassify/CompanyABList.vue');
const ProductList = () => import(/* webpackChunkName: "company" */ '@/page/company/CompanyClassify/ProductList.vue');
const CompanyUser = () => import(/* webpackChunkName: "company" */ '@/page/company/CompanyMy.vue');
const CompanyMessage = () => import(/* webpackChunkName: "company" */ '@/page/message/MessageSystem.vue');
const CompanyMyInfo = () => import(/* webpackChunkName: "company" */ '@/page/setting/CompanyMyInfo.vue');
const CompanyMyOrder = () => import(/* webpackChunkName: "company" */ '@/page/company/CompanyOrder/CompanyOrder.vue');
/* 购物车  */
const BusinessShopCart = () => import(/* webpackChunkName: "business-shop" */ '@/page/company/companyShop/businessCarList.vue');
const BusinessShopCartBig = () => import(/* webpackChunkName: "business-shop" */ '@/page/company/companyShop/businessBigCarList.vue');
const confirmOrder = () => import(/* webpackChunkName: "business-shop" */ '@/page/company/companyShop/confirmOrder.vue');

// 公司详情
const CompanyDetail = () => import('@/page/company/companyDetail');

export default [
    {
        path:"/business/cart",
        component:BusinessShopCartBig,
        meta: {
            title: "购物车",
            requiresAuth: true
        }
    },
	{
		path: "/company-go-login",
		component: GoLogin,
		meta: {
			title: "去登陆",
			requiresAuth: true
		}
	},
	{
		path: "/company-login",
		component: CompanyLogin,
		meta: {
			title: "登陆页面",
			requiresAuth: true
		}
	},
	{
		path: "/company-forgot",
		component: CompanyForgot,
		meta: {
			title: "找回密码",
			requiresAuth: true
		}
	},
	{
		path: "/business-shop",
		component: CompanyShopList,
		meta: {
			title: "商城",
			requiresAuth: true
		}
	},
	{
		path: "/business/shop/:shopId/:id",
		component: CompanyShopDetail,
		meta: {
			title: "商城内页",
			requiresAuth: true
		}
	},
	{
		path: "/company-shop-fast",
		component: CompanyShopFast,
		meta: {
			title: "商城",
			requiresAuth: true
		}
	},
	{
		path: "/company-promotion",
		component: CompanyPromotion,
		meta: {
			title: "促销活动",
			requiresAuth: true
		}
	},
	{
		path: "/company-promotion-detail",
		component: CompanyPromotionDetail,
		meta: {
			title: "促销活动内页",
			requiresAuth: true
		}
	},
	{
		path: "/company-list",
		component: CompanyList,
		meta: {
			title: "厂商分类",
			requiresAuth: true
		}
	},
    {
        path: "/company-ab-list",
        component: CompanyABList,
        meta: {
            title: "AB分类",
            requiresAuth: true
        }
    },
	{
		path: "/company-product-list",
		component: ProductList,
		meta: {
			title: "产品分类",
			requiresAuth: true
		}
	},
	{
		path: "/company-user",
		component: CompanyUser,
		meta: {
			title: "个人中心",
			requiresAuth: true
		}
	},
	{
		path: "/company-message",
		component: CompanyMessage,
		meta: {
			title: "个人消息",
			requiresAuth: true
		}
	},
	{
		path: "/company-my-order",
		component: CompanyMyOrder,
		meta: {
			title: "订单",
			requiresAuth: true
		}
	},
	/* 购物车    */
	{
		path:"/business/cart/:shopId",
		component:BusinessShopCart,
        meta: {
            title: "购物车",
            requiresAuth: true
        }
	},
	{
        path:"/business/confirmOrder/:shopId",
        component:confirmOrder,
        meta:{
            title: "确认订单",
            requiresAuth: true
        }
	},
	{
		path:"/company/companyDetail/:shopId",
        component:CompanyDetail,
        meta:{
            title: "公司详情",
            requiresAuth: true
        }
	}
	]

