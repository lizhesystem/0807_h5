<template>
    <div class="cmt-content">
        <h3>发表评论</h3>
        <textarea v-model="message" placeholder="请输入评论内容"></textarea>
        <!--发表评论-->
        <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
        <!--展示评论-->
        <div class="cms-comment">
            <div v-for="(item,index) in comment_content" :key="item.id">
                <p class="cmt-title">
                    <span>第{{ index + 1 }}楼&nbsp;&nbsp;&nbsp;用户:{{ item.user_name}}&nbsp;&nbsp;&nbsp;发表时间:{{ item.add_time | timeFormat}}</span>
                </p>
                <div class="cms-content">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <mt-button plain size="large">加载更多</mt-button>
    </div>

</template>

<script>
    // 导入提示框
    import {Toast} from "mint-ui"

    export default {
        data() {
            return {
                comment_content: [
                    {id: 1, user_name: '小马', add_time: new Date(), content: '内容不错'},
                    {id: 2, user_name: '张道', add_time: new Date(), content: '加油加油'},
                    {id: 3, user_name: '面对', add_time: new Date(), content: '+123123~~'},
                    {id: 4, user_name: '阿萨', add_time: new Date(), content: '来了老弟'},
                    {id: 5, user_name: '辅导', add_time: new Date(), content: '我爱吃面'},
                    {id: 6, user_name: '武器', add_time: new Date(), content: '好好吃'},
                    {id: 7, user_name: '藕粉', add_time: new Date(), content: '····1111'},
                    {id: 8, user_name: '稳定', add_time: new Date(), content: 'kokokok'},
                    {id: 9, user_name: '启动', add_time: new Date(), content: 'cccc'},
                    {id: 10, user_name: '费事', add_time: new Date(), content: '没了over'},
                ],
                message: '',
                // props:["id"] 假装有父组件传过来的值,根据这个值去请求不同的评论..

            }
        },
        methods: {
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
                    console.log(this.message.trim().length);
                    let content = {
                        id: this.comment_content.length + 1,
                        user_name: '匿名用户',
                        add_time: new Date(),
                        content: this.message
                    };
                    this.comment_content.unshift(content);
                    this.message = '';
                }

            }
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