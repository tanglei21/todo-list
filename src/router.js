import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout.vue'
import Todo from './components/todo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'todo/:id',
          name: 'todo',
          component: Todo
        }
      ]
    }
  ]
})
