const ActivityBlock = () => import(/* webpackChunkName: "factoryExtension" */ '@/page/FactoryExtension/ActivityBlock.vue');
const ActivitySpread = () => import(/* webpackChunkName: "factoryExtension" */ '@/page/FactoryExtension/ActivitySpread.vue');

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
	]
