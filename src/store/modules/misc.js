const state = () => ({
    dialog: false,
    documentDialog: false,
    failed: []
})

const mutations = {
    switch(state) {
        state.dialog = !state.dialog
    },
    switchDocumentDialog(state) {
        state.documentDialog = !state.documentDialog
    }
}

const actions = {}

export default {
    namespaced: true,
    state, actions, mutations
}