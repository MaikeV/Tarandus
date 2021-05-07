import axios from 'axios'
import router from '../../router'

const state = () => ({
    selectedModule: { 'name': '', 'description': '', 'bilingual': 'true', 'documents': []},
    selectedDocument: { title: '', format: ''},
    modules: [
        {
            name: 'Module 1',
            bilingual: true,
            description: 'Lorem Ipsum...',
            documents: [
                {
                    title: 'Document 1',
                    format: 'json'
                },
            ]
        },{
            name: 'Module 2',
            bilingual: false,
            description: '...dolor sit amet...'
        }
    ],
    newDocument: { title: '', format: 'json' },
    editModule: { name: '', description: '', bilingual: true },
    isEdit: false,
})

const mutations = {
    switchBilingual(state) {
        state.bilingual = !state.bilingual
    },
    updateValue(state, data) {
        let field = data[0]
        let value = data[1]

        state.selectedModule[field] = value
    },
    updateEditModule(state, data) {
        let field = data[0]
        let value = data[1]

        state.editModule[field] = value
    },
    setSelectedModule(state, index) {
        state.modules.find(m => {
            if(m.name === index.name) {
                state.selectedModule = m
            }
        })
    },
    setSelectedModuleByName(state, name) {
        state.modules.find(m => {
            if(m.name === name) {
                state.selectedModule = m
            }
        })
    },
    setSelectedDocument(state, index) {
        state.selectedModule.documents.find(d => {
            if(d.title === index.title) {
                state.selectedDocument = d
            }
        })
    },
    setSelectedDocumentByTitle(state, title) {
        state.selectedModule.documents.find(d => {
            if(d.title === title) {
                state.selectedDocument = d
            }
        })
    },
    setModules(state, data) {
        state.modules = data
    },
    setSelectedDocumentTitle(state, value) {
        state.selectedDocument.title = value
    },
    setEdit(state) {
        state.isEdit = true
        state.editModule.name = state.selectedModule.name
        state.editModule.description = state.selectedModule.description
        state.editModule.bilingual = state.selectedModule.bilingual
    },
    resetSelectedModule(state) {
        state.selectedModule = { 'name': '', 'description': '', 'bilingual': 'true', 'documents': [] }
    },
    resetSelectedDocument(state) {
        state.selectedDocument = { title: '', format: 'json' }
    },
    resetNewDocument(state) {
        state.newDocument = { title: '', format: 'json' }
    },
    resetEditModule(state) {
        state.isEdit = false
        state.editModule = { name: '', description: '', bilingual: true }
    },
}

const actions = {
    // add new Module
    postSelected({rootState, commit, dispatch}) {
        axios.post('http://localhost:5000/tarandus/', rootState.module.selectedModule).then(response => {
            console.log(response)

            if(response.status === 200) {
                commit('resetSelectedModule')
                rootState.misc.dialog = false

                dispatch('getModules')
            }
        })
    },
    // add new document
    postDocumentSelected({rootState, commit, dispatch}) {
        axios.post('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/', rootState.module.newDocument).then(response => {
            console.log(response)

            if(response.status === 200) {
                commit('resetNewDocument')
                commit('resetSelectedModule')
                rootState.misc.documentDialog = false

                dispatch('getModules')
            }
        })
    },
    // load modules and documents
    getModules({commit}) {
        axios.get('http://localhost:5000/tarandus/').then(response => {
            if(response.status === 200) {
                commit('setModules', response.data)
            }
        })
    },
    // delete module
    deleteSelectedModule({rootState, commit, dispatch}) {
        axios.delete('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/').then(response => {
            if(response.status === 200) {
                commit('resetSelectedModule')
                rootState.misc.deleteModuleDialog = false

                dispatch('getModules')
            }
        })
    },
    // delete document
    deleteSelectedDocument({rootState, commit, dispatch}) {
        axios.delete('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/').then(response => {
            if(response.status === 200) {
                commit('resetSelectedModule')
                commit('resetSelectedDocument')
                rootState.misc.deleteDocumentDialog = false

                dispatch('getModules')
            }
        })
    },
    // rename document
    renameSelectedDocument({rootState, commit, dispatch}) {
        axios.put('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/', rootState.module.newDocument).then(response => {
            if(response.status === 200) {
                commit('resetSelectedModule')
                commit('resetSelectedDocument')
                commit('resetNewDocument')

                rootState.misc.documentDialog = false

                dispatch('getModules')
            }
        })
    },
    // edit module
    editSelectedModule({rootState, commit, dispatch}) {
        axios.put('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/', rootState.module.editModule).then(response => {
            if(response.status === 200) {
                commit('resetSelectedModule')

                rootState.misc.dialog = false

                dispatch('getModules')
            }
        })
    },
    loadDocument({rootState, commit}) {
        axios.get('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/' + rootState.module.selectedDocument.title + '/').then(function (response) {
            if(response.status === 200) {
                router.push({name: "editor", params: {moduleName: rootState.module.selectedModule.name, documentTitle: rootState.module.selectedDocument.title}}).then(
                    commit('document/setContent', response.data, {root: true})
                ).catch(()=>{})
            }
        })
    }
}

export default {
    namespaced: true,
    state, actions, mutations
}