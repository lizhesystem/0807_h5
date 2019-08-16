<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in content" :key="item.id">
                <!--路由地址传参,需要前面加：号，表示这个参数不是字符串-->
                <router-link :to=" '/HomeContainer/NewsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ item.add_time | timeFormat}} </span>
                            <span>点击：{{ item.click }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                content: []
            }
        },
        methods:{
            getNewsList(){
                this.axios.get('api/getnewslist').then( resource =>{
                    if(resource.data.status === 0){
                        this.content = resource.data.message
                    }else{
                        Toast('加载数据失败')
                    }
                })
            }
        },
        created() {
            this.getNewsList()
        }
    }
</script>
<style scoped lang="scss">
    .mui-table-view {
        h1 {
            font-size: 14px;
        }
        .mui-ellipsis {
            font-size: 12px;
            display: flex;
            color: #226aff;
            justify-content: space-between;
        }
    }
</style>