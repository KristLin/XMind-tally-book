import echarts from 'echarts'

// 将账单数据按照账单分类(category)来归类
export function getCatGroups (billTable, catDict) {
  var catGroups = []

  for (let i = 0; i < billTable.length; i++) {
    var exist = false
    for (let j = 0; j < catGroups.length; j++) {
      if (catGroups[j].name === billTable[i].category) {
        catGroups[j].value += parseFloat(billTable[i].amount)
        exist = true
        break
      }
    }
    if (!exist) {
      catGroups.push({
        name: billTable[i].category,
        value: parseFloat(billTable[i].amount),
        type: billTable[i].type
      })
    }
  }
  // 将分类id转为name
  for (let i = 0; i < catGroups.length; i++) {
    catGroups[i].name = catDict[catGroups[i].name]
  }
  // 将分类按照金额排序
  catGroups.sort((a, b) => {
    return b.value - a.value
  })
  return catGroups
}

// 返回数据图例名称legends
export function getLegends (catGroups) {
  var legends = []
  for (let i = 0; i < catGroups.length; i++) {
    legends.push(catGroups[i].name)
  }
  return legends
}

// 返回数据分类的占比字典
export function getPerDict (catGroups) {
  // 计算所选取数据的金额总额
  var sum = 0.0
  for (let i = 0; i < catGroups.length; i++) {
    sum += catGroups[i].value
  }
  // 将分类和其所对应的占比存入到字典中
  var perDict = {}
  for (let i = 0; i < catGroups.length; i++) {
    perDict[catGroups[i].name] = (100 * catGroups[i].value) / sum
  }
  return perDict
}

// 生成 echart 对象
export function drawPieChart (elementId, data, legends, perDict) {
  var echartFig = echarts.init(
    document.getElementById(elementId),
    'light'
  )
  echartFig.setOption({
    tooltip: {
      trigger: 'item'
    },
    // 展示图例
    legend: {
      x: 'right',
      y: 'top',
      orient: 'vertical',
      data: legends,
      formatter: function (name) {
        return name + ': ' + perDict[name].toFixed(2) + '%'
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
        data: data
      }
    ]
  })
  return echartFig
}
