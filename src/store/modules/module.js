import axios from 'axios'

const state = () => ({
    selectedModule: { 'name': '', 'description': '', 'bilingual': 'true' },
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
})

const mutations = {
    switchBilingual(state) {
        state.bilingual = !state.bilingual
    },
    getDocuments({rootState}) {
        actions.loadDocuments(rootState)
    },
    updateValue(state, data) {
        let field = data[0]
        let value = data[1]

        state.selectedModule[field] = value
    }
}

const actions = {
    loadDocuments({rootState}) {
        state.documents = rootState.document.documents
    },
    postSelected({rootState}) {
        axios.post('http://localhost:5000/tarandus/', rootState.module.selectedModule).then(response => {
                console.log(response)

                if(response.status === 200) {
                    rootState.module.selectedModule = { 'name': '', 'description': '', 'bilingual': 'true' }
                    rootState.misc.dialog = false
                }
            }
        )
    },
    getModules({rootState}) {
        console.log("testGet")
        axios.get('http://localhost:5000/tarandus/').then(response => {
            if(response.status === 200) {
                // console.log(response)
                rootState.module.modules = response.data

                console.log(rootState.module.modules)
            }
        })
    }
}

export default {
    namespaced: true,
    state, actions, mutations
}