const CoustomDetail = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/CoustomDetail.vue');
const ChannelProfit = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/ChannelProfit.vue');

//通道收益明细
const earningsDetail = () => import('@/page/extension/earningsDetail/index')

/**
 * 合伙收益
 */
const cooperationProfit = ()=>import('@/page/extension/cooperationProfit/index')

const BusinessProfit = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/BusinessProfit.vue');
const AuthorizationAgreement = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/AuthorizationAgreement.vue');
const ExtensionPay = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/ExtensionPay.vue');
const Introduction = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/Introduction.vue');
const weixinPay = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/weixinPay.vue');
const weixinAdd = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/weixinAdd.vue');
const CustomerAuthorization = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/CoustomerAuthorization.vue');
const UpgradeHehuo = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/UpgradeHehuo.vue');
const AddRoleTwo = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/AddRole.vue');
const AddRole = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/sub/UnSureCustomerComponent.vue');

//联贝
const Lianbei = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/lianbei/Lianbei.vue');
const TransferAccounts = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/lianbei/TransferAccounts.vue');

const CustomerShi = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/sub/CustomerShi.vue');
const CustomerTuiguang = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/sub/CustomerTuiguang.vue');
const PartnerTuiguang = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/PartnerTuiguanPage.vue');
const PartnerCaiGou = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/PartnerCaiGouPage.vue');

const UnSureFactoryInfo = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/UnSureExtension/FactoryInfo.vue');
const UnSureBusinessInfo = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/UnSureExtension/BusinessInfo.vue');
const UnSureHospitalInfo = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/UnSureExtension/HospitalInfo.vue');
const UnSureMonomerInfo = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/UnSureExtension/MonomerInfo.vue');
const UnSureClinicInfo = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/UnSureExtension/ClinicInfo.vue');
const UnSureChainInfo = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/UnSureExtension/ChainInfo.vue');

const ExtensionMessage = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/Message.vue');
const CustomerChooseRole = () => import(/* webpackChunkName: "extensition" */ '@/page/Home/sub/UnSureCustomerComponent.vue');
const ApplySuccess = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/PaySuccess.vue');

//公司信息
const ExtensionAptitudesEdit = () => import(/* webpackChunkName: "extensition" */ '@/page/extension/aptitude/AptitudesEdit');

// 当前用户不是推广员时，table栏中的客户按钮
const promotersCustomer = () => import('@/page/My/UnautMy/promotersCustomer');

/** 
 * 合伙人简介
*/
const partnerInfo = () => import('@/page/My/partnerInfo')

/**
 * 消息通知
 */
const newMessage = ()=>import('@/page/newMessage/index')


