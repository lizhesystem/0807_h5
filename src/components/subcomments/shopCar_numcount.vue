<template>

    <!--这个组件不能和商品详情的用一个，因为这个计数组件的数量是从vuex里拿的。-->
    <!--那个组件的数量是自己统计传给父组件的，不一样的功能-->

    <div class="mui-numbox" :class="type" data-numbox-min='1'>
        <!-- "-"按钮，点击可减小当前数值 -->
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" :value="initCount" @change="countChange" ref="numbox"  readonly/>
        <!-- "+"按钮，点击可增大当前数值 -->
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
    // 导入js
    import mui from "../../lib/mui/js/mui.min.js";

    export default {
        // 使用计数的组件需要使用mui的导入方式
        mounted() {
            mui('.mui-numbox').numbox();
        },
        methods: {
            // 每当文本框的数据被修改，vuex的数据也要变，这个组件和商品详情的数量获取方式不同，这里是vuex里获取
            countChange() {
                this.$store.commit("updateGoodsInfo", {
                    id: this.goodsid,
                    // count:initCount  这块不能直接传父组件穿过来的数量，因为如果在购物车里再点击+ -的话，这个值就不会变了
                    // 直接获取最新的value值
                    count: this.$refs.numbox.value
                })
            }
        },
        //  initCount 当前商品的数量
        //  goodsid当前商品的ID
        // type 计数栏的样式class属性
        props: ['initCount', 'goodsid', 'type']
    }
</script>

<style scoped lang="scss">

    .small {
        height: 30px;
    }

    .big {
        height: 50px;
    }
</style>