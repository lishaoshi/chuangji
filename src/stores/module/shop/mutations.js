import http from "@/api/api";
import lstore from "@/plugins/lstore/lstore";

export default {
    //选择的地址
    CHOOSE_ADDRESS(state,{ address}){
        state.CHOOSED_ADDRESS = address
        lstore.setData('CHOOSED_ADDRESS',address)
    },

    SAVE_ADDRESS(state,addressList) {
        state.ADDRESS_LIST = addressList
    },
    
    DELETE_ADDRESS(state,id){
    	let addressList = state.ADDRESS_LIST
    	addressList.forEach((address,index) => {
    		if(address.id === id){
    			addressList.splice(index, 1); 
    			//delete addressList[index]
    		}
    	})
    	state.ADDRESS_LIST = addressList
    },
    /**
     *删除选择地址
     *
     * @param {*} state
     * @param {*} id
     */
    DEL_CHOOSED_ADDRESS(state) {
        state.CHOOSED_ADDRESS = null
    },
    UPDATE_ADDRESS(state,id){
    	state.ADDRESS_LIST = addressList
    },
    SAVE_CURRENT_BUSINESS_SHOP(state,shopId){
        state.CURRENT_BUSINESS_SHOP = shopId
    },
    SAVE_CURRENT_BUSINESS_SHOP_DATA(state,data){
        state.CURRENT_BUSINESS_SHOP_DATA = data
       lstore.setData('CURRENT_BUSINESS_SHOP_DATA',data)
    },

    //添加入购物车
    ADD_CART(state,{shopId,itemId,sale_price}){
        let cartList = state.CART_LIST
        let shop = cartList[shopId] =(cartList[shopId] || {})
        if(shop[itemId]){
            shop[itemId]['num']++
        }else{
            shop[itemId] = {
                "num":1,
                sale_price,
                id:itemId
            }
        }
        state.CART_LIST = {...cartList}
        lstore.setData('CART_LIST',state.CART_LIST)
    },
    // 移出购物车
    REMOVE_CART(state,{shopId,itemId}) {
        // debugger
        let cartList = state.CART_LIST
        let shop = (cartList[shopId] || {})
        if (shop && shop[itemId]) {
            if (shop[itemId]['num'] > 1) {
                shop[itemId]['num']--;
                state.CART_LIST = {...cartList}
                lstore.setData('CART_LIST', state.CART_LIST)
            } else {
                //商品数量为0，则清空当前商品的信息
                delete shop[itemId];
                state.CART_LIST = {...cartList}
                lstore.setData('CART_LIST', state.CART_LIST)
            }
        }
    },
    //清空商铺的购物车
    CLEAR_CART(state,itemId){
        // debugger
        let cartList = state.CART_LIST
        Object.values(cartList).forEach( (item,index) => {
            Object.values(item).forEach( (items,indexs) => {
               if(items.id === itemId) {
                delete item[itemId]
                }
            })
        })
        state.CART_LIST = {...cartList}
        lstore.setData('CART_LIST',state.CART_LIST)
    },
    //清空购物车
    CLEAR_ALL_CART(state){
        state.CART_LIST = {}
        lstore.setData('CART_LIST',state.CART_LIST)
    },

    //保存确认订单总数据
    SAVE_CONFIRM_ORDER_DATA(state,data){
        state.CONFIRM_ORDER_DATA = data
        lstore.setData('CONFIRM_ORDER_DATA',data)
    },
    //清空确认订单总数据
    CLEAR_CONFIRM_ORDER_DATA(state){
        state.CONFIRM_ORDER_DATA = {}
        lstore.setData('CONFIRM_ORDER_DATA',{})
    },
    
    /*公司进入时的商城*/
    //添加入购物车
    BUSINESS_ADD_CART(state,{shopId,itemId,price}){
        let cartList = state.BUSINESS_CART_LIST
        let shop = cartList[shopId] =(cartList[shopId] || {})
        if(shop[itemId]){
            shop[itemId]['num']++
        }else{
            shop[itemId] = {
                "num":1,
                price,
                id:itemId
            }
        }
        state.BUSINESS_CART_LIST = {...cartList}
        lstore.setData('BUSINESS_CART_LIST',state.BUSINESS_CART_LIST)
    },
    // 移出购物车
    BUSINESS_REMOVE_CART(state,{shopId,itemId}) {
        let cartList = state.BUSINESS_CART_LIST
        let shop = (cartList[shopId] || {})
        if (shop && shop[itemId]) {
            if (shop[itemId]['num'] > 0) {
                shop[itemId]['num']--;
                state.BUSINESS_CART_LIST = {...cartList}
                lstore.setData('BUSINESS_CART_LIST', state.BUSINESS_CART_LIST)
            } else {
                //商品数量为0，则清空当前商品的信息
                shop[itemId] = null;
            }
        }
    },
    //清空商铺的购物车
    BUSINESS_CLEAR_CART(state,shopId){
        state.BUSINESS_CART_LIST[shopId] = null
        state.BUSINESS_CART_LIST = {...state.BUSINESS_CART_LIST}
        lstore.setData('BUSINESS_CART_LIST',state.BUSINESS_CART_LIST)
    },
    //清空购物车
    BUSINESS_CLEAR_ALL_CART(state){
        state.BUSINESS_CART_LIST = {}
        lstore.setData('BUSINESS_CART_LIST',state.BUSINESS_CART_LIST)
    },
}