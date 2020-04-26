import store from './store';
import Antd from 'ant-design-vue';
import './styles/index.less';
import VJsoneditor from 'v-jsoneditor/src/index'

export default ({
  Vue,
  options,
  router,
  siteData,
}) => {
  Vue.mixin({ store })
  Vue.use(Antd)
  Vue.use(VJsoneditor)
}