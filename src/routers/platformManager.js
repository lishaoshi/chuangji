/**
 * New node file
 */
import PlatformIndex from "@/page/PlatformManager/platformIndex.vue";
import ProductManager from "@/page/PlatformManager/ProductManager.vue";
import ProductDetail from "@/page/PlatformManager/ProductDetail.vue";
import EditProduct from "@/page/PlatformManager/EditProduct.vue";
import RationManager from "@/page/PlatformManager/RationManager.vue";
import FactoryManager from "@/page/PlatformManager/FactoryManager.vue";
import PlatformFans from "@/page/PlatformManager/PlatformFans.vue";
import AddActivity from "@/page/PlatformManager/AddActivity.vue";
import orderManage from "@/page/PlatformManager/FactoryServiceOrderManage.vue";

export default [
    {
        path: "/platform-order",
        component: orderManage,
        meta: {
            title: "管理订单",
            requiresAuth: true
        }
    },
	{
		path: "/platform-index",
		component: PlatformIndex,
		meta: {
			title: "管理平台",
			requiresAuth: true
		}
	},
	{
		path: "/product-manager",
		component: ProductManager,
		meta: {
			title: "订单管理",
			requiresAuth: true
		}
	},
	{
		path: "/product-detail",
		component: ProductDetail,
		meta: {
			title: "详情",
			requiresAuth: true
		}
	},
	{
		path: "/product-edit",
		component: EditProduct,
		meta: {
			title: "编辑",
			requiresAuth: true
		}
	},
	{
		path: "/ration-manager",
		component: RationManager,
		meta: {
			title: "定量管理",
			requiresAuth: true
		}
	},
	{
		path: "/factory-manager",
		component: FactoryManager,
		meta: {
			title: "工厂管理",
			requiresAuth: true
		}
	},
	{
		path: "/platform-fans",
		component: PlatformFans,
		meta: {
			title: "平台粉丝",
			requiresAuth: true
		}
	},
	{
		path: "/add-activity",
		component: AddActivity,
		meta: {
			title: "添加优惠活动",
			requiresAuth: true
		}
	},
	]