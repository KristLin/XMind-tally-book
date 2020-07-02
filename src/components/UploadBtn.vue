<template>
  <div class="block">
    <el-button
      size="medium"
      type="primary"
      class="block h-40"
      @click="handleUploadClick"
      >{{ btnName }}
    </el-button>
    <el-upload
      :ref="btnId + '-upload-ref'"
      accept=".csv"
      action=""
      :multiple="false"
      :limit="1"
      :on-change="hiddenUploadClick"
      :auto-upload="false"
      :show-file-list="false"
    >
      <el-button :id="'hidden-' + btnId" class="hidden"></el-button>
    </el-upload>
  </div>
</template>

<script>
import { parseCSV } from '../utils/csv'

export default {
  name: 'UploadBtn',
  props: {
    btnName: String,
    btnId: String
  },
  methods: {
    handleUploadClick () {
      document.getElementById('hidden-' + this.btnId).click()
    },
    hiddenUploadClick (file) {
      var refName = this.btnId + '-upload-ref'
      this.$refs[refName].clearFiles()
      var _this = this
      // 将文件读取为文本格式并解析
      var reader = new FileReader()
      reader.readAsText(file.raw)
      reader.onload = function () {
        _this.$emit('readed', parseCSV(this.result))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
