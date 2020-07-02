<template>
  <div class="home">
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="9" class="md-10">
          <el-input
            placeholder="请输入关键词"
            prefix-icon="el-icon-search"
            v-model="keyword"
          ></el-input
        ></el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button size="medium" type="primary" class="block h-40"
            >导入分类
          </el-button>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button
            size="medium"
            type="primary"
            class="block h-40"
            @click="handleUploadDataClick"
            >导入账单
          </el-button>
          <el-upload
            ref="uploadData"
            accept=".csv"
            action=""
            :multiple="false"
            :limit="1"
            :on-change="uploadDataTable"
            :auto-upload="false"
            :show-file-list="false"
          >
            <el-button id="hidden-upload-data-btn" class="hidden"></el-button>
          </el-upload>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button size="medium" type="primary" class="block h-40"
            >导出账单
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="9" class="md-10">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link block h-40 pt-10">
              {{ chosenMonth ? '已选月份： ' + chosenMonth : '请选择月份' }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(month, index) in months"
                :key="index"
                :command="month"
              >
                {{ month }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="类型名称" class="block"></el-checkbox>
            <el-checkbox label="分类名称" class="block"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button size="medium" type="primary" class="block h-40"
            >添加数据
          </el-button>
        </el-col>
        <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5" class="md-10">
          <el-button size="medium" type="primary" class="block h-40"
            >详细统计
          </el-button>
        </el-col>
      </el-row>

      <!-- 数据展示表格 -->
      <el-table
        :data="dataTable"
        border
        style="width: 100%"
        height="400"
        stripe
      >
        <el-table-column
          prop="time"
          label="账单时间"
          width="200"
        ></el-table-column>
        <el-table-column prop="type" label="账单类型"></el-table-column>
        <el-table-column prop="category" label="账单分类"></el-table-column>
        <el-table-column prop="amount" label="账单金额"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { parseDataCSV, getMonths } from '@/utils/home'

export default {
  name: 'Home',
  data () {
    return {
      keyword: '',
      chosenMonth: '',
      checkList: [],
      dataTable: [],
      typeTable: []
    }
  },
  computed: {
    months () {
      return getMonths(this.dataTable)
    }
  },
  components: {},
  methods: {
    handleCommand (command) {
      this.months = command
    },
    handleUploadDataClick () {
      document.getElementById('hidden-upload-data-btn').click()
    },
    // 处理上传账单数据
    uploadDataTable (file) {
      var _this = this
      // 将文件读取为如下文本格式：
      //    列名1,列名2,列名3
      //    数据1-1,数据1-2,数据1-3
      //    数据2-1,数据2-2,数据2-3
      var reader = new FileReader()
      reader.readAsText(file.raw)
      reader.onload = function () {
        // 解析文本格式的CSV:
        _this.dataTable = parseDataCSV(this.result)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 50px auto;
  text-align: center;
  width: 600px;
}
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
}
.hidden {
  display: none;
}
</style>
