const state = () => ({
    dialog: false,
    documentDialog: false,
    deleteModuleDialog: false,
    deleteDocumentDialog: false,
    failed: []
})

const mutations = {
    switch(state) {
        state.dialog = !state.dialog
    },
    switchDocumentDialog(state) {
        state.documentDialog = !state.documentDialog
    },
    switchDeleteModuleDialog(state) {
        state.deleteModuleDialog = !state.deleteModuleDialog
    },
    switchDeleteDocumentDialog(state) {
        state.deleteDocumentDialog = !state.deleteDocumentDialog
    }
}

const actions = {

}

export default {
    namespaced: true,
    state, actions, mutations
}