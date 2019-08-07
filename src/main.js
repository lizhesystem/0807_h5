// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 导入mint-ui组件,不建议全部导入体积太大
// 按需导入：先安装babel-plugin-component,然后在.babelrc加上官网说的配置加载css,如下
// import Mint from 'mint-ui';
// Vue.use(Mint);
import { Header,Button  } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);


Vue.use(VueRouter);
// 导入Vue的组件
import App from './App.vue'
import routerObj from './router.js'

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