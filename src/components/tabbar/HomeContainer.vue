<template>
    <div >
        <!--轮播图开始-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in  picList" :key="item.id">
                <img :src="item.url">
            </mt-swipe-item>
        </mt-swipe>
        <!--轮播图结束-->

        <!--九宫格开始-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </a></li>
        </ul>
        <!--九宫格结束-->
    </div>
</template>

<script>
    export default {
        // 这里本来是要请求服务器的数据，没有API写路径把。
        data() {
            return {
                picList: [
                    {url: './images/1.jpg', id: 1},
                    {url: './images/2.jpg', id: 2},
                    {url: './images/3.jpg', id: 3}
                ]
            }
        },
        created() {

        }
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 200px;

        /*&:需要学习下*/
        .mint-swipe-item {
            &:nth-child(1) {
                background-color: red;
            }

            &:nth-child(2) {
                background-color: blue;
            }

            &:nth-child(3) {
                background-color: cyan;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img{
            width: 60px;
            height: 60px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>