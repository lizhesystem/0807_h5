<template>
    <div class="app-container">
        <!--顶部区域-->
        <mt-header fixed title="Vue项目">
            <div slot="left" @click="goBack">
                <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>

        <!--中间区域,定义路由加载进来的数据展示，根据router.js配置的路由把页面加载到定义的router-view里-->
        <transition>
            <router-view></router-view>
        </transition>

        <!--底部区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link to="/HomeContainer" class="mui-tab-item-llb" href="#tabbar">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/MemberContainer" class="mui-tab-item-llb" href="#tabbar-with-chat">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link to="/ShopcarContainer" class="mui-tab-item-llb" href="#tabbar-with-contact">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">0</span>
				</span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link to="/SearchContainer" class="mui-tab-item-llb" href="#tabbar-with-map">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    export default {
        methods:{
            goBack(){
                // 利用vue路由里的go对象，-1进行往前返回的跳转，
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .app-container {
        padding-top: 40px;
        padding-bottom: 46px;
        overflow-x: hidden;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
    /*// 该类名，解决 tabbar 点击无法切换的问题*/
       .mui-bar-tab .mui-tab-item-llb.mui-active {
           color: #007aff;
       }

    .mui-bar-tab .mui-tab-item-llb {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .Thumbnail img{
        width: 100px;
    }
</style>