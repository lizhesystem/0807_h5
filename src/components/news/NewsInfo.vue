<template>
    <div class="newsinfo-continer">
        <!--大标题-->
        <h1>{{ news_content.title }}</h1>
        <!--子标题-->
        <p>
            <span>发布时间：{{ news_content.add_time | timeFormat }}</span>
            <span>点击次数：{{ news_content.click}} </span>
        </p>
        <hr>
        <!--内容区域-->
        <div class="content" v-html="news_content.content"></div>

        <!--如果使用接口的话使用这个id(就是路由的id值)穿给子组件，用来根据这个值加载对应的评论,没接口就算了-->
        <Comment :id="this.id"></Comment>

    </div>
</template>

<script>
    // 导入定义的评论组件,哪里用哪里导
    import Comment from '../subcomments/comment.vue'
    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                // 获取路由地址的id,根据这个id来展示不同的数据。
                id: this.$route.params.id,
                news_content: [],
            }
        },
        methods: {
            getNewsInfo() {
                this.axios.get("api/getnew/" + this.id).then(resource => {
                    if (resource.data.status === 0) {
                        this.news_content = resource.data.message[0]
                    } else {
                        Toast('加载数据失败')
                    }
                })
            }
        },
        created() {
            this.getNewsInfo()
        },
        components: {
            Comment
        }
    }
</script>

<style scoped lang="scss">
    .newsinfo-continer {
        padding: 5px;

        h1 {
            font-size: 16px;
        }

        p {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: #226aff;
        }

        .content {
            font-size: 13px;
            text-indent: 2em;
        }
    }
</style>