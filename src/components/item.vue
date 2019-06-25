<template>
  <div class="list-item editing" :class="{checked:item.checked}" v-show="!item.isDelete">
    <label class="checkbox">
      <input type="checkbox" v-model="item.checked" @change="onChange" :disabled="locked">
      <i class="fas fa-check checkbox-custom"></i>
    </label>
    <input
      type="text"
      v-model="item.text"
      placeholder="写点什么。。。"
      :disabled="item.checked||locked"
      @keyup.enter="onChange"
    >
    <a class="delete-item" v-if="item.checked&&!locked" @click="item.isDelete=true;onChange()">
      <i class="fas fa-trash icon-trash"></i>
    </a>
  </div>
</template>

<script>
import { editRecord } from '../api/api'
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: 'Hello world',
          isDelete: false
        }
      }
    },
    'index': {},
    'id': {},
    'init': {},
    'locked': {}
  },
  methods: {
    onChange () {
      editRecord({ id: this.id, record: this.item, index: this.index }).then(data => {
        this.init()
        this.$store.dispatch('getTodo')
      })
    }
  }
}
</script>

<style lang="less">
@import url("../common/style/item.less");
</style>
