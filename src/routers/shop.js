const FactoryShop = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/FactoryShop.vue');
const ShopDetail = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/ShopDetail.vue');
const ShopCart = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/CarList.vue');
const confirmOrder1 = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/confirmOrder.vue');
const confirmOrder = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/ShopOrder.vue');
const OrderSuccess = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/OrderSuccess.vue');
const ChoiceCoupon = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/ChoiceCoupon.vue');
const PaymentAllocation = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/PaymentAllocation.vue');
const CollectDetail = () => import(/* webpackChunkName: "factory-shop" */ '@/page/order/collect/CollectDetail.vue');
const CollectEdit = () => import(/* webpackChunkName: "factory-shop" */ '@/page/order/collect/CollectEdit.vue');
const Address = () => import('@/page/address/Address.vue')

const CheckoutSuccess = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/CheckoutSuccess.vue');
const PaymentMethod = () => import(/* webpackChunkName: "factory-shop" */ '@/page/shop/PaymentMethod.vue');
/**
 * 集采比价
 */
const CollectParity = () => import('@/page/CollectParity.vue') 

export default [
    {
        path: "/payment-method",
        component: PaymentMethod,
        meta: {
            title: "支付方式",
        }
    },
    {
        path: "/checkout-success",
        component: CheckoutSuccess,
        meta: {
            title: "下单成功",
        }
    },
    {
        path: "/payment-allocation",
        component: PaymentAllocation,
        meta: {
            title: "支付分配",
            requiresAuth: true
        }
    },
	{
		path: "/factory/shop/:id",
		component: FactoryShop,
		meta: {
			title: "工厂商品",
			requiresAuth: true
		}
	},
	{
		path: "/factory/shop/:shopId/:id",
		component: ShopDetail,
		meta: {
			title: "商品详情",
			requiresAuth: true
		}
	},
    {
        path: "/factory/shopdetail/:id",
        component: ShopDetail,
        meta: {
            title: "商品详情",
            requiresAuth: true
        }
    },
    {
        path:"/factory/cart",
        component:ShopCart,
        name: "ShopCart",
        meta: {
            title: "购物车",
            requiresAuth: true
        }
    },
	{
		path:"/factory/cart/:shopId",
		component:ShopCart,
        meta: {
            title: "购物车",
            requiresAuth: true
        }
	},
    {
        path:"/address/choose",
        component:Address,
        meta: {
            title: "选择地址",
            requiresAuth: true
        }
    },
	{
		path:"/shop/confirm-order",
		component:confirmOrder,
		meta:{
            title: "确认订单",
            requiresAuth: true
		},
	},
    {
        path:"/factory/confirmOrder/:shopId",
        component:confirmOrder,
        meta:{
            title: "确认订单",
            requiresAuth: true
        }
    },{
        path:"/order-success",
        name: "OrderSuccess",
		component:OrderSuccess,
        meta: {
            title: "订单成功",
            requiresAuth: true
        }
	},
	{
		path:"/choice-coupon",
		component:ChoiceCoupon,
        meta: {
            title: "优惠卷选择",
            requiresAuth: true
        }
	},
	{
		path:"/collect-detail",
		component:CollectDetail,
        meta: {
            title: "采集定制详情",
            requiresAuth: true
        }
	},
    {
        path:"/collect-edit",
        component:CollectEdit,
        meta: {
            title: "编辑采集定制",
            requiresAuth: true
        }
    },
    {
        path:"/collect-parity",
        component:CollectParity,
        meta: {
            title: "集采比价",
            requiresAuth: true
        }
    },
    
 
]
