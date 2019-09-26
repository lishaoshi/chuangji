const LianbeiDetail = () => import(/* webpackChunkName: "lianbei" */ '@/page/lianbei/LianbeiDetail.vue');
const LianBei = () => import(/* webpackChunkName: "lianbei" */ '@/page/lianbei/Lianbei.vue');
const LianBeiEdit = () => import(/* webpackChunkName: "lianbei" */ '@/page/lianbei/LianbeiEdit.vue');


export default [
    {
        path: "/lianbei",
        component: LianBei,
        meta: {
            title: "联贝",
            requiresAuth: true
        }
    },
    {
        path: "/lianbei-edit",
        component: LianBeiEdit,
        meta: {
            title: "联贝编辑",
            requiresAuth: true
        }
    },
    {
        path: "/lianbei-detail",
        component: LianbeiDetail,
        meta: {
            title: "联贝明细",
            requiresAuth: true
        }
    },
];