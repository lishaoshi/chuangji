import { getAddressList,deleteAddress } from "@/api/address";

export default {
    async saveAddress({ commit, state}){
        const {data}  = await getAddressList()
        commit('SAVE_ADDRESS',data)
    },
    
    async deleteAddress({ commit, state},id){
        await deleteAddress(id)
        commit('DELETE_ADDRESS',id)
    },
    async updateAddress({ commit, state},id){
        await updateAddress(id)
        const {data} = await getAddressList()
        commit('UPDATE_ADDRESS',id)
    },

    // 添加购物车
    ADD_SHOP_CAR({state, commit, rootState},{shopId,itemId,sale_price} ) {
        commit('ADD_CART', {shopId,itemId,sale_price})
    },

    // 移除购物车
    REMOVE_SHOP_CAR({state, commit, rootState}, {shopId, itemId}) {
        commit('REMOVE_CART', {shopId,itemId})
    }
    
}
