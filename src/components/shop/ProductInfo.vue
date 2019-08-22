<template>
    <div class="productinfo-container">

        <!--轮播图区域，把轮播图抽离成一个组件-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--轮播图组件-->
                    <Carousel :picList="PicList" :isfull="false"></Carousel>
                </div>
            </div>
        </div>

        <!--购物车小球动画效果-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
        >
            <div class="ball" v-show="flag" ref="ball"></div>
        </transition>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ GoodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>￥{{ GoodsInfo.market_price }}</del>&nbsp;&nbsp;&nbsp; 抢购价：<span class="price_rmb">￥{{GoodsInfo.sell_price}}</span>
                    </p>
                    <p>购买数量：
                        <numbox :max="GoodsInfo.stock_quantity" @getCount="getCount"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addShopCar">加入购物车</mt-button>
                        <!--分析：点击加入购物车获取购买数量栏的商品数量-->
                        <!--商品数量numbox是另外一个组件，加入购物车按钮是在Productinfo页面，不在一个页面-->
                        <!--如果想拿到numbox里面的value值的话，就需要用到子组件numbox往父组件Productinfo传值-->

                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{GoodsInfo.goods_no }}</p>
                    <p>库存情况：{{ GoodsInfo.stock_quantity }}件</p>
                    <p>上架时间：{{ GoodsInfo.add_time| timeFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="GoodsTw(id)">图文介绍</mt-button>
                <mt-button type="danger" plain size="large" @click="Goodspj(id)">商品评价</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import Toast from 'mint-ui'
    import Carousel from "../subcomments/Carousel.vue";
    import numbox from '../subcomments/numcount.vue'

    export default {
        data() {
            return {
                PicList: [],
                id: this.$route.params.id,
                GoodsInfo: {},
                flag: false,
                selectCount: 1, // 保存用户选中的商品数量， 默认，认为用户买1个
            }
        },
        methods: {
            // 获取商品列表
            getPicList() {
                // 获取商品轮播图
                this.axios.get('api/getthumimages/' + this.id).then(resource => {
                    if (resource.data.status === 0) {
                        // 轮播图组件只认img属性的图,这个接口获取的是src的属性的图,需要转换下
                        resource.data.message.forEach(item => {
                            item.img = item.src
                        });
                        this.PicList = resource.data.message;
                    } else {
                        Toast('获取数据失败')
                    }
                })
            },
            // 获取商品详情信息
            getGoodsInfo() {
                this.axios.get('api/goods/getinfo/' + this.id).then(resource => {
                    if (resource.data.status === 0) {
                        this.GoodsInfo = resource.data.message[0]
                    } else {
                        Toast('获取数据失败')
                    }
                })
            },
            // 图文介绍,传入商品ID跳转路由到这个商品ID的路由的组件里
            // 编程式跳转方式
            GoodsTw(id) {
                // this.$router.push({name: 'goodsDesc', params: {id: id}})
                this.$router.push({path: '/HomeContainer/GoodsDesc/' + id})
            },
            // 商品评价,根据商品ID跳转到该商品的评价组件里--要先把评论组件写到路由里
            Goodspj(id) {
                this.$router.push({name: 'goodsComment', params: {id: id}})
            },
            // 加入购物车函数
            addShopCar() {
                // 小球动画效果的flag,点击后半场动画结束后消失
                this.flag = !this.flag;
                // 拼接出来一个商品的信息 { id:商品的id, count:加入购物车的数量,price:商品价格,selected:false(是否选择)}
                let goodsInfo = {
                    id: this.id,
                    count: this.selectCount,
                    price: this.GoodsInfo.sell_price,
                    selected: true
                };
                // 把拼接出来的信息加到调用vuex里commit方法加到store里
                this.$store.commit("addCars", goodsInfo)

            },
            // 第一个钩子函数,el参数代表要执行动画的dom对象，
            beforeEnter(el) {
                // beforeEnter表示动画入场之前，此时动画尚未开始，在这里设置动画开始之前的起始样式
                el.style.transform = "translate(0,0)"
            },
            enter(el, done) {
                // enter 表示动画开始之后的样式,这里可以设置小球完场动画之后的结束状态

                // el.offsetWidth这句话，没有实际的作用，但是，如果不写，出不来动画效果；
                // 可以认为 el.offsetWidth 会强制动画刷新
                el.offsetWidth;

                // 获取小球的坐标,使用DOM原生的方法getBoundingClientRect() 获取当前元素在页面的坐标
                // 获取小球在中间的位置
                const ballPositon = this.$refs.ball.getBoundingClientRect();
                // 获取徽标，也就是购物车的位置
                const badgePosition = document.getElementById('badge').getBoundingClientRect();
                // 得到横纵坐标的差值,徽标的高-小球的高，以徽标为准
                const x = badgePosition.left - ballPositon.left;
                const y = badgePosition.top - ballPositon.top;

                // 设置小球的运动轨迹，设置小球完成动画之后的结束状态。
                el.style.transform = ` translate(${x}px,${y}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

                // 这个done代表 afterEnter方法，也就是他是afterEnter函数的引用，不写这个方法的话小球不会隐藏。
                // 官方：当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
                done();
            },
            afterEnter(el) {
                // afterEnter：动画完成之后会调用该函数
                this.flag = !this.flag
            },

            // 父组件接收子组件穿过来的数量的方法,发现个小bug，如果直接修改值点加入购物车的时候，会超出原有的库存，所以在接收子组件传递过来的数据
            // 的时候加个判断，如果获取的值大于库存的话，让他等于库存。这样永远不会超过库存量。
            getCount(count) {
                if (count > this.GoodsInfo.stock_quantity) {
                    count = this.GoodsInfo.stock_quantity;
                    this.selectCount = count
                } else {
                    this.selectCount = count
                }


            }
        },
        components: {
            Carousel,
            numbox
        },
        created() {
            this.getPicList();
            this.getGoodsInfo()
        }
    }
</script>

<style scoped lang="scss">
    .productinfo-container {
        background-color: #eee;
        overflow: hidden;
        /*position: relative;*/

        .ball {
            width: 15px;
            height: 15px;
            position: absolute;
            background-color: #cf2d28;
            border-radius: 50%;
            top: 340px;
            left: 146px;
            z-index: 99;
        }

        .price_rmb {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }

        .mui-card-footer {
            flex-direction: column;


            .mint-button {
                margin: 10px;
            }
        }
    }
</style>