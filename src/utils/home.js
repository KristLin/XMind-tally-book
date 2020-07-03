// 所要求的时间格式使用Date处理较为繁琐，这里直接引入moment
import moment from 'moment'

// 解析账单CSV
export function parseDataCSV (itemList) {
  var csv = itemList
  for (let i = 0; i < csv.length; i++) {
    // 转为整型
    csv[i].type = parseInt(csv[i].type)
    // 转为浮点型并保留两位小数
    csv[i].amount = parseFloat(csv[i].amount).toFixed(2)
    // 将时间由毫秒数转化为Date 的 ISO8601 格式
    csv[i].time = moment(parseInt(csv[i].time)).format()
  }
  return csv
}

// 解析分类CSV
export function parseCatCSV (itemList) {
  var csv = itemList
  for (let i = 0; i < csv.length; i++) {
    // 转为整型
    csv[i].type = parseInt(csv[i].type)
  }
  return csv
}

// 提取月份数据
// 由于自定义组件UploadBtn需要应对更复杂内容的展示，所以返回对象的数组
// 其中对象必须有个属性name用来存放需要展示的内容，这里month对象存的即月份
export function getMonths (dataTable) {
  var monthList = []
  for (let i = 0; i < dataTable.length; i++) {
    var month = dataTable[i].time.slice(0, 7)
    if (!monthList.includes(month)) {
      monthList.push(month)
    }
  }
  var monthObjList = []
  for (let i = 0; i < monthList.length; i++) {
    monthObjList.push({ name: monthList[i] })
  }
  return monthObjList
}

// 获取账单分类字典
export function getCatDict (catTable) {
  var catDict = {}
  for (let i = 0; i < catTable.length; i++) {
    catDict[catTable[i].id] = catTable[i].name
  }
  return catDict
}

// 转换账单的显示：账单类型 及 账单分类
// 显示账单类型为名称
export function changeTypeDisplay (dataTable, typeDict) {
  for (let i = 0; i < dataTable.length; i++) {
    dataTable[i].type = typeDict[dataTable[i].type]
  }
  return dataTable
}
// 显示账单分类为名称
export function changeCatDisplay (dataTable, catDict) {
  if (catDict.length === 0) {
    return dataTable
  }
  for (let i = 0; i < dataTable.length; i++) {
    dataTable[i].category = catDict[dataTable[i].category]
  }
  return dataTable
}

// 根据所选月份过滤数据集
export function filterByMonth (dataTable, chosenMonth) {
  var result = dataTable.filter(item => {
    if (item.time.startsWith(chosenMonth)) {
      return item
    }
  })
  return result
}

// 计算总支出和总收入
export function calSummary (dataTable, chosenMonth) {
  var summary = {
    expense: 0.0,
    income: 0.0
  }
  if (dataTable.length > 0) {
    var usedTable = dataTable
    if (chosenMonth) {
      usedTable = filterByMonth(dataTable, chosenMonth)
    }
    for (let i = 0; i < usedTable.length; i++) {
      if (usedTable[i].type === 0) {
        summary.expense += parseFloat(usedTable[i].amount)
      } else if (usedTable[i].type === 1) {
        summary.income += parseFloat(usedTable[i].amount)
      }
    }
    // 保留两位小数
    summary.expense = summary.expense.toFixed(2)
    summary.income = summary.income.toFixed(2)
    return summary
  } else {
    return summary
  }
}
