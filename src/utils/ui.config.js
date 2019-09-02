import Vue from 'vue'
import { Popup } from 'mint-ui';
import { Checklist } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import { Spinner } from 'mint-ui';
import { Picker } from 'mint-ui';
import { Toast } from 'mint-ui';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { MessageBox } from 'mint-ui';
import { Field } from 'mint-ui';
import { Button } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';




Vue.prototype.$message = MessageBox
Vue.prototype.$toast = Toast
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Checklist.name, Checklist)
Vue.component(Popup.name, Popup)
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner)
Vue.component(Picker.name, Picker);
Vue.component(Field.name, Field)
Vue.component(Button.name, Button);
Vue.use(InfiniteScroll);

const components = require.context('@/components/', true, /\.vue$/)
components.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = components(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
      [1]
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})