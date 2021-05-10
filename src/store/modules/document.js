import axios from "axios";


const state = () => ({
    activeDocument: { title: '', content: {} },
    activeSection: '',
    sections: [],

})

const mutations = {
    setContent(state, content) {
        state.activeDocument.content = JSON.parse(content)
    },
    setContent2(state, content) {
        state.activeDocument.content = content
    },
    setTitle(state, title) {
        state.activeDocument.title = title
    },
    setActiveSection(state) {
        state.activeSection = JSON.parse(state.activeDocument.content)
    },
}

const actions = {
    saveDoc({rootState}) {
        axios.post('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/', rootState.document.activeDocument.content)
    }
}

export default {
    namespaced: true,
    state, actions, mutations
}