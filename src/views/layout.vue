<template>
  <section class="container">
    <section class="menu">
      <menus></menus>
    </section>
    <section class="content">
      <todo></todo>
    </section>
  </section>
</template>

<script>
import menus from '../components/menus'
import todo from '../components/todo'
export default {
  components: { menus, todo }
}
</script>

<style lang="less">
@import url("../common/style/layout.less");
</style>
