const state = () => ({
    activeSection: {
        type: 'text',
        content: {}
    },
    sections: [],
})

const mutations = {
    set(state, type) {
        state.activeSection.type = type
    }
}

const actions = {}

export default {
    namespaced: true,
    state, actions, mutations
}