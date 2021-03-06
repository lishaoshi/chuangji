const ActivityBlock = () => import(/* webpackChunkName: "factoryExtension" */ '@/page/FactoryExtension/ActivityBlock.vue');
const ActivitySpread = () => import(/* webpackChunkName: "factoryExtension" */ '@/page/FactoryExtension/ActivitySpread.vue');
const changeHistory = () => import('@/page/CollectParity/changePriceHistory')
const buyRecoed = () => import('@/page/CollectParity/buyRecoed')
const Customization = () => import("@/page/Factory/customization");
const promoteFactory = () => import("@/page/My/promoteFactory");

export default [
	{
		path: "/activity-block",
		component: ActivityBlock,
		meta: {
			title: "活动板块",
			requiresAuth: true
		}
	},
	{
		path: "/activity-spread",
		component: ActivitySpread,
		meta: {
			title: "活动推广",
			requiresAuth: true
		}
	},
	{
		path: "/change-history/:id",
		component: changeHistory,
		meta: {
			title: "变价历史",
			requiresAuth: true
		}
	},
	{
		path: "/buy-recoed/:id",
		component: buyRecoed,
		meta: {
			title: "集采记录",
			requiresAuth: true
		}
	},
	{
		path: "/customization/:id",
		component: Customization,
		meta: {
			title: "定制生产",
			requiresAuth: true
		}
	},
	{
		path: "/promoteFactory",
		component: promoteFactory,
		meta: {
			title: "推广厂家",
			requiresAuth: true
		}
	}
]
