<template>
    <div class="product-container">
        <!--使用编程式d导航，加个点击事件传入商品的id-->
        <div @click="getDetail(item.id)" class="product-list" v-for="item in ProductInfo" :key="item.id">
            <img :src="item.img_url" alt="">
            <p class="product-name">{{ item.title }}</p>
            <div class="product-attr">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <del class="old">￥{{ item.market_price }}</del>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>

            </div>
        </div>


        <!--商品列表，不使用router-link的方式，使用编程式路由跳转-->
        <!--<router-link :to="'/HomeContainer/ProductInfo/' + item.id " class="product-list" v-for="item in ProductInfo" :key="item.id">-->
        <!--    <img :src="item.img_url" alt="">-->
        <!--    <p class="product-name">{{ item.title }}</p>-->
        <!--    <div class="product-attr">-->
        <!--        <p class="price">-->
        <!--            <span class="now">￥{{item.sell_price}}</span>-->
        <!--            <del class="old">￥{{ item.market_price }}</del>-->
        <!--        </p>-->
        <!--        <p class="sell">-->
        <!--            <span>热卖中</span>-->
        <!--            <span>剩{{ item.stock_quantity }}件</span>-->
        <!--        </p>-->

        <!--    </div>-->
        <!--</router-link>-->

        <!--点击加载更多-->
        <mt-button type="danger" size="large" @click="getMoreProduct">加载更多</mt-button>

    </div>
</template>

<script>
    import Toast from 'mint-ui'

    export default {
        data() {
            return {
                PageIndex: 1,
                ProductInfo: []
            }
        },
        methods: {
            // 获取商品列表
            getProductList() {
                this.axios.get('api/getgoods?pageindex=' + this.PageIndex).then(resource => {
                    if (resource.data.status === 0) {
                        this.ProductInfo = this.ProductInfo.concat(resource.data.message);
                    } else {
                        Toast('获取数据失败')
                    }
                })
            },
            getDetail(id) {
                // 使用JS的形式进行路由导航
                // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
                // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
                // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

                // 1. 最简单的
                // this.$router.push("/home/goodsinfo/" + id);
                // 2. 传递对象
                // this.$router.push({ path: "/home/goodsinfo/" + id });
                // 3. 传递命名的路由，这里的name就是在 router.js 中 {path:"",name:"别名",component:""}配置的name
                this.$router.push({name: "productInfo", params: {id: id}})
            },
            // 点击获取更多商品,分页+1
            getMoreProduct() {
                this.PageIndex++;
                this.getProductList();
            }
        },
        created() {
            this.getProductList()
        }
    }
</script>

<style scoped lang="scss">
    .product-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 7px;

        .product-list {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            overflow: hidden;
            text-overflow: ellipsis;

            img {
                width: 100%;
            }

            .product-name {
                font-size: 13px;
                margin: 0;
            }

            .product-attr {
                background-color: #eee;

                .price {
                    margin: 5px 0;

                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }

                    .old {
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }

                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>