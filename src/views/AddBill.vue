<template>
  <div class="add-bill">
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
                v-model="inputBill.time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="inputBill.amount" placeholder="请输入金额">
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
        <el-button type="success" @click="handleAddBill">添加数据</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import DropdownBtn from '@/components/DropdownBtn.vue'
import moment from 'moment'

export default {
  name: 'AddBill',
  components: {
    DropdownBtn
  },
  data () {
    return {
      inputBill: {
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
      // 账单分类数据
      catTable: [],
      // el-date-picker的选项, 只能选过去的时间
      pickerOptions: {
        disabledDate (time) {
          // 若结尾加上 - 8.64e7 则不可选中今天
          return time.getTime() > Date.now()
        }
      }
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
    handleAddBill () {
      // 判断是否输入了所有项目
      var flag = true
      for (var attr in this.inputBill) {
        if (this.inputBill[attr] === undefined) {
          flag = false
          this.$message({
            message: '数据输入不完整，请检查',
            type: 'warning',
            duration: 1500
          })
          break
        }
      }
      // 无空缺输入
      if (flag) {
        // 若金额不是数值，提示错误
        if (isNaN(this.inputBill.amount)) {
          this.$message({
            message: '金额必须为数值',
            type: 'warning',
            duration: 1500
          })
        } else {
          // 转换时间格式
          this.inputBill.time = moment(this.inputBill.time).format()
          // 将金额转换成精确到小数点2位
          this.inputBill.amount = parseFloat(this.inputBill.amount).toFixed(2)
          // 添加数据到数据集中
          this.$store.commit('addBill', this.inputBill)
          this.$message({
            message: '成功添加账单数据',
            type: 'success',
            duration: 1500
          })
          this.inputBill = {}
          this.$router.push('/')
        }
      }
    },
    // 处理选择分类
    handleCommand (command) {
      this.chosenCat = command
      // 为分类添加类型属性：收入 或 支出
      // 方便数据的展示
      this.chosenCat.typeName = this.$store.state.typeDict[command.type]
      this.inputBill.category = command.id
      this.inputBill.type = command.type
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
