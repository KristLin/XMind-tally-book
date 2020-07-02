// 解析文本格式的CSV为如下格式:
// [
//  { 列名1: 数据1-1, 列名2: 数据1-2, ... },
//  { 列名1: 数据2-1, 列名2: 数据2-2, ... },
//  ...
// ]
export function parseCSV (textCSV) {
  var arr = textCSV.split('\n')
  var columns = arr[0].trim().split(',')
  var itemList = []
  for (let i = 1; i < arr.length; i++) {
    var itemAttrList = arr[i].trim().split(',')
    var item = {}
    // 将各行数据组装为Object
    for (let j = 0; j < columns.length; j++) {
      item[columns[j]] = itemAttrList[j]
    }
    itemList.push(item)
  }
  return itemList
}
