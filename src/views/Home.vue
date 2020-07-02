<template>
  <div class="home">
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="9" class="md-10">
          <el-input
            placeholder="请输入关键词"
            prefix-icon="el-icon-search"
            v-model="keyword"
          ></el-input
        ></el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <UploadBtn
            btnName="导入分类"
            btnId="category-btn"
            @readed="handleCatCSV"
          />
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <UploadBtn
            btnName="导入账单"
            btnId="data-btn"
            @readed="handleDataCSV"
          />
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button size="medium" type="primary" class="block h-40"
            >导出账单
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="9" class="md-10">
          <el-dropdown @command="handleCommand" class="block">
            <el-button
              :disabled="dataTable.length === 0"
              type="primary"
              class="block"
            >
              {{ chosenMonth ? '已选月份： ' + chosenMonth : '请选择月份' }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(month, index) in months"
                :key="index"
                :command="month"
              >
                {{ month }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="h-40 md-10">
          <el-checkbox
            v-model="displayOp.type"
            label="类型名称"
            class="block"
          ></el-checkbox>
          <el-checkbox
            v-model="displayOp.cat"
            label="分类名称"
            class="block"
          ></el-checkbox>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button size="medium" type="primary" class="block h-40"
            >添加数据
          </el-button>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button size="medium" type="primary" class="block h-40"
            >详细统计
          </el-button>
        </el-col>
      </el-row>

      <!-- 数据展示表格 -->
      <el-table
        :data="disDataTable"
        border
        style="width: 100%"
        height="400"
        class="mt-10 md-10"
        stripe
      >
        <el-table-column
          prop="time"
          label="账单时间"
          width="200"
          sortable=""
        ></el-table-column>
        <el-table-column
          prop="type"
          label="账单类型"
          sortable=""
        ></el-table-column>
        <el-table-column
          prop="category"
          label="账单分类"
          sortable
        ></el-table-column>
        <el-table-column
          prop="amount"
          label="账单金额"
          sortable=""
        ></el-table-column>
      </el-table>
      <div style="float: right">
        <el-tag type="warning" class="mr-10"
          >总支出：{{ summary.expense }}</el-tag
        >
        <el-tag type="success">总收入：{{ summary.income }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UploadBtn from '../components/UploadBtn.vue'
import {
  parseDataCSV,
  parseCatCSV,
  getMonths,
  changeTypeDisplay,
  changeCatDisplay,
  getCatDict,
  calSummary
} from '@/utils/home'

export default {
  name: 'Home',
  data () {
    return {
      // 关键字
      keyword: '',
      // 选择的月份，格式为：yyyy-MM
      chosenMonth: '',
      // 显示选项
      displayOp: {
        type: false,
        cat: false
      },
      // 账单数据
      dataTable: [],
      // 账单分类数据
      catTable: [],
      // 账单类型字典
      typeDict: {
        0: '支出',
        1: '收入'
      }
    }
  },
  computed: {
    // 用于展示的数据集
    disDataTable () {
      // 这里需要用深拷贝，否则会改变原数据
      var result = JSON.parse(JSON.stringify(this.dataTable))
      if (this.displayOp.type) {
        result = changeTypeDisplay(result, this.typeDict)
      }
      if (this.displayOp.cat) {
        result = changeCatDisplay(result, this.catDict)
      }
      return result
    },
    // 从账单数据中提取出来的去重月份
    months () {
      return getMonths(this.dataTable)
    },
    // 从账单分类数据集提取出来的分类字典
    catDict () {
      return getCatDict(this.catTable)
    },
    // 统计总开支与总收入
    summary () {
      return calSummary(this.dataTable, this.chosenMonth)
    }
  },
  components: {
    UploadBtn
  },
  methods: {
    // 选择月份
    handleCommand (command) {
      this.chosenMonth = command
    },
    handleDataCSV (itemList) {
      console.log('reset data CSV')
      this.dataTable = parseDataCSV(itemList)
      this.$message({
        message: '成功导入账单数据',
        type: 'success',
        duration: 1500
      })
    },
    handleCatCSV (itemList) {
      this.catTable = parseCatCSV(itemList)
      this.$message({
        message: '成功导入分类数据',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 50px auto;
  text-align: center;
  width: 600px;
  min-width: 400px;
}
@media screen and (max-width: 768px) {
  .container {
    font-size: 3px;
  }
  .container {
    width: 80%;
  }
}
</style>
