import _ from 'lodash'

export default {
    unreadMessage: state => Object.keys(_.pick(state,['comment','like','system']))
        .reduce((sum,key) => sum + ((state[key]).badge || 0),0),

    unreadAudits: state => Object.keys(state.audits)
        .reduce((sum, key) => sum + _.filter(state.audits[key], item => item.status === 0).length, 0),
}
