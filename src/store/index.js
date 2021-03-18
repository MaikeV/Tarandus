import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import misc from './modules/misc.js'
import module from './modules/module.js'
import document from './modules/document.js'

export default new Vuex.Store({
    modules: {
        misc,
        module,
        document
    }
})