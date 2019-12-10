import Vue from 'vue'
import {Button,Row,Col,Form,FormItem,Input,Message} from "element-ui";

//添加Element ui 的Message组件
Message.install = () =>{
    Vue.prototype.$message = Message
}

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)