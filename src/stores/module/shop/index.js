import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import lstore from "@/plugins/lstore";

const state = {
    REMOVE_ADDRESS:[],//移除地址
    ADD_ADDRESS:'',
    ADDRESS_LIST:[],//地址列表
    CART_LIST:  lstore.getData('CART_LIST') ||{},//加入购物车的商品列表 factory
    CURRENT_BUSINESS_SHOP:null,
    CURRENT_BUSINESS_SHOP_DATA:lstore.getData("CURRENT_BUSINESS_SHOP_DATA")||{},
    BUSINESS_CART_LIST:lstore.getData('BUSINESS_CART_LIST') ||{},//加入购物车的商品列表 business
    CONFIRM_ORDER_DATA: lstore.getData('CONFIRM_ORDER_DATA') || null,//确认定单数据,
    CHOOSED_ADDRESS:lstore.getData('CHOOSED_ADDRESS')||null,//选择的地址
};

export default {
    getters,
    actions,
    mutations,
    state
};