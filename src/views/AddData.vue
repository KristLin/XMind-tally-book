<template>
  <div class="add-data">
    <el-card class="container">
      <h3 style="text-align: center">添加数据</h3>
      <el-form :model="inputData">
        <el-form-item>
          <el-row>
            <el-col :span="8">
              <DropdownBtn
                :itemList="catTable"
                :btnName="'分类'"
                @clickCommand="handleCommand"
              />
            </el-col>
            <el-col :span="2">
              <p></p>
            </el-col>
            <el-col :span="14"><el-button>添加分类</el-button></el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-tag :type="tagType">类型：{{ chosenCat.typeName }}</el-tag>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="inputData.amount"
            placeholder="请输入金额"
            style="width: 50%"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleBackHome">返回主页</el-button>
      <el-button type="primary" class="btn-right" @click="handleAddData"
        >添加数据</el-button
      >
    </el-card>
  </div>
</template>

<script>
import DropdownBtn from '@/components/DropdownBtn.vue'
import moment from 'moment'

export default {
  name: 'AddData',
  data () {
    return {
      inputData: {
        time: undefined,
        category: undefined,
        type: undefined,
        amount: undefined
      },
      chosenCat: {
        id: '',
        name: '',
        type: undefined,
        typeName: '---'
      },
      catTable: [],
      typeDict: { 0: '支出', 1: '收入' }
    }
  },
  computed: {
    tagType () {
      var chosenCatType = this.chosenCat.type
      if (chosenCatType === 0) {
        return 'danger'
      } else if (chosenCatType === 1) {
        return 'success'
      }
      // if chosenCatType is undefine, return 'info'
      return 'info'
    }
  },
  components: {
    DropdownBtn
  },
  methods: {
    handleBackHome () {
      this.$router.push('/')
    },
    handleAddData () {
      // 为数据补上时间和类型
      this.inputData.time = moment(new Date()).format()
      // 判断是否输入了所有项目
      for (var attr in this.inputData) {
        if (this.inputData[attr] === undefined) {
          console.log(attr)
          this.$message({
            message: '数据输入不完整，请检查',
            type: 'warning',
            duration: 1500
          })
          return 0
        }
      }

      // 将数据添加到数据集中
      this.$store.commit('addData', this.inputData)
      this.$message({
        message: '成功添加账单数据',
        type: 'success',
        duration: 1500
      })
      this.inputData = {}
      this.$router.push('/')
    },
    handleCommand (command) {
      this.chosenCat = command
      this.chosenCat.typeName = this.typeDict[command.type]
      this.inputData.category = command.id
      this.inputData.type = command.type
    }
  },
  beforeMount () {
    this.catTable = this.$store.state.catTable
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 100px auto;
  padding: 5px 20px 30px 20px;
  text-align: left;
  width: 600px;
  min-width: 300px;
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
