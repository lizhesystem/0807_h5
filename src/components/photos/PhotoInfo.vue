<template>
    <div class="photoinfo-container">
        <h3> {{ photoInfo.title}} </h3>
        <p class="subtitle">
            <span>发表时间: {{ photoInfo.add_time |timeFormat }}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>
        <hr>
        <!--缩略图展示方式不一样了,属性里需要用到图片的数组-->
        <vue-preview :slides="picList"></vue-preview>

        <!--内容区域-->
        <div class="photoinfo-content" v-html="photoInfo.content"></div>

        <!--评论组件-->
        <Comment :id="id"></Comment>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import Comment from "../subcomments/comment.vue";

    export default {
        data() {
            return {
                photoInfo: {},
                picList: [],
                id: this.$route.params.id
            }
        },
        methods: {
            // setPreview() {
            //     this.picList.forEach(img => {
            //         img.src = img.download_url;
            //         img.msrc = img.download_url;
            //         img.w = 500;//这是大图的宽
            //         img.h = 100;
            //     });
            //     return this.picList;
            // }
            getPhotoInfo() {
                this.axios.get('api/getimageInfo/' + this.id).then(responce => {
                    if (responce.data.status === 0) {
                        this.photoInfo = responce.data.message[0];
                    } else {
                        Toast('获取数据失败')
                    }
                })
            },
            setPreview() {
                this.axios.get('api/getthumimages/' + this.id).then(responce => {
                    if (responce.data.status === 0) {
                        responce.data.message.forEach(img => {
                            img.w = 500;
                            img.h = 400;
                            img.msrc = img.src;
                        });
                        this.picList = responce.data.message;
                    } else {
                        Toast('获取数据失败！')
                    }
                })
            }
        },
        created() {
            this.getPhotoInfo();
            this.setPreview();
        },
        components: {
            Comment
        }
    }
</script>

<style scoped lang="scss">
    .photoinfo-container {
        padding: 3px;

        .preview figure img {
            width: 100%;
        }

        h3 {
            color: red;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }

        .photoinfo-content{
            line-height: 20px;
            font-size: 13px;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

    }
</style>
<style lang="scss">
    .photoinfo-container {
        .my-gallery {
            display: flex;
            /*flex-wrap: wrap;*/
            justify-content: space-around;
        }

        figure {
            width: 60px;
            height: 70px;
            margin: 10px;
            box-shadow: 0 0 8px #999;

            img {
                width: 100%;
                height: 100%;
            }
        }

    }

</style>