//设置
const Settings = () => import(/* webpackChunkName: "setting" */ '@/page/Settings.vue');
const CompanyInfo = () => import(/* webpackChunkName: "setting" */ '@/page/setting/CompanyMyInfo.vue');
const Question = () => import(/* webpackChunkName: "setting" */ '@/page/setting/Question.vue');
const ReceivablesWay = () => import(/* webpackChunkName: "setting" */ '@/page/setting/ReceivablesWay.vue');
const ForgetPayPassword = () => import(/* webpackChunkName: "setting" */ '@/page/setting/ForgetPayPassword.vue');



const CompanyGoInfo = () => import(/* webpackChunkName: "setting" */ '@/page/aptitude/Aptitudes.vue');
const CompanyDetail = () => import(/* webpackChunkName: "setting" */ '@/page/aptitude/AptitudesDetail.vue');
const Company = () => import(/* webpackChunkName: "setting" */ '@/page/Company.vue');
const TicketList = () => import(/* webpackChunkName: "setting" */ '@/page/lianpiao/TicketList.vue');
const Expenditure = () => import(/* webpackChunkName: "setting" */ '@/page/lianpiao/expenditure.vue');
const inCome = () => import(/* webpackChunkName: "setting" */ '@/page/lianpiao/inCome.vue');
const lianpaioDetail = () => import(/* webpackChunkName: "setting" */ '@/page/lianpiao/lianpiaoDetail.vue');
const lianShu = () => import(/* webpackChunkName: "setting" */ '@/page/lianpiao/lianshu.vue');
const MyCollect = () => import(/* webpackChunkName: "setting" */ '@/page/order/collect/Collect.vue');
const MyFollow = () => import(/* webpackChunkName: "setting" */ '@/page/follow/MyFollow.vue');
const RoleExtension = () => import(/* webpackChunkName: "setting" */ '@/page/RoleExtension/RoleExtension.vue');

//地址
const AddressList = () => import(/* webpackChunkName: "address" */ '@/page/address/Address.vue');
const AddressAdd = () => import(/* webpackChunkName: "address" */ '@/page/address/Add.vue');
const AddressChange = () => import(/* webpackChunkName: "address" */ '@/page/address/ChangeAddress.vue');
const DrugDetail = () => import(/* webpackChunkName: "my" */ '@/page/DrugDetail.vue');
const FactoryLoan = () => import(/* webpackChunkName: "order" */ '@/page/FactoryLoan.vue');
const ProductSpread = () => import(/* webpackChunkName: "product" */ '@/page/ProductSpread/ProductSpread.vue');
const ProductSpreadDetail = () => import(/* webpackChunkName: "product" */ '@/page/ProductSpread/ProductSpreadDetail.vue');
const DownLoadRecord = () => import(/* webpackChunkName: "order" */ '@/page/DownLoadRecord.vue');



/* 订单 */
const MyBusinessOrder = () => import(/* webpackChunkName: "setting" */ '@/page/order/BusinessOrder.vue');
const OrderDetail = () => import(/* webpackChunkName: "setting" */ '@/page/order/OrderDetail.vue');
const BusinessServiceOrder = () => import(/* webpackChunkName: "order" */ '@/page/order/BusinessServiceOrder.vue');
const BussinessOrderDetail = () => import(/* webpackChunkName: "order" */ '@/page/order/OrderDetail.vue');
const FactoryServiceOrder = () => import(/* webpackChunkName: "order" */ '@/page/order/FactoryServiceOrder.vue');
const FactoryAllOrder = () => import(/* webpackChunkName: "order" */ '@/page/order/FactoryAllServiceOrder.vue');
const FactoryOrder = () => import(/* webpackChunkName: "order" */ '@/page/order/FactoryOrder.vue');
const FactoryPortOrder = () => import(/* webpackChunkName: "order" */ '@/page/order/FactoryPortOrder.vue');
const BusinessPortOrder = () => import(/* webpackChunkName: "order" */ '@/page/order/BusinessPortOrder.vue');
const PurchasingPortOrder = () => import(/* webpackChunkName: "order" */ '@/page/order/PurchasingPortOrder.vue');



