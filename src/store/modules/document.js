import axios from "axios";

const state = () => ({
    activeDocument: { title: '', content: {}, contentEnglish: {} },
    activeSection: '',
    activeSectionEN: '',
    sections: [],
    html: '',
    htmlEN: '',
    resp: { out: '', err: '' },
    pdfUrl: '',
})

const mutations = {
    setContent(state, data) {
        let content = data[0]
        let language = data[1]

        if (language === 'german') {
            state.activeDocument.content = JSON.parse(content)
        } else {
            state.activeDocument.contentEnglish = JSON.parse(content)
        }
    },
    setContent2(state, data) {
        let content = data[0]
        let language = data[1]

        if (language === 'german') {
            state.activeDocument.content = content
        } else {
            state.activeDocument.contentEnglish = content
        }
    },
    setBilingualContent(state, data) {
        let german = data[0]
        let english = data[1]

        console.log("bilicon")
        console.log(JSON.parse(english))

        state.activeDocument.content = JSON.parse(german)
        state.activeDocument.contentEnglish = JSON.parse(english)
    },
    setTitle(state, title) {
        state.activeDocument.title = title
    },
    setActiveSection(state, language) {
        if(language === 'german') {
            state.activeSection = JSON.parse(state.activeDocument.content)
        } else {
            state.activeSectionEN = JSON.parse(state.activeDocument.contentEnglish)
        }
    },
    setHTML(state, data) {
        let value = data[0]
        let language = data[1]

        if(language === 'german') {
            state.html = value
        } else {
            state.htmlEN = value
        }
    },
    resetHTML(state, language) {
        if(language === 'german') {
            state.html = ''
        } else {
            state.htmlEN = ''
        }
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
        axios.post('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/', rootState.document.activeDocument)
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