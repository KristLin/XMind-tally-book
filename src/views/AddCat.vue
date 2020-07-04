<template>
  <div class="add-cat">
    <el-card class="container">
      <el-form :model="inputCat" class="input-form">
        <el-form-item>
          <el-input v-model="inputCat.id" placeholder="请输入ID"> </el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="inputCat.name" placeholder="请输入名称">
          </el-input>
        </el-form-item>

        <el-form-item>
          <DropdownBtn
            :itemList="typeList"
            :btnName="'类型'"
            @clickCommand="handleCommand"
          />
        </el-form-item>
      </el-form>

      <div class="btn-group">
        <el-button
          type="primary"
          @click="handleBackAddData"
          style="margin-right:50px"
        >
          返回添加数据
        </el-button>
        <el-button type="success" @click="handleAddCat">添加分类</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import DropdownBtn from '@/components/DropdownBtn.vue'

export default {
  name: 'AddCat',
  components: {
    DropdownBtn
  },
  data () {
    return {
      inputCat: {
        id: undefined,
        name: undefined,
        type: undefined
      },
      typeList: [
        {
          name: '支出',
          value: 0
        },
        {
          name: '收入',
          value: 1
        }
      ]
    }
  },
  methods: {
    handleBackAddData () {
      this.$router.push('addData')
    },
    handleCommand (command) {
      this.inputCat.type = command.value
    },
    handleAddCat () {
      // 判断是否输入了所有项目
      var flag = true
      for (var attr in this.inputCat) {
        if (this.inputCat[attr] === undefined) {
          flag = false
          this.$message({
            message: '数据输入不完整，请检查',
            type: 'warning',
            duration: 1500
          })
          break
        }
      }
      if (flag) {
        // 将数据添加到数据集中
        this.$store.commit('addCat', this.inputCat)
        this.$message({
          message: '成功添加账单分类',
          type: 'success',
          duration: 1500
        })
        this.inputCat = {}
        this.$router.push('/')
      }
    }
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
.input-form {
  width: 60%;
  margin: 0 auto;
}
.btn-group {
  margin-top: 60px;
}
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
  .input-form {
    width: 70%;
  }
}
</style>