/* 公众号单页面  */
const GZHLianBei = () => import(/* webpackChunkName: "lianbei" */ '@/page/lianbei/gzh-lianbei/otc.vue');
const GZHTrans = () => import(/* webpackChunkName: "lianbei" */ '@/page/lianbei/gzh-lianbei/trans.vue');
const GZHBuy = () => import(/* webpackChunkName: "lianbei" */ '@/page/lianbei/gzh-lianbei/buy.vue');

const Invitation = () => import(/* webpackChunkName: "Invitation" */ '@/page/Invitation/Invitation.vue');//邀请
const MyAssets = () => import(/* webpackChunkName: "setting" */ '@/page/wallet/MyAssets.vue');

/* 关于我们 */
const AboutUs = () => import(/* webpackChunkName: "About" */ '@/page/AboutUs/AboutIndex.vue');
const Feedback = () => import(/* webpackChunkName: "About" */ '@/page/setting/Feedback.vue');
const FeedbackList = () => import(/* webpackChunkName: "About" */ '@/page/setting/FeedbackList.vue');
const Protocal = () => import(/* webpackChunkName: "About" */ '@/page/AboutUs/Protocal.vue');
const Serve = () => import(/* webpackChunkName: "About" */ '@/page/AboutUs/Serve.vue');
const Privacy = () => import(/* webpackChunkName: "About" */ '@/page/AboutUs/Privacy.vue');
const UpdateList = () => import(/* webpackChunkName: "About" */ '@/page/AboutUs/UpdateList.vue');

