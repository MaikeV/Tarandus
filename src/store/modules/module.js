const state = () => ({
    name: "",
    description: "",
    bilingual: true,
    modules: [
        {
            title: 'Module 1',
            bilingual: true,
            description: 'Lorem Ipsum...'
        },{
            title: 'Module 2',
            bilingual: false,
            description: '...dolor sit amet...'
        }
    ],
    documents: [
        {
            name: 'Practical 1'
        },
        {
            name: 'Practical 2'
        },
        {
            name: 'Practical 3'
        }
        //TODO: only practicals for the specific module
    ]
})

const mutations = {
    switchBilingual(state) {
        state.bilingual = !state.bilingual
    },
    getDocuments({rootState}) {
        actions.loadDocuments(rootState)
    }
}

const actions = {
    loadDocuments({rootState}) {
        state.documents = rootState.document.documents
    }
}

export default {
    namespaced: true,
    state, actions, mutations
}