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
export function getMonths (dataTable) {
  var monthList = []
  for (var i = 0; i < dataTable.length; i++) {
    var month = dataTable[i].time.slice(0, 7)
    if (!monthList.includes(month)) {
      monthList.push(month)
    }
  }
  return monthList
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
// 计算总支出和总收入
export function calSummary (dataTable, chosenMonth) {
  var summary = {
    expense: 0.0,
    income: 0.0
  }
  if (dataTable.length > 0) {
    var usedTable = []
    if (chosenMonth) {
      usedTable = dataTable.filter(item => {
        if (!item.time.startsWith(chosenMonth)) {
          return item
        }
      })
    } else {
      usedTable = dataTable
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
