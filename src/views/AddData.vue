<template>
  <div class="add-data">
    <el-card class="container">
      <el-form>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <DropdownBtn
                :itemList="catTable"
                :btnName="'分类'"
                @clickCommand="handleCommand"
              />
            </el-col>
            <el-col :span="12">
              <el-button type="info" plain @click="handleAddCat"
                >添加分类</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-tag :type="tagType" style="width:100px; font-size:14px">
            类型：{{ chosenCat.typeName }}
          </el-tag>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-date-picker
                v-model="inputData.time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="inputData.amount" placeholder="请输入金额">
                <template slot="append">元</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <div class="btn-group">
        <el-button
          type="primary"
          @click="handleBackHome"
          style="margin-right:50px"
        >
          返回主页
        </el-button>
        <el-button type="success" @click="handleAddData">添加数据</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import DropdownBtn from '@/components/DropdownBtn.vue'
import moment from 'moment'

export default {
  name: 'AddData',
  components: {
    DropdownBtn
  },
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
      catTable: []
    }
  },
  computed: {
    tagType () {
      if (this.chosenCat.type === 0) {
        return 'danger'
      } else if (this.chosenCat.type === 1) {
        return 'success'
      }
      return 'info'
    }
  },
  methods: {
    handleBackHome () {
      this.$router.push('/')
    },
    handleAddCat () {
      this.$router.push('addCat')
    },
    handleAddData () {
      // 判断是否输入了所有项目
      var flag = true
      for (var attr in this.inputData) {
        if (this.inputData[attr] === undefined) {
          flag = false
          this.$message({
            message: '数据输入不完整，请检查',
            type: 'warning',
            duration: 1500
          })
          break
        }
      }
      if (flag) {
        // 转换时间格式
        this.inputData.time = moment(this.inputData.time).format()
        // 将数据添加到数据集中
        this.$store.commit('addData', this.inputData)
        this.$message({
          message: '成功添加账单数据',
          type: 'success',
          duration: 1500
        })
        this.inputData = {}
        this.$router.push('/')
      }
    },
    handleCommand (command) {
      this.chosenCat = command
      this.chosenCat.typeName = this.$store.state.typeDict[command.type]
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
  margin: 0 auto;
  padding: 30px 20px;
  text-align: left;
  width: 600px;
  min-width: 300px;
}
.btn-group {
  margin-top: 60px;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
}
</style>
