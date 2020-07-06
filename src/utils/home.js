import exportFromJSON from 'export-from-json'
// 所要求的时间格式使用Date处理较为繁琐，这里直接引入moment
import moment from 'moment'

// 解析账单CSV
export function parseBillCSV (itemList) {
  var csv = itemList
  for (let i = 0; i < csv.length; i++) {
    // 转为整型
    csv[i].type = parseInt(csv[i].type)
    // 转为浮点型并保留两位小数
    // 为何取绝对值： 由于账单数据已经有了 支出 和 收入 的分类，数值不应该有负数(应该是示例数据有误)
    csv[i].amount = parseFloat(Math.abs(csv[i].amount)).toFixed(2)
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
export function getMonths (billTable) {
  var monthList = []
  for (let i = 0; i < billTable.length; i++) {
    var month = billTable[i].time.slice(0, 7)
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

// 从账单分类数据集提取出来的分类字典
export function getCatDict (catTable) {
  var catDict = {}
  for (let i = 0; i < catTable.length; i++) {
    catDict[catTable[i].id] = catTable[i].name
  }
  return catDict
}

// 转换账单的显示：账单类型 及 账单分类
// 显示账单类型为名称
export function changeTypeDisplay (billTable, typeDict) {
  for (let i = 0; i < billTable.length; i++) {
    billTable[i].type = typeDict[billTable[i].type]
  }
  return billTable
}
// 显示账单分类为名称
export function changeCatDisplay (billTable, catDict) {
  if (catDict.length === 0) {
    return billTable
  }
  for (let i = 0; i < billTable.length; i++) {
    billTable[i].category = catDict[billTable[i].category]
  }
  return billTable
}

// 根据所选月份过滤账单
export function filterByMonth (billTable, chosenMonth) {
  var result = billTable
  if (chosenMonth) {
    result = billTable.filter(item => {
      if (item.time.startsWith(chosenMonth)) {
        return item
      }
    })
  }
  return result
}

// 根据关键字过滤账单
export function filterByKeyword (billTable, keyword) {
  var result = billTable
  if (keyword) {
    result = billTable.filter(item => {
      if (item.time.includes(keyword) || item.type.toString().includes(keyword) || item.category.includes(keyword)) {
        return item
      }
    })
  }
  return result
}

// 计算总支出和总收入
export function calSummary (billTable, chosenMonth) {
  var summary = {
    expense: 0.0,
    income: 0.0
  }
  if (billTable.length > 0) {
    var usedTable = billTable
    if (chosenMonth) {
      usedTable = filterByMonth(billTable, chosenMonth)
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

export function exportData (billTable) {
  // 这里需要用深拷贝，否则会改变原数据
  var data = JSON.parse(JSON.stringify(billTable))
  // 将时间转化为unix毫秒格式
  for (var idx in data) {
    data[idx].time = moment(data[idx].time).format('x')
  }
  const fileName = 'export-bill'
  const exportType = 'csv'
  exportFromJSON({ data, fileName, exportType })
}
