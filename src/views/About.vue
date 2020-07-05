<template>
  <div class="about">
    <el-card class="container">
      <h3>项目说明</h3>
      <ul>
        <li>
          <p>
            本项目为
            <a href="https://github.com/xmindltd/hiring/blob/master/frontend-1">
              XMind前端招聘作业
            </a>
          </p>
        </li>
        <li>
          <p>
            <a href="https://github.com/KristLin/XMind-tally-book">
              本项目GitHub链接
            </a>
          </p>
        </li>
      </ul>

      <h3>数据格式说明(详细请查阅上方链接)</h3>
      <ul>
        <li>
          <p>账单数据</p>
          <el-table
            :data="billDataInfo"
            stripe
            style="width: 100%"
            size="mini"
            border
          >
            <el-table-column prop="propName" label="字段名称" width="80">
            </el-table-column>
            <el-table-column
              prop="propId"
              label="字段标识"
              width="80"
            ></el-table-column>
            <el-table-column prop="propType" label="字段类型" width="80">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="内容解释"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="required"
              label="是否必选"
              width="80"
            ></el-table-column>
          </el-table>
        </li>
        <li>
          <p>账单分类数据</p>
          <el-table
            :data="catDataInfo"
            stripe
            style="width: 100%"
            size="mini"
            border
          >
            <el-table-column prop="propName" label="字段名称" width="80">
            </el-table-column>
            <el-table-column prop="propId" label="字段标识" width="80">
            </el-table-column>
            <el-table-column prop="propType" label="字段类型" width="80">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="内容解释"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="required"
              label="是否必选"
              width="80"
            ></el-table-column>
          </el-table>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      billDataInfo: [
        {
          propName: '账单时间',
          propId: 'time',
          propType: 'Date',
          desc:
            '账单被创建的时间, 格式为ISO 8601标准, 示例: 2019-09-08T08:02:17+08:00',
          required: '是'
        },
        {
          propName: '账单类型',
          propId: 'type',
          propType: 'Integer',
          desc: '账单的类型该字段有且只有两种值: 1代表收入, 0代表支出',
          required: '是'
        },
        {
          propName: '账单分类',
          propId: 'category',
          propType: 'String',
          desc: '账单的详细分类',
          required: '否'
        },
        {
          propName: '账单金额',
          propId: 'amount',
          propType: 'Float',
          desc: '账单的金额。单位为人民币(￥), 精确到小数点后两位',
          required: '是'
        }
      ],
      catDataInfo: [
        {
          propName: '分类ID',
          propId: 'id',
          propType: 'String',
          desc: '分类的唯一标识符, 对应账单数据中的category字段',
          required: '是'
        },
        {
          propName: '分类名称',
          propId: 'name',
          propType: 'String',
          desc: '分类的展示名称',
          required: '是'
        },
        {
          propName: '分类类型',
          propId: 'type',
          propType: 'Integer',
          desc: '分类的类型, 与账单数据中的type字段一样: 1代表收入, 0代表支出',
          required: '是'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 30px 20px;
  text-align: left;
  width: 700px;
  min-width: 400px;
}
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
    font-size: 12px;
  }
}

// a 标签样式
// 未被访问的链接
a:link {
  color: #0e9aa7;
  text-decoration: none;
}
// 已被访问的链接
a:visited {
  color: #204051;
}
// 悬停
a:hover {
  color: #204051;
}
// 正在被点击的链接
a:active {
  color: #0f828d;
}
</style>
