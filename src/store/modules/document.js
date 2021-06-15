import axios from "axios";


const state = () => ({
    activeDocument: { title: '', content: {}, contentEnglish: {} },
    activeSection: '',
    sections: [],
    html: '',
    resp: { out: '', err: '' },
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
    setHTML(state, value) {
        console.log('val: ' + value.toString())
        state.html = value
    },
    resetHTML(state) {
        state.html = ''
    },
    setResp(state, value) {
        state.resp = value
    },
}

const actions = {
    saveDoc({rootState}) {
        axios.post('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/', rootState.document.activeDocument.content)
    },
    sendCompilePost({rootState, commit}) {
        axios.post('http://localhost:5000/tarandus/compile/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/', rootState.document.activeDocument.content).then(response => {
                if (response.status === 200) {
                    commit('setResp', response.data)
                }
            }
        )

    },
}

export default {
    namespaced: true,
    state, actions, mutations
}