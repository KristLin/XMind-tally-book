<template>
  <div class="add-data">
    <el-card class="container">
      <h3 style="text-align: center">添加数据页</h3>
      <el-form :model="inputData">
        <el-form-item>
          <el-button>选择分类</el-button>
          <el-button>添加分类</el-button>
        </el-form-item>

        <el-form-item>
          <el-tag type="success">类型：收入</el-tag>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="inputData.type"
            placeholder="请输入金额"
            style="width: 50%"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="handleBackHome">返回主页</el-button>
      <el-button type="primary" class="btn-right">添加数据</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AddData',
  data () {
    return {
      inputData: {},
      chosenCat: '',
      cats: [
        {
          id: 'abcd',
          name: '教育',
          type: 0
        },
        {
          id: 'defg',
          name: '工资',
          type: 1
        }
      ]
    }
  },
  methods: {
    handleBackHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 100px auto;
  text-align: left;
  width: 600px;
  min-width: 400px;
}
.btn-left {
  margin-left: 25%;
  margin-right: 8%;
}
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
}
</style>
