<template>
    <div class="cmt-content">
        <h3>发表评论</h3>
        <textarea v-model="message" placeholder="请输入评论内容"></textarea>
        <!--发表评论-->
        <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
        <!--展示评论-->
        <div class="cms-comment">
            <div v-for="(item,index) in comment_content" :key="item.add_time">
                <p class="cmt-title">
                    <span>第{{ comment_content.length-index }}楼&nbsp;&nbsp;&nbsp;用户:{{ item.user_name}}&nbsp;&nbsp;&nbsp;发表时间:{{ item.add_time | timeFormat}}</span>
                </p>
                <div class="cms-content">
                    {{ item.content === ''?'这个人很懒':item.content }}
                </div>
            </div>
        </div>
        <mt-button plain size="large" @click="moreComment">加载更多</mt-button>
    </div>

</template>

<script>
    // 导入提示框
    import {Toast} from "mint-ui"

    export default {
        data() {
            return {
                comment_content: [],
                message: '',
                // 默认显示第一页数据
                PageIndex: 1,
            }
        },
        props: ["id"], //父组件传过来的值,根据这个值去请求不同的评论..
        methods: {
            // 获取评论方法
            getComment() {
                // 传入新闻ID，加上接口的评论的页码。
                this.axios.get('api/getcomments/' + this.id + '?pageindex=' + this.PageIndex).then(resource => {
                    if (resource.data.status === 0) {
                        this.comment_content = this.comment_content.concat(resource.data.message)
                    } else {
                        Toast('获取数据失败')
                    }
                })
            },
            // 加载更多方法
            moreComment() {
                this.PageIndex++;
                this.getComment()
            },
            // 发表评论的方法
            sendComment() {
                // 判断评论里是否有内容,如果有次啊会去发表数据
                if (this.message.trim().length === 0) {
                    return Toast({
                        message: '评论内容不能为空!',
                        position: 'middle',
                        duration: 1000
                    });
                } else {
                    // 使用axios发post请求，一个参数content，注：因为是组件，其他地方也要用，所有请求参数取请求路由的id（this.$route.params.id）
                    // 请求成功后封装评论数据，姓名、时间、内容。放数组前面，加上当前的评论数据里。
                    this.axios.post('api/postcomment/' + this.$route.params.id, {content: this.message.trim()}).then(resource => {
                        if (resource.data.status === 0) {
                            let comment_content = {
                                user_name: '匿名用户',
                                add_time: new Date(),
                                content: this.message.trim()
                            };
                            this.comment_content.unshift(comment_content);
                            this.message = '';
                        } else {
                            Toast('提交评论失败')
                        }
                    });
                }

            }
        },
        created() {
            this.getComment()
        }
    }
</script>

<style scoped lang="scss">
    .cmt-content {
        padding: 0 4px;

        h3 {
            font-size: 18px;
        }

        textarea {
            font-size: 13px;
            margin: 0;
            height: 80px;
        }

        .cmt-title {
            margin: 5px 0;
            background-color: #ccc;
            font-size: 12px;
            color: #226aff;
        }

        .cms-content {
            text-indent: 1em;
            font-size: 13px;
        }
    }
</style>