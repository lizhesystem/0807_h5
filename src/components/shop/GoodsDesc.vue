<template>
    <!--商品详情文字描述组件-->
    <div class="GoodsDesc-container">
        <h3>{{ content.title}}</h3>
        <hr>
        <p v-html="content.content" class="info"></p>
    </div>
</template>

<script>
    import Toast from 'mint-ui'
    export default {
        data() {
            return {
                content: {}
            }
        },
        methods: {
            // 获取图文信息的方法
            getGoodsDesc() {
                this.axios.get('api/goods/getdesc/' + this.$route.params.id).then(resource => {
                    if (resource.data.status === 0) {
                        this.content = resource.data.message[0]
                    } else {
                        Toast('获取数据失败')
                    }
                })
            }
        },
        created() {
            this.getGoodsDesc()
        }
    }
</script>

<style scoped lang="scss">
    .GoodsDesc-container{
        padding: 4px;
        h3{
            font-size: 16px;
            text-align: center;
            color: #007aff;
            margin: 20px 0;
        }
        .info{
            padding: 10px;
            font-size: 15px;
            line-height: 22px;
            img{
                width: 100%;
            }
        }
    }

</style>