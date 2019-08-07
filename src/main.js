// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

Vue.use(VueRouter);
// 导入Vue的组件
import app from './App.vue'
import routerObj from './router.js'

// 创建vue对象
let vm = new Vue({
    el: '#app',
    data() {
        return {}
    },
    methods: {},
    render: c => c(app),
    router: routerObj
});