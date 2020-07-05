<template>
  <div>
    <el-table
      id="id"
      :data="billTable"
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
        sortable
      ></el-table-column>
      <el-table-column prop="type" label="账单类型" sortable></el-table-column>
      <el-table-column
        prop="category"
        label="账单分类"
        sortable
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="账单金额"
        sortable
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BillTable',
  props: {
    billTable: Array,
    id: String
  }
}
</script>

<style lang="scss" scoped></style>
