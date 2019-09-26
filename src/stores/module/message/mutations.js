import http from "@/api/api";
import lstore from "@/plugins/lstore/lstore";

export default {
    SAVE_NOTIFICATIONS (state, notifications) {
        for (const key in _.pick(state, ['comment', 'like', 'system'])) {
            state[key] = notifications[key]
        }
    },
    SAVE_AUDIT (state, { type, list, append = false }) {
        if (append) {
            state.audits[type].push(...list)
        } else {
            state.audits[type] = list
        }
    },
    SAVE_USER (state, user) {
        state.user = user
    },
}