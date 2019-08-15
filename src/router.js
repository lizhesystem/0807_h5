// 导入VueRoute路由组件
import VueRouter from 'vue-router'


// 导入各个组件
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";
// 新闻组件
import NewsLists from "./components/news/NewsLists.vue";
import NewsInfo from "./components/news/NewsInfo.vue";

// 图片分享
import PhotoList from "./components/photos/PhotoList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";

// 创建路由对象
let routerObj = new VueRouter({
    routes: [
        {path: '/', redirect: '/HomeContainer'},
        {path: '/HomeContainer', component: HomeContainer},
        {path: '/MemberContainer', component: MemberContainer},
        {path: '/ShopcarContainer', component: ShopcarContainer},
        {path: '/SearchContainer', component: SearchContainer},
        {path: '/HomeContainer/NewsLists', component: NewsLists},
        {path: '/HomeContainer/NewsInfo/:id', component: NewsInfo},
        {path: '/HomeContainer/PhotoList', component: PhotoList},
        {path: '/HomeContainer/PhotoInfo/:id', component: PhotoInfo},
    ],
    linkActiveClass: 'mui-active'
});
// 把routerObj对象暴漏出去。main.js导入这个数据
export default routerObj