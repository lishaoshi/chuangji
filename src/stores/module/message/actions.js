export default {
    async getNotificationStatistics({ commit}){
        const { data } = await api.getNotificationStatistics()
        commit('SAVE_NOTIFICATIONS', data)
    },
    async getUnreadCount ({ commit }) {
        const { data } = await api.getUnreadCounts()
        commit('SAVE_USER', data)
    },

    async getGroupJoinedList ({ commit }, payload = {}) {
        const { data: list } = await groupApi.getGroupAudits(payload)
        commit('SAVE_AUDIT', { type: 'groupJoined', list })
    },

    async getAllUnreadCount ({ dispatch }) {
        dispatch('getNotificationStatistics')
        dispatch('getUnreadCount')
    },
}
