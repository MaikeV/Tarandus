const state = () => ({
    dialog: false,
    documentDialog: false,
    deleteModuleDialog: false,
    deleteDocumentDialog: false,
    failed: [],
    cols: {chapter: 2, editor: 5, preview: 5},
    editorEnglish: false,
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
    },
    resetCols(state) {
        state.cols.chapter = 2
        state.cols.editor = 5
        state.cols.preview = 5
    },
    enableEN(state) {
        state.cols.chapter = 1
        state.cols.editor = 4
        state.cols.preview = 3
        state.editorEnglish = true
    },
    disableEN(state) {
        state.cols.chapter = 2
        state.cols.editor = 5
        state.cols.preview = 5
        state.editorEnglish = false
    }
}

const actions = {

}

export default {
    namespaced: true,
    state, actions, mutations
}