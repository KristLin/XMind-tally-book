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
import echarts from 'echarts'

export default {
  name: 'ShowChart',
  data () {
    return {
      // 用于展示的数据
      chartData: [],
      // 完整数据
      showData: [],
      echartFig: Object
    }
  },
  computed: {
    // 从所选取的数据中获取需要展示的图例
    legends () {
      var result = []
      for (let i = 0; i < this.showData.length; i++) {
        result.push(this.showData[i].name)
      }
      return result
    },
    perDict () {
      // 计算所选取数据的金额总额
      var sum = 0.0
      for (let i = 0; i < this.showData.length; i++) {
        sum += this.showData[i].value
      }
      // 将分类和其所对应的占比存入到字典中
      var result = {}
      for (let i = 0; i < this.showData.length; i++) {
        result[this.showData[i].name] = (100 * this.showData[i].value) / sum
      }
      return result
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
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      this.echartFig = echarts.init(
        document.getElementById('chart-div'),
        'light'
      )
      // 绘制图表
      this.echartFig.setOption({
        tooltip: {
          trigger: 'item'
        },
        // 展示图例
        legend: {
          x: 'right',
          y: 'top',
          orient: 'vertical',
          data: _this.legends,
          formatter: function (name) {
            return name + ': ' + _this.perDict[name].toFixed(2) + '%'
          }
        },
        // 图表参数
        series: [
          {
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['20px%', '100px'],
            clockwise: true,
            avoidLabelOverlap: true,
            // 是否展示标签
            label: {
              show: false,
              position: 'outside',
              formatter: '{b}：{d}%\n'
            },
            // 需要展示的数据
            data: this.showData
          }
        ]
      })
    }
  },
  beforeMount () {
    // 将账单数据按照账单分类(category)来归类
    var chartData = []
    var dataTable = this.$store.state.dataTable

    for (let i = 0; i < dataTable.length; i++) {
      var exist = false
      for (let j = 0; j < chartData.length; j++) {
        if (chartData[j].name === dataTable[i].category) {
          chartData[j].value += parseFloat(dataTable[i].amount)
          exist = true
          break
        }
      }
      if (!exist) {
        chartData.push({
          name: dataTable[i].category,
          value: parseFloat(dataTable[i].amount),
          type: dataTable[i].type
        })
      }
    }
    for (let i = 0; i < chartData.length; i++) {
      chartData[i].name = this.$store.state.catDict[chartData[i].name]
    }
    chartData.sort((a, b) => {
      return b.value - a.value
    })

    // 将归类好的数据存储到this.data中
    this.chartData = chartData
    this.showData = chartData
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
