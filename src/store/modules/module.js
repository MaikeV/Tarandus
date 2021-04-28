import axios from 'axios'

const state = () => ({
    selectedModule: { 'name': '', 'description': '', 'bilingual': 'true', 'documents': []},
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
    newDocument: { title: '', format: 'json' }
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
    // addDocument(state) {
    //     state.selectedModule.documents.push(state.newDocument)
    //
    //     state.newDocument = { title: '', format: 'json' }
    // },
    setSelectedModule(state, index) {
        state.modules.find(m => {
            if(m.name === index.name) {
                state.selectedModule = m
            }
        })

        console.log("hier" + state.selectedModule.name)
    }
}

const actions = {
    postSelected({rootState}) {
        axios.post('http://localhost:5000/tarandus/', rootState.module.selectedModule).then(response => {
            console.log(response)

            if(response.status === 200) {
                rootState.module.selectedModule = { 'name': '', 'description': '', 'bilingual': 'true', 'documents': [] }
                rootState.misc.dialog = false

                axios.get('http://localhost:5000/tarandus/').then(response => {
                    if(response.status === 200) {
                        // console.log(response)
                        rootState.module.modules = response.data

                        console.log(rootState.module.modules)
                    }
                })
            }
        })
    },
    postDocumentSelected({rootState}) {
        axios.post('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/', rootState.module.newDocument).then(response => {
            console.log(response)

            if(response.status === 200) {
                rootState.module.newDocument = { title: '', format: 'json' }
                rootState.module.selectedModule = { 'name': '', 'description': '', 'bilingual': 'true', 'documents': [] }
                rootState.misc.documentDialog = false

                axios.get('http://localhost:5000/tarandus/').then(response => {
                    if(response.status === 200) {
                        // console.log(response)
                        rootState.module.modules = response.data

                        console.log(rootState.module.modules)
                    }
                })
            }
        })
    },
    getModules({rootState}) {
        axios.get('http://localhost:5000/tarandus/').then(response => {
            if(response.status === 200) {
                // console.log(response)
                rootState.module.modules = response.data

                console.log(rootState.module.modules)
            }
        })
    },
    deleteSelectedModule({rootState}) {
        axios.delete('http://localhost:5000/tarandus/' + rootState.module.selectedModule.name + '/').then(response => {
            if(response.status === 200) {
                rootState.module.selectedModule = { 'name': '', 'description': '', 'bilingual': 'true', 'documents': [] }
                rootState.misc.deleteModuleDialog = false

                axios.get('http://localhost:5000/tarandus/').then(response => {
                    if(response.status === 200) {
                        // console.log(response)
                        rootState.module.modules = response.data

                        console.log(rootState.module.modules)
                    }
                })
            }
        })
    }
}

export default {
    namespaced: true,
    state, actions, mutations
}