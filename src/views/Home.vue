<template>
  <div class="home">
    <div class="container">
      <!-- 第一行输入 -->
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
          <el-button
            size="medium"
            type="danger"
            plain
            class="block h-40"
            :disabled="dataTable.length ? false : true"
            @click="handleExport"
          >
            导出账单
          </el-button>
        </el-col>
      </el-row>

      <!-- 第二行输入 -->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="9" class="md-10">
          <DropdownBtn
            :itemList="months"
            :btnName="'月份'"
            :defaultCommand="chosenMonth"
            @clickCommand="handleCommand"
          />
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
            :disabled="catTable.length ? false : true"
          ></el-checkbox>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button
            size="medium"
            type="success"
            class="block h-40"
            @click="handleAddData"
            >添加数据
          </el-button>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button
            size="medium"
            type="warning"
            class="block h-40"
            plain
            @click="handleClickChart"
            :disabled="dataTable.length && catTable.length ? false : true"
          >
            详细统计
          </el-button>
        </el-col>
      </el-row>

      <!-- 数据展示表格 -->
      <DataTable ref="elDataTable" :dataTable="disDataTable" />

      <!-- 总支出总收入统计 -->
      <div style="float: right">
        <el-tag type="danger" class="mr-10"
          >总支出：{{ summary.expense }}</el-tag
        >
        <el-tag type="success">总收入：{{ summary.income }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UploadBtn from '@/components/UploadBtn.vue'
import DropdownBtn from '@/components/DropdownBtn.vue'
import DataTable from '@/components/DataTable.vue'
import exportFromJSON from 'export-from-json'
import moment from 'moment'

import {
  parseDataCSV,
  parseCatCSV,
  getMonths,
  changeTypeDisplay,
  changeCatDisplay,
  filterByMonth,
  filterByKeyword,
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
      catTable: []
    }
  },
  components: {
    UploadBtn,
    DropdownBtn,
    DataTable
  },
  computed: {
    // 用于展示的数据集
    disDataTable () {
      // 这里需要用深拷贝，否则会改变原数据
      var result = JSON.parse(JSON.stringify(this.dataTable))
      if (this.displayOp.type) {
        result = changeTypeDisplay(result, this.$store.state.typeDict)
      }
      if (this.displayOp.cat) {
        result = changeCatDisplay(result, this.$store.state.catDict)
      }
      if (this.chosenMonth) {
        result = filterByMonth(result, this.chosenMonth)
      }
      if (this.keyword) {
        result = filterByKeyword(result, this.keyword)
      }
      return result
    },
    // 从账单数据中提取出来的去重月份
    months () {
      return getMonths(this.dataTable)
    },
    // 统计总开支与总收入
    summary () {
      return calSummary(this.dataTable, this.chosenMonth)
    }
  },
  methods: {
    // 处理选择月份
    handleCommand (command) {
      this.chosenMonth = command.name
      this.$store.commit('setChosenMonth', command.name)
    },
    // 处理上传的账单数据
    handleDataCSV (itemList) {
      this.dataTable = parseDataCSV(itemList)
      this.$store.commit('setDataTable', this.dataTable)
      this.$message({
        message: '成功导入账单数据',
        type: 'success',
        duration: 1500
      })
    },
    // 处理上传的分类数据
    handleCatCSV (itemList) {
      this.catTable = parseCatCSV(itemList)
      this.$store.commit('setCatTable', this.catTable)
      this.$store.commit('setCatDict', getCatDict(this.catTable))
      this.$message({
        message: '成功导入分类数据',
        type: 'success',
        duration: 1500
      })
    },
    // 跳转到添加数据页面
    handleAddData () {
      this.$router.push('addData')
    },
    // 跳转到详细统计页面
    handleClickChart () {
      this.$router.push('showChart')
    },
    // 导出数据
    handleExport () {
      const data = this.dataTable
      // 将时间转化为unix毫秒格式
      for (var idx in data) {
        data[idx].time = moment(data[idx].time).format('x')
      }
      const fileName = 'export-data'
      const exportType = 'csv'
      exportFromJSON({ data, fileName, exportType })
    }
  },
  // 渲染前，从state获取数据
  beforeMount () {
    this.dataTable = this.$store.state.dataTable
    this.catTable = this.$store.state.catTable
    this.chosenMonth = this.$store.state.chosenMonth
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 50px auto;
  text-align: center;
  width: 600px;
  min-width: 300px;
}
@media screen and (max-width: 768px) {
  .container {
    font-size: 3px;
    width: 80%;
  }
}
</style>
