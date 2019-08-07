// 导入VueRoute路由组件
import VueRouter from 'vue-router'

// 创建路由对象
let routerObj = new VueRouter({
    routes: []
});
// 把routerObj对象暴漏出去。main.js导入这个数据
export default routerObj