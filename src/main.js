import Vue from 'vue'
import App from './App.vue'
import {NewErrorTip,FormChatHtml} from "@/../static/js/ErrorTip.js";
import { Message, Button} from 'element-ui';
Vue.prototype.$NewErrorTip = NewErrorTip;
Vue.prototype.$FormChatHtml = FormChatHtml;
Vue.prototype.$message = Message;
Vue.use(Button);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this;
  },

}).$mount('#app')
