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
    }
    
}
