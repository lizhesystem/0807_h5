<template>
    <div class="shopcar-container">
        <!--商品列表-->
        <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <p class="title">{{ item.title }}</p>
                        <span class="price">￥{{ item.sell_price }}</span>
                        <!--这个type属性是定义子组件属性的一个参数,small对于的是一个class样式，因为无法在父组件更改子组件的样式-->
                        <!--使用传参的形式把type传给子组件,根据type的值来区分样式-->
                        <!--这个goodsid是传给计算栏商品id,它会根据ID计算当前商品的购买量是多少-->
                        <!--这个initCount是简写方式，$store.getters.getAllCount是获取目前所有商品，getAllCount方法返回的对象格式
                        是{ 81：2,82:20,83:6 } 这样的id+数量的格式，直接后面[]跟上商品ID就能到到当前商品的数量值，传给计数栏展示。
                        大体思想就是 父传子---子调用vuex方法updateGoodsInfo去更改数据  -->
                        <numbox type="small" :goodsid="item.id"
                                :initCount="$store.getters.getGoodsCount[item.id]"></numbox>
                        <span class="del" @click="remove(item.id,i)">删除</span>
                    </div>
                </div>
            </div>
        </div>
        <!--结算模块-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner account">
                    <div class="left">
                        <h4>总计(不含运费)</h4>
                        <p>已勾选商品<span>6</span>件，总价<span>￥2222</span></p>
                    </div>
                    <mt-button type="danger">结算</mt-button>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import numbox from "../subcomments/shopCar_numcount.vue";
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {
                // 购物车里的所有的商品
                goodsList: []
            }
        },
        methods: {
            // 从vuex里获取数据，再调用接口，需要id,id这样传值，获取商品购物车信息
            getGoodsList() {
                let car = [];
                this.$store.state.car.forEach(item => car.push(item.id));
                // 如果获取的数据是空的，那就直接return，不要再去调接口了
                if (car.length <= 0) {
                    return false;
                }
                this.axios.get('api/goods/getshopcarlist/' + car.join(",")).then(resource => {
                    if (resource.data.status === 0) {
                        this.goodsList = resource.data.message;
                    } else {
                        Toast('获取接口失败')
                    }
                })
            },
            // 删除的方法：先删除列表里的数据。id是商品ID用来删除vuex里数据的，
            // index是当前购物车页面的索引，是用来删除页面数据的
            remove(id, index) {
                this.goodsList.splice(index, 1);
                this.$store.commit('removeGoodsCar', id)
            }

        },
        created() {
            this.getGoodsList()
        },
        components: {
            numbox
        }

    }
</script>

<style scoped lang="scss">
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;

        .mui-card-content-inner {
            display: flex;
            justify-content: space-between; //布局为两端对齐
            align-items: center; //居中
            .title {
                font-weight: bold;
                font-size: 13px;
                color: black;
            }

            .price {
                color: red;
                font-weight: bold;
            }

            .del {
                color: #1686FF;
            }

            img {
                width: 55px;
            }
        }

        .account {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                color: red;
                font-weight: bold;
            }
        }
    }

</style>