

const state = () => ({
    selectedDocument: {name: '', content: {}},
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
    ],
    activeSection: '',
    sections: []
})

const mutations = {
    setContent(state, content) {
        state.selectedDocument.content = content
    },
    setActiveSection(state) {
        state.activeSection = JSON.parse(state.selectedDocument.content)

        console.log(state.activeSection)
    },
    getSections(state) {
        JSON.parse(state.selectedDocument.content)

        state.sections.append()
    }
}

const actions = {

}

export default {
    namespaced: true,
    state, actions, mutations
}