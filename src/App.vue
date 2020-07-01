<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 一些常用类 */
.pt-10 {
  padding-top: 10px;
}
.md-10 {
  margin-bottom: 10px;
}
.block {
  display: block;
  width: 100%;
}
.h-40 {
  height: 40px;
}
.hidden {
  display: none;
}
</style>
