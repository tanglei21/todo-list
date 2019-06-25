import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  todoList: [],
  // 移动端的时候菜单是否开启
  menuOpen: false
}

const mutations = {
  EDITTODO (state, data) {
    state.todoList = data
  },
  MENUOPEN (state) {
    state.menuOpen = !state.menuOpen
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
