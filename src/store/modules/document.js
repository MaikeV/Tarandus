import axios from "axios";
// import router from "../../router";


const state = () => ({
    activeDocument: { title: '', content: {}, contentEnglish: {} },
    activeSection: '',
    sections: [],
    html: '',
    resp: { out: '', err: '' },
    pdfUrl: '',
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
    pdfFile(state, data) {
        let url = window.url || window.webkitURL

        state.pdfUrl = url.createObjectURL(data)
    }
}

const actions = {
    saveDoc({rootState}) {
        axios.post('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/', rootState.document.activeDocument.content)
    },
    sendCompilePost({rootState, commit}) {
        axios.post('http://localhost:5000/tarandus/compile/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/', rootState.document.activeDocument.content).then(response => {
            if (response.status === 200) {
                commit('setResp', response.data)

                if (rootState.document.resp.err === "") {
                    axios.get( 'http://localhost:5000/tarandus/compile/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/',
                        {responseType: "blob", headers: {'Accept': '*/*', 'Content-Type': 'application/pdf'}}).then(response =>{
                            commit('pdfFile', response.data)

                            document.getElementById('docPrev').innerHTML = '<embed class="pdf ma-0 pa-0"/>'
                            console.log(rootState.document.pdfUrl)
                            document.querySelector("embed").src = rootState.document.pdfUrl
                    })
                }
            }
        })
    },
}

export default {
    namespaced: true,
    state, actions, mutations
}