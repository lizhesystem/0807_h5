<template>
    <div class="photoinfo-container">
        <h3> 图片内容 </h3>
        <p class="subtitle">
            <span>发表时间: 2019-08-15 16:31</span>
            <span>点击：3次</span>
        </p>
        <hr>
        <!--缩略图-->
        <div class="Thumbnail">
            <!--<img v-for="(item,index) in slide1" :src="item.download_url" height="100" @click="$preview.open(index, list)" :key="item.id" >-->
            <!--<vue-preview :slides="setPreview()" htight="100" class="preview"></vue-preview>-->
            <vue-preview :slides="setPreview()" class="preview_img"></vue-preview>
        </div>
        <!--评论组件-->

    </div>
</template>

<script>
    export default {
        data() {
            return {
                picList: [],
            }
        },
        methods: {
            setPreview() {
                this.picList.forEach(img => {
                    img.src = img.download_url;
                    img.msrc = img.download_url;
                    img.alt = img.author;
                    img.title = img.author;
                    img.w = 300;//这是大图的宽
                    img.h = 100;
                });
                return this.picList;
            }
        },
        created() {
            this.axios.get('https://picsum.photos/v2/list?page=1&limit=10').then(responce => {
                this.picList = responce.data;
            })
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
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

    }
</style>
<style lang="scss">
.photoinfo-container{
    .preview_img{
        .my-gallery{
            display: flex;
            flex-wrap: wrap;
        }
        figure {
            width: 60px;
            height: 80px;
            margin: 10px;
            box-shadow: 0 0 8px #999;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

</style>