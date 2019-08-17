<template>
    <div>
        <!--这个是轮播图的组件-->
        <!--轮播图开始-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in  picList" :key="item.id">
                <!--full属性是图片是否100%的样式,isfull是传过来的数据,根据父组件传过来的isfull,来展示不同的轮播图的组件图片样式-->
                <img :src="item.img" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
        <!--轮播图结束-->
    </div>
</template>

<script>
    export default {
        props: ["picList", "isfull"]
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 200px;
        /*&:需要学习下*/
        .mint-swipe-item {
            text-align: center;
            /*&:nth-child(1) {*/
            /*    background-color: red;*/
            /*}*/

            /*&:nth-child(2) {*/
            /*    background-color: blue;*/
            /*}*/

            /*&:nth-child(3) {*/
            /*    background-color: cyan;*/
            /*}*/

            img {
                /*width: 100%;*/
                height: 100%;
            }

            .full {
                width: 100%;
            }
        }
    }
</style>