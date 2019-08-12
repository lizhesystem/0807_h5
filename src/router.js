// 导入VueRoute路由组件
import VueRouter from 'vue-router'


// 导入各个组件
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";

// 创建路由对象
let routerObj = new VueRouter({
    routes: [
        {path: '/', redirect: '/HomeContainer'},
        {path: '/HomeContainer', component: HomeContainer},
        {path: '/MemberContainer', component: MemberContainer},
        {path: '/ShopcarContainer', component: ShopcarContainer},
        {path: '/SearchContainer', component: SearchContainer}
    ],
    linkActiveClass: 'mui-active'
});
// 把routerObj对象暴漏出去。main.js导入这个数据
export default routerObj