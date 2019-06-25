<template>
  <div class="page list-show" v-show="!todo.isDelete">
    <nav>
      <!-- 移动端图标 -->
      <div class="nav-group" v-show="isUpdate">
        <a class="nav-item">
          <i class="fas fa-list"></i>
        </a>
      </div>
      <!--todo标题-->
      <h1 class="todo-title" v-show="!isUpdate" @click="isUpdate = true">
        <span class="title-wrapper">{{todo.title}}</span>
        <span class="count">{{todo.count||0}}</span>
      </h1>
      <!--修改todo标题
      <div class="form list-edit-form" v-show="isUpdate">
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item">
            <i class="far fa-times-circle"></i>
          </a>
        </div>
      </div>-->
      <!-- 删除 锁定图标 -->
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options">
          <a class="nav-item" @click="onLock">
            <i class="fas fa-lock icon-lock" v-if="todo.locked"></i>
            <i class="fas fa-lock-open icon-unlock" v-else></i>
          </a>
          <a class="nav-item">
            <i class="fas fa-trash icon-trash" @click="onDelete"></i>
          </a>
        </div>
      </div>
      <!-- 新增todo输入-->
      <div class="form todo-new input-symbol">
        <input
          type="text"
          @keyup.enter="onAdd"
          v-model="text"
          :disabled="todo.locked"
          placeholder="请输入。。。"
        >
        <i class="fas fa-plus-circle icon-add"></i>
      </div>
    </nav>
    <!-- todo单项详情 -->
    <div class="content-scrollable list-items">
      <div v-for="(item, index) in items" :key="index">
        <item :item="item" :index="index" :id="todo.id" :init="init" :locked="todo.locked"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from '../components/item'
import { getTodo, addRecord, editTodo } from '../api/api'
export default {
  components: { item },
  data () {
    return {
      todo: {},
      items: [],
      text: '',
      isUpdate: false
    }
  },
  created () {
    this.init()
  },
  watch: {
    '$route.params.id' () {
      this.init()
    }
  },
  methods: {
    init () {
      const ID = this.$route.params.id
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked, record } = res.data.todo
        this.items = record
        this.todo = {
          id,
          title,
          count,
          locked,
          isDelete
        }
      })
    },
    onLock () {
      this.todo.locked = !this.todo.locked
      // this.updateTodo()
    },
    onAdd () {
      const ID = this.$route.params.id
      addRecord({
        id: ID,
        text: this.text
      }).then(res => {
        this.text = ''
        this.init()
      })
    },
    onDelete () {
      this.todo.isDelete = true
      this.updateTodo()
    },
    updateTodo () {
      let _this = this
      editTodo({
        todo: this.todo
      }).then(data => {
        _this.$store.dispatch('getTodo')
      })
    },
    updateTitle () {
      this.updateTodo()
      this.isUpdate = false
    }
  }
}
</script>

<style lang="less">
@import url("../common/style/todo.less");
@import url("../common/style/nav.less");
@import url("../common/style/form.less");
</style>
