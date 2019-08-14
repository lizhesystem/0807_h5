// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 导入Vue的组件
import App from './App.vue'
import routerObj from './router.js'

// 全局组件
// 时间过滤组件
import moment from 'moment'  // node的一个时间格式化插件
// 定义全局时间过滤的组件
Vue.filter('timeFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
});
// Vue.filter('timeFormat', function (dataStr, pattern = "") {
//     let date = new Date(dataStr);
//     // 数字类型转字符串并且补全0，padStart()第一个参数指目标字符串长度。第二个参数是需要补全的值
//     let y = date.getFullYear();
//     let m = date.getMonth().toString().padStart(2, '0');
//     let d = date.getDay().toString().padStart(2, '0');
//
//     if (pattern.toLowerCase() === 'yyyy-mm-dd') {
//         return `${y}-${m}-${d} `
//     } else {
//         let hours = date.getHours().toString().padStart(2, '0');
//         let minutes = date.getMinutes().toString().padStart(2, '0');
//         let seconds = date.getSeconds().toString().padStart(2, '0');
//         return `${y}-${m}-${d} ${hours}:${minutes}:${seconds}`
//     }
// });

// 三方组件
// 导入mint-ui组件,不建议全部导入体积太大
// 按需导入：先安装babel-plugin-component,然后在.babelrc加上官网说的配置加载css,如下
// import Mint from 'mint-ui';
// Vue.use(Mint);
import {Header, Button, Swipe, SwipeItem,Lazyload } from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);

// 导入mui的css样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


// 创建vue对象
let vm = new Vue({
    el: '#app',
    data() {
        return {}
    },
    methods: {},
    render: c => c(App),
    router: routerObj
});