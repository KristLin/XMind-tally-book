import { parseCSV } from './csv'
// 所要求的时间格式使用Date处理较为繁琐，这里直接引入moment
import moment from 'moment'

// 解析账单CSV
export function parseDataCSV (textCSV) {
  var csv = parseCSV(textCSV)
  console.log(csv)
  for (let i = 0; i < csv.length; i++) {
    // 将时间由毫秒数转化为Date 的 ISO8601 格式
    csv[i].time = moment(parseInt(csv[i].time)).format()
  }
  return csv
}

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
