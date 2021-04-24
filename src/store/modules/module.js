import axios from 'axios'

const state = () => ({
    selectedModule: { 'name': '', 'description': '', 'bilingual': 'true' },
    modules: [
        {
            name: 'Module 1',
            bilingual: true,
            description: 'Lorem Ipsum...'
        },{
            name: 'Module 2',
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

        console.log(field)
        console.log(value)

        state.selectedModule[field] = value
    }
}

const actions = {
    loadDocuments({rootState}) {
        state.documents = rootState.document.documents
    },
    postSelected({rootState}) {
        // let content = state.selectedModule

        // let options = {
        //     url: 'http://localhost:5000/tarandus',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     data: content,
        // }

        axios.post('http://localhost:5000/tarandus/', rootState.module.selectedModule).then(response => {
                console.log(response)

                if (response.status === 403) {
                    // rootState.module.statusMessage = "A Module with this Name already exists"
                }
            }
        )
    }
}

export default {
    namespaced: true,
    state, actions, mutations
}