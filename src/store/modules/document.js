const state = () => ({
    selectedDocument: {'name': '', 'chapter': ''},
    documents: [
        {
            name: 'Practical 1'
        },
        {
            name: 'Practical 2'
        },
        {
            name: 'Practical 2'
        }
    ]
})

const mutations = {

}

const actions = {
    getDocuments() {
       return state.documents
    }
}

export default {
    namespaced: true,
    state, actions, mutations
}