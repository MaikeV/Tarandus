import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import misc from './modules/misc.js'

export default new Vuex.Store({
    modules: {
        misc,
    }
})