<template>
  <div class="list-todos">
    <a
      class="list-todo"
      :class="{'active':item.id===todoId}"
      v-for="(item, index) in todoList"
      :key="index"
      @click="goList(item.id)"
    >
      <i class="fas fa-lock icon-lock" v-if="item.locked"></i>
      {{item.title}}
      <span class="count" v-if="item.count>0">{{item.count}}</span>
    </a>
    <a class="list-new" @click="addTodoList">
      <i class="fas fa-plus icon-plus"></i>
      新增
    </a>
  </div>
</template>

<script>
import { addTodo } from '../api/api'
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      todoId: '',
      todoNum: 0
    }
  },
  created () {
    // getTodoList({}).then(res => {
    //   const TODOS = res.data.todos
    //   this.items = TODOS
    //   this.todoId = TODOS[0].id
    // })
    this.$store.dispatch('getTodo').then(() => {
      this.$nextTick(() => {
        this.goList(this.todoList[0].id)
      })
    })
  },
  computed: {
    todoList () {
      const number = this.$store.getters.getTodoList.length
      if (number < this.todoNum) {
        this.goList(this.$store.getTodoList[0].id)
      }
      // this.todoNum = number
      return this.$store.getters.getTodoList
    }
  },
  watch: {
    'todoId' (id) {
      this.$router.push({ name: 'todo', params: { id } })
    }
  },
  methods: {
    goList (id) {
      this.todoId = id
    },
    addTodoList () {
      addTodo({}).then(data => {
        // getTodoList({}).then(res => {
        //   const TODOS = res.data.todos
        //   this.todoId = TODOS[TODOS.length - 1].id
        //   this.items = TODOS
        // })
        this.$store.dispatch('getTodo').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id)
            }, 100)
          })
        })
      })
    }
  }
}
</script>

<style lang="less">
@import url("../common/style/menus.less");
</style>
