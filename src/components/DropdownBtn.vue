<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand" class="block">
      <el-button :disabled="itemList.length === 0" type="primary" class="block">
        {{
          chosenItemName
            ? '已选' + btnName + ': ' + chosenItemName
            : '请选择' + btnName
        }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-if="resetBtn" :command="''">
          {{ resetBtn }}
        </el-dropdown-item>
        <el-dropdown-item
          v-for="(item, index) in itemList"
          :key="index"
          :command="item"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'DropdownBtn',
  props: {
    itemList: Array,
    btnName: String,
    defaultCommand: String,
    resetBtn: String
  },
  data () {
    return {
      chosenItemName: this.defaultCommand
    }
  },
  methods: {
    handleCommand (command) {
      this.chosenItemName = command.name
      this.$emit('clickCommand', command)
    }
  }
}
</script>

<style lang="scss" scoped></style>
