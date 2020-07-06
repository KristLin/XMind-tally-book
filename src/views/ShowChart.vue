<template>
  <div class="show-chart">
    <el-card class="container">
      <div>
        <!-- 月份标题 -->
        <h3 class="month-title">{{ getMonth() }}</h3>
        <!-- 选择展示数据的类型 -->
        <el-button-group>
          <el-button type="info" size="mini" @click="showAll">全部</el-button>
          <el-button type="danger" size="mini" @click="showExpense">
            支出
          </el-button>
          <el-button type="success" size="mini" @click="showIncome">
            收入
          </el-button>
        </el-button-group>
      </div>

      <!--echarts的容器-->
      <div
        id="chart-div"
        style="width: 100%; height: 400px; margin: 0 auto;"
      ></div>

      <div class="btn-group">
        <el-button
          type="primary"
          @click="handleBackHome"
          style="margin-right:50px"
        >
          返回主页
        </el-button>
        <el-button type="success" @click="reSize">图像居中</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// import echarts from 'echarts'
import {
  getLegends,
  getPerDict,
  getCatGroups,
  drawPieChart
} from '@/utils/showChart.js'

export default {
  name: 'ShowChart',
  data () {
    return {
      // 完整数据
      chartData: [],
      // 用于展示的数据
      showData: [],
      echartFig: Object
    }
  },
  computed: {
    // 需要展示的图例名称
    legends () {
      return getLegends(this.chartData)
    },
    // 各分类的金额占比
    perDict () {
      return getPerDict(this.chartData)
    }
  },
  methods: {
    // 获取标题中的月份
    getMonth () {
      var chosenMonth = this.$store.state.chosenMonth
      if (chosenMonth) {
        return '月份: ' + chosenMonth
      } else {
        return '所有月份'
      }
    },
    // 返回主页
    handleBackHome () {
      this.$router.push('/')
    },
    // 选择展示所有数据
    showAll () {
      this.showData = this.chartData
      this.drawLine()
    },
    // 只显示支出类型
    showExpense () {
      this.showData = this.chartData.filter(item => {
        if (item.type === 0) {
          return item
        }
      })
      this.drawLine()
    },
    // 只显示收入类型
    showIncome () {
      this.showData = this.chartData.filter(item => {
        if (item.type === 1) {
          return item
        }
      })
      this.drawLine()
    },
    // 当浏览器尺寸变化时可以通过改方法将图重新定位
    reSize () {
      this.echartFig.resize()
    },
    drawLine () {
      this.echartFig = drawPieChart(
        'chart-div',
        this.showData,
        this.legends,
        this.perDict
      )
    }
  },
  beforeMount () {
    // 将账单数据按照账单分类归类
    var catGroups = getCatGroups(
      this.$store.state.billTable,
      this.$store.state.catDict
    )

    // 将归类好的数据存储到this.data中
    this.chartData = catGroups
    this.showData = catGroups
  },
  mounted () {
    // 渲染时生成echart
    this.drawLine()
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  width: 600px;
  min-width: 300px;
}
.month-title {
  margin: 0 0 10px 0;
}
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
}
</style>
