<template>
  <div class="header-div">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/about">使用说明</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    handleSelect (index) {
      if (this.activeIndex !== index) {
        this.activeIndex = index
        this.$router.push(index)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
