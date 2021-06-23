const state = () => ({
    activeSection: {
        type: 'text',
        content: {}
    },
    activeSectionEN: {
        type: 'text',
        content: {}
    },
    sections: [],
})

const mutations = {
    set(state, data) {
        let type = data[0]
        let language = data[1]

        if(language === 'german') {
            state.activeSection.type = type
        } else {
            state.activeSectionEN.type = type
        }
    },
}

const actions = {}

export default {
    namespaced: true,
    state, actions, mutations
}