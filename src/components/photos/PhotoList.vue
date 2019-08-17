<template>
    <div>
        <!--top左右滑动栏-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--先根据数据渲染title,然后在每个title上绑定方法并且传入分类ID，得到各个title的数据。默认0是全部数据-->
                    <!--默认是绑定了click的时间进行点击标签切换数据，但是如果使用click的话会导致无法切换请求，在mui里有一个@tap来替代click时间-->
                    <a @tap="getImageLists(item.id)" :class="['mui-control-item',item.id === 0 ? 'mui-active':'']"
                       v-for="item in TitleLists"
                       :key="item.id">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <ul class="photo-list">
            <!--每个图片的路由跳转到photoinfo.vue页面，传入图片上有的ID，根据这个ID去获取每个图片的详情+缩略图+信息-->
            <router-link v-for="itemPic in PicLists" :key="itemPic.id" :to=" '/HomeContainer/PhotoInfo/' + itemPic.id"
                         tag="li">
                <img v-lazy="itemPic.img_url">
                <div class="info">
                    <h1>{{ itemPic.title }}</h1>
                    <span>{{ itemPic.zhaiyao}}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'
    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                TitleLists: [],
                PicLists: []
            }
        },
        mounted() {
            // 左右滑动title栏的方法
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

        },
        methods: {
            getTitleLists() {
                // 获取分类信息
                this.axios.get('api/getimgcategory').then((responce) => {
                    if (responce.data.status === 0) {
                        // 自己添加一个全部的分类
                        responce.data.message.unshift({id: 0, title: '全部'});
                        this.TitleLists = responce.data.message
                    }
                })
            },
            getImageLists(cateId) {
                // 获取分类ID获取图片列表信息
                this.axios.get('/api/getimages/' + cateId).then(resource => {
                    if(resource.data.status === 0){
                        this.PicLists = resource.data.message;
                    }else{
                        Toast('获取数据失败')
                    }
                })
            }
        },
        created() {
            // data和methods都创建好了。dom还没渲染，执行获取title
            this.getTitleLists();
            // 获取title里的图片列表，传0默认
            this.getImageLists(0)
        },
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: none;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;

        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            text-overflow: ellipsis;

            img {
                width: 100%;
                vertical-align: middle;
            }

            /*懒加载样式*/
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {
                position: absolute;
                bottom: 0;
                text-align: left;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 90px;
                width: 100%;
                color: white;
                overflow: hidden;
                h1 {
                    font-size: 14px;
                }
                span {
                    font-size: 12px;
                }
            }
        }
    }
</style>