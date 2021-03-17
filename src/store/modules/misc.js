const state = () => ({
    dialog: false,
    failed: []
})

const mutations = {
    switch(state) {
        state.dialog = state.dialog ? false : true
    },
}

const actions = {}

export default {
    namespaced: true,
    state, actions, mutations
}