<template>
    <div>
        <!--轮播图开始-->
        <!--<mt-swipe :auto="4000">-->
        <!--    <mt-swipe-item v-for="(item,index) in  picList" :key="item.id">-->
        <!--        <img :src="item.img">-->
        <!--    </mt-swipe-item>-->
        <!--</mt-swipe>-->
        <!--使用轮播图组件,加载页面还在当前页面获取数据,把轮播图的数组信息传给组件-->
        <!--由于首页的轮播图需要宽度100%的属性，在父组件传给他isfull=true,子组件根据这个值来定义:class属性是否加上宽度100%的属性值-->
        <Carousel :picList="picList" :isfull="true"></Carousel>
        <!--轮播图结束-->

        <!--九宫格开始-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">

                <router-link to="/HomeContainer/NewsLists">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/HomeContainer/PhotoList">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/HomeContainer/ProductList">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
        <!--九宫格结束-->
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import Carousel from "../subcomments/Carousel.vue";

    export default {
        data() {
            return {
                picList: []
            }
        },
        components: {
            Carousel
        },
        methods: {
            getPicList() {
                this.axios.get('api/getlunbo').then(resource => {
                    if (resource.data.status === 0) {
                        this.picList = resource.data.message
                    } else {
                        // 失败的
                        Toast("加载轮播图失败。。。");
                    }

                })
            }
        },
        created() {
            this.getPicList();
        }
    }
</script>

<style scoped lang="scss">
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        display: flex;
        flex-wrap: wrap;

        img {
            width: 60px;
            height: 60px;
        }
    }

    //
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
        min-width: 33.3%;
    }
</style>