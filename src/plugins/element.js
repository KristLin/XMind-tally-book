import Vue from 'vue'
import {
  Button,
  ButtonGroup,
  Input,
  Form,
  FormItem,
  Table,
  TableColumn,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  CheckboxGroup,
  Upload,
  Tag,
  Message,
  Card
} from 'element-ui'

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Tag)
Vue.use(Card)

Vue.component(Message)

Vue.prototype.$message = Message