export default [
    {
        path: "/apply-success",
        component: ApplySuccess,
        meta: {
            title: "申请成功",
            requiresAuth: true
            
        }
    },
    {
        path: "/promotersCustomer",
        component: promotersCustomer,
        meta: {
            title: "客户",
            requiresAuth: true
        }
    },
    {
        path: "/edit-aptitudes",
        component: ExtensionAptitudesEdit,
        meta: {
            title: "公司信息",
            requiresAuth: true
            
        }
    },
    {
        path: "/partnerInfo",
        component: partnerInfo,
        meta: {
            title: "合伙人简介",
            requiresAuth: true
        }
    },
    {
        path: "/add-role",
        component: AddRoleTwo,
        meta: {
            title: "增加角色",
            requiresAuth: true
            
        }
    },
    {
        path: "/extension-message",
        component: ExtensionMessage,
        meta: {
            title: "消息通知",
            requiresAuth: true
            
        }
    },
    {
        path: "/coustom-detail",
        component: CoustomDetail,
        meta: {
            title: "详情",
            requiresAuth: true
         
        }
    },
    {
        path: "/channel-profit",
        component: ChannelProfit,
        meta: {
            title: "通道收益",
            requiresAuth: true
        }
    },
    {
        path: "/earnings-detail",
        component: earningsDetail,
        meta: {
            title: "收益明细",
            requiresAuth: true
        }
    },
    {
        path: "/cooperation-profit",
        component: cooperationProfit,
        meta: {
            title: "合伙收益",
            requiresAuth: true
        }
    },
    {
        path: "/business-profit",
        component: BusinessProfit,
        meta: {
            title: "业务收益",
            requiresAuth: true
        }
    },
    {
        path: "/customer-city/:code",
        component: CustomerShi,
        meta: {
            title: "市代理",
            requiresAuth: true
        }
    },
    {
        path: "/customer-tuiguang/:userId",
        component: CustomerTuiguang,
        meta: {
            title: "推广",
            requiresAuth: true
        }
    },
    {
        path: "/partner-tuiguang",
        component: PartnerTuiguang,
        meta: {
            title: "推广人",
            requiresAuth: true
        }
    },
    {
        path: "/partner-caigou",
        component: PartnerCaiGou,
        meta: {
            title: "采购商",
            requiresAuth: true
        }
    },

    {
        path: "/authorization-agreement",
        component: AuthorizationAgreement,
        meta: {
            title: "授权协议",
            requiresAuth: true
        }
    },
    {
        path: "/extension-pay",
        component: ExtensionPay,
        meta: {
            title: "权限支付",
            requiresAuth: true
        }
    },
    {
        path: "/introduction/:type",
        component: Introduction,
        meta: {
            title: "推广简介",
            requiresAuth: true
        }
    },
    {
        path: "/weixin-pay",
        component: weixinPay,
        meta: {
            title: "微信支付",
            requiresAuth: true
        }
    },
    {
        path: "/weixin-add",
        component: weixinAdd,
        meta: {
            title: "添加微信",
            requiresAuth: true
        }
    },
    {
        path: "/customer-authorization",
        component: CustomerAuthorization,
        meta: {
            title: "客户授权",
            requiresAuth: true
        }
    },
    {
        path: "/upgradeHehuo",
        component: UpgradeHehuo,
        meta: {
            title: "升级合伙人",
            requiresAuth: true
        }
    },
    {
        path: "/add-role",
        component: AddRole,
        meta: {
            title: "添加角色",
            requiresAuth: true
        }
    },
    //联贝
    {
        path: "/extension-lianbei",
        component: Lianbei,
        meta: {
            title: "我的联贝",
            requiresAuth: true
        }
    },
    {
        path: "/transfer-accounts",
        component: TransferAccounts,
        meta: {
            title: "转账",
            requiresAuth: true
        }
    },

    {
        path: "/unsure-factory/:type",
        component: UnSureFactoryInfo,
        meta: {
            title: "工业",
            requiresAuth: true
        }
    },
    {
        path: "/unsure-business/:type",
        component: UnSureBusinessInfo,
        meta: {
            title: "商业",
            requiresAuth: true
        }
    },
    {
        path: "/unsure-hospital/:type",
        component: UnSureHospitalInfo,
        meta: {
            title: "医院",
            requiresAuth: true
        }
    },
    {
        path: "/unsure-chain/:type",
        component: UnSureChainInfo,
        meta: {
            title: "连锁",
            requiresAuth: true
        }
    },
    {
        path: "/unsure-clinic/:type",
        component: UnSureClinicInfo,
        meta: {
            title: "诊所",
            requiresAuth: true
        }
    },
    {
        path: "/unsure-monomer/:type",
        component: UnSureMonomerInfo,
        meta: {
            title: "单体",
            requiresAuth: true
        }
    },
    {
        path: "/customer-choose-role",
        component: CustomerChooseRole,
        meta: {
            title: "选择角色",
            requiresAuth: true
        }
    },
    {
        path: "/new-message/:type",
        component:newMessage,
        name: newMessage,
        meta: {
            title: "消息通知",
            requiresAuth: true
        }
    }

]