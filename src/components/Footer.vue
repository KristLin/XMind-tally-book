<template>
  <div class="footer-div">
    <small>
      <a href="https://github.com/KristLin/XMind-tally-book">
        [访问项目GitHub地址]
      </a>
    </small>
    <footer>© Krist 2020.</footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer-div {
  margin-top: 100px;
}
footer {
  margin: 15px 0 30px 0;
}

// a 标签样式
// 未被访问的链接
a:link {
  color: #0e9aa7;
  text-decoration: none;
}
// 悬停
a:hover {
  color: #204051;
}
</style>
