import { getTodoList } from '../api/api'

export const getTodo = ({ commit }) => {
  return new Promise(resolve => {
    getTodoList().then(res => {
      commit('EDITTODO', res.data.todos)
      resolve()
    })
  })
}

export const updateMenu = ({ commit }) => {
  commit('MENUOPEN')
}
