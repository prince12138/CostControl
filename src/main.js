import Vue from "vue";

//挂载路由
import vueRouter from "vue-router"
Vue.use(vueRouter)

//导入根组件
import App from "./App.vue"

//导入axios
import axios from "axios"
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';

// Add a request interceptor
// axios.interceptors.request.use(function(config) {
//     if (localStorage.getItem("token")) {
//         config.headers["Authorization"] = localStorage.getItem("token")
//     }
//     console.log(config)
//     return config;
// }, function(error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function(response) {
//     // Do something with response data


//     console.log("response  sucess")
//     return response;
// }, function(error) {
//     // Do something with response error
//     return Promise.reject(error);
// });

Vue.prototype.$http = axios



// vuex模块的引入
import store from "./store.js"



//导入路由
import router from "./router.js"

// 导入MUI样式表  自己去github下载去
import "./assets/mui/css/mui.css"
import "./assets/mui/css/icons-extra.css"

// 定义全局的时间过滤器
import moment from "moment"
Vue.filter("timeFormat", function(timeData, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(timeData).format(pattern)
})


// 现在是按需导入mint-ui组件。   用法：下载插件，修改.babelrc文件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


// 缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


new Vue({
    render: c => c(App),
    router,
    store
}).$mount("#app")