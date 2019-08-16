<template>
    <div>
        <!--top左右滑动栏-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id === 0 ? 'mui-active':'']" v-for="item in TitleLists"
                       :key="item.id">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <ul class="photo-list">
            <router-link v-for="itemPic in PicLists" :key="itemPic.id" :to=" '/HomeContainer/PhotoInfo/' + itemPic.id"
                         tag="li">
                <img v-lazy="itemPic.download_url">
                <div class="info">
                    <h1>由于接口里没东西,写固定的文字啦~</h1>
                    <span>{{ itemPic.author}}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'

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
                        responce.data.message.unshift({id: 0, title:'全部'});
                        this.TitleLists = responce.data.message
                    }
                })
            },
            getImageLists(cateId){
                // 获取分类ID获取图片列表信息
                this.axios.get('/api/getimages/' + cateId).then( resource =>{

                })
            }
        },
        created() {
            this.getTitleLists();
        }
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
                text-align: center;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                width: 100%;
                color: white;

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