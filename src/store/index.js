import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let storageSet = JSON.parse(sessionStorage.getItem('POSITIONS'))

const store = new Vuex.Store({
  state: {
//  positions: sessionStorage.getItem('POSITIONS')
    positions: storageSet
  },
  mutations: {
    increment (state,data) {
      sessionStorage.setItem('POSITIONS',JSON.stringify(data));
      let storageSet = JSON.parse(sessionStorage.getItem('POSITIONS'))
      state.positions = storageSet;
    }
  }
})

export default store;