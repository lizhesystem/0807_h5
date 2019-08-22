// 导入vue
import Vue from 'vue'
// 导入根组件
import App from './App.vue'


// 因为没有数据库把这个数据先放到本地存储里，每次进入网站肯定会调用main.js,把数据放到car里
// localStorage.getItem获取key是car的数据，转换为一个对象，默认是字符串。
// JSON.parse方法用来解析JSON字符串。
let car = JSON.parse(localStorage.getItem('car') || '[]');

// 导入Vuex
import Vuex from 'vuex'

Vue.use(Vuex);

// 创建Vuex的store
const store = new Vuex.Store({
    state: {
        // 购物车里封装的商品需要放到这个容器里，将来支付界面还需要用到。
        car: car
    },
    mutations: {
        // 定义一个把商品加入加入car的方法--因为不能直接操作car.push不推荐。。。
        addCars(state, goodsinfo) {
            // 分析：怎么加这个商品
            // 1：直接push肯定不行，这样会导致同一个商品很多条，我们只需要数量增加就行了。
            // 2：循环这个car,如果car的id和穿过来的goodsinfo的id相等，那么直接把这个数量加上去就行，但是综合来看使用some()比价好
            // 3: some方法判断数据，匹配不上返回false,空数组直接返回false,

            let cflag = false; // 定义一个flag来判断是否匹配上了数据, 假设在购物车中，没有找到对应的商品


            // 循环这个容器，判断里面有没有同样的商品,如果有把数量给加上去
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    // 匹配上了才会变成true
                    cflag = true;
                    return true
                }
            });
            // 如果循环完毕,得到的还是false,把cflag改成true，直接push到容器里。
            if (!cflag) {
                state.car.push(goodsinfo)
            }
            // 更新完数据后,把数据放到localStorage存储里
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        // 在购物车里更改商品数量的话，需要再更新下car里商品的数据。确保数量的准确性！ goodsinfo是购物车最新的ID和数量
        updateGoodsInfo(state, goodsinfo) {
            state.car.forEach(item => {
                if (item.id === goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                }
                localStorage.setItem('car', JSON.stringify(state.car));

            })
        },
        // 删除car里商品的的方法，传过来的ID是商品ID，循环car数组,如果有相等的。直接通过索引的方式splice掉
        // obj.splice(n,1)     指定位置删除元素，n代表当前元素的索引
        removeGoodsCar(state,id) {
            state.car.some((item, i) => {
                if (item.id === id) {
                    state.car.splice(i, 1);
                    return true;
                }
            });
            // 更新完毕后重新把数据放到本地存储里，这里会覆盖
            localStorage.setItem('car', JSON.stringify(state.car));

        }
    },
    getters: {
        // 计算所有的购物车的数量,返回给你数量。。在App页面购物车徽标处调用
        // 获取属性，也相当于过滤器filters,也相当于计算属性,
        getAllCount(state) {
            let num = 0;
            state.car.forEach(item => {
                num += item.count
            });
            return num
        },
        // 创建{ 81:23,82:2,83:4} 这样的id和数量对于关系的对象。
        getGoodsCount(state) {
            let val = {};
            state.car.forEach(item => {
                val[item.id] = parseInt(item.count)
            });
            return val;
        }
    }
});


// 导入路由
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 导入axios,axios不是一个插件所以不能Vue.use使用，vue-axios是个插件。
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
// axios公共基路径，以后所有的请求都会在前面加上这个路径
axios.defaults.baseURL = "http://www.liulongbin.top:3005";
// 设置表单提交方式，默认是 json
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求超时时间
// axios.defaults.timeout=5000;


// 导入缩略图插件
import VuePreview from 'vue-preview'

Vue.use(VuePreview);

// 导入Vue的组件
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
import Mint from 'mint-ui';

Vue.use(Mint);
import 'mint-ui/lib/style.css'

// 下面是按需加载，因为要用到懒加载,所以直接导入全部。
// import {Header, Button, Swipe, SwipeItem, Lazyload} from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);

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
    router: routerObj,
    // 记得把store挂到vue对象里!!! 要不然会提示$store是个未定义名称，，
    store: store
});


