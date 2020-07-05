<template>
  <div id="app">
    <Header />
    <div class="body">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: { Header, Footer }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.body {
  margin-top: 60px;
}

/* 一些常用类 */
.mt-10 {
  margin-top: 10px;
}
.mr-10 {
  margin-right: 10px;
}
.md-10 {
  margin-bottom: 10px;
}
.ml-10 {
  margin-left: 10px;
}
.block {
  display: block;
  width: 100%;
}
.h-40 {
  height: 40px;
}
.m-0 {
  margin: 0;
}
.p-0 {
  padding: 0;
}
</style>