export default [
    {
        path: "/update-list",
        component: UpdateList,
        meta: {
            title: "版本更新",
            requiresAuth: true
        }
    },
    {
        path: "/privacy",
        component: Privacy,
        meta: {
            title: "隐私条款",
            requiresAuth: true
        }
    },
    {
        path: "/serve",
        component: Serve,
        meta: {
            title: "服务条款",
            requiresAuth: true
        }
    },
    {
        path: "/feedback",
        component: Feedback,
        meta: {
            title: "我要反馈",
            requiresAuth: true
        }
    },
    {
        path: "/feedback-list",
        component: FeedbackList,
        meta: {
            title: "反馈记录",
            requiresAuth: true
        }
    },
    {
        path: "/protocal",
        component: Protocal,
        meta: {
            title: "服务协议",
            requiresAuth: true
        }
    },
    {
        path: "/my-assets",
        component: MyAssets,
        meta: {
            title: "我的资产",
            requiresAuth: true
        }
    },
    {
        path: "/lianpiao-detail/:Id",
        component: lianpaioDetail,
        meta: {
            title: "支出支出详情",
            requiresAuth: true
        }
    },
    {
        path: "/expenditure",
        component: Expenditure,
        meta: {
            title: "支出记录",
            requiresAuth: true
        }
    },
    {
        path: "/income",
        component: inCome,
        meta: {
            title: "支入记录",
            requiresAuth: true
        }
    },
    {
        path: "/invitation",
        component: Invitation,
        meta: {
            title: "设置",
            requiresAuth: true
        }
    },
	{
		path: "/setting",
		component: Settings,
		meta: {
			title: "设置",
			requiresAuth: true
		}
	},
    {
        path: "/role-extension",
        component: RoleExtension,
        meta: {
            title: "业务推广",
            requiresAuth: true
        }
    },
    {
        path: "/business-setting",
        component: CompanyInfo,
        meta: {
            title: "个人信息",
            requiresAuth: true
        }
    },
    {
        path: "/question",
        component: Question,
        meta: {
            title: "问题求助",
            requiresAuth: true
        }
    },
    {
        path: "/receivables-way",
        component: ReceivablesWay,
        meta: {
            title: "收款方式",
            requiresAuth: true
        }
    },
    {
        path: "/forget-payPassword",
        component: ForgetPayPassword,
        meta: {
            title: "修改支付密码",
            requiresAuth: true
        }
    },
    {
        path:"/address",
        component: AddressList,
        meta:{
            title:"地址管理",
            keepAlive: true,
            requiresAuth: true,
        },

    },
    {
        path:"/address-add",
        component: AddressAdd,
        meta:{
            title:"添加新地址",
            keepAlive: true,
            requiresAuth: true,
        },

    },
    {
        path:"/address/address-change/:addressId",
        component: AddressChange,
        meta:{
            title:"编辑地址",
            keepAlive: true,
            requiresAuth: true,
        },
    },
	{
		path: "/company-go-info",
		component: CompanyGoInfo,
		meta: {
			title: "公司信息",

		}
	},
    {
        path: "/factory-service-order",
        component: FactoryServiceOrder,
        meta: {
            title: "订单",
            requiresAuth: true
        }
    },
    {
        path: "/factory-port-order",
        component: FactoryPortOrder,
        meta: {
            title: "工业端口订单",
            requiresAuth: true
        }
    },
    {
        path: "/business-port-order",
        component: BusinessPortOrder,
        meta: {
            title: "商业端口订单",
            requiresAuth: true
        }
    },
    {
        path: "/purchasing-port-order",
        component: PurchasingPortOrder,
        meta: {
            title: "采购端口订单",
            requiresAuth: true
        }
    },
    {
        path: "/factory-order",
        component: FactoryOrder,
        meta: {
            title: "订单",
            requiresAuth: true
        }
    },
    {
        path: "/factory-all-order",
        component: FactoryAllOrder,
        meta: {
            title: "工业全部订单",
            requiresAuth: true
        }
    },
	{
		path: "/company-info",
		component: Company,
		meta: {
			title: "公司信息",
            requiresAuth: true
		}
	},
	{
		path: "/company-detail",
		component: CompanyDetail,
		meta: {
			title: "照片详情",
			requiresAuth: true
		}
	},
	{
		path: "/ticket-list",
		component: TicketList,
		meta: {
			title: "联票余额",
			requiresAuth: true
		}
	},
    {
        path: "/lianshu",
        component: lianShu,
        meta: {
            title: "联数",
            requiresAuth: true
        }
    },

	{
		path: "/my-collect",
		component: MyCollect,
		meta: {
			title: "采集定制",
			requiresAuth: true
		}
	},
	{
		path: "/my-follow",
		component: MyFollow,
		meta: {
			title: "我的关注",
			requiresAuth: true
		}
	},

	{
		path: "/factory-order",
		component: FactoryOrder,
		meta: {
			title: "工业订单",
			requiresAuth: true
		}
	},
	{
		path: "/business-order",
		component: MyBusinessOrder,
		meta: {
			title: "商业订单",
			requiresAuth: true
		}
	},
	{
		path: "/my-order/detail/:id",
		component: OrderDetail,
		meta: {
			title: "订单详情",
			requiresAuth: true
		}
	},
	{
		path: "/business-service-order",
		component: BusinessServiceOrder,
		meta: {
			title: "药店订单",
			requiresAuth: true
		}
	},
	{
		path: "/bussiness-order-detail",
		component: BussinessOrderDetail,
		meta: {
			title: "药店订单详情",
			requiresAuth: true
		}
	},
	{
		path: "/drug-detail/:id",
		component: DrugDetail,
		meta: {
			title: "药品详情",

		}
	},
	{
		path: "/factory-loan",
		component: FactoryLoan,
		meta: {
			title: "应有贷款",

		}
	},
	{
		path: "/product-spread",
		component: ProductSpread,
		meta: {
			title: "产品推广",

		}
	},
	{
		path: "/product-spread-detail",
		component: ProductSpreadDetail,
		meta: {
			title: "产品推广详情",

		}
	},
	{
		path: "/download-record",
		component: DownLoadRecord,
		meta: {
			title: "下载记录",

		}
	},

	{
		path: "/gzh-lianbei",
		component: GZHLianBei,
		meta: {
			title: "联贝",
		}
	},
	{
		path: "/gzh-trans",
		component: GZHTrans,
		meta: {
			title: "联贝应用",
		}
	},
	{
		path: "/gzh-buy",
		component: GZHBuy,
		meta: {
			title: "联贝购买",
		}
	},
    {
        path: "/about-us",
        component: AboutUs,
        meta: {
            title: "关于我们",
        }
    },
]
