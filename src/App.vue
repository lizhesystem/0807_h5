<template>
    <div class="app-container">
        <!--顶部区域-->
        <mt-header fixed title="Vue项目"></mt-header>

        <!--中间区域-->
        <transition>
            <router-view></router-view>
        </transition>

        <!--底部区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link to="/HomeContainer" class="mui-tab-item" href="#tabbar">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/MemberContainer" class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link to="/ShopcarContainer" class="mui-tab-item" href="#tabbar-with-contact">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link to="/SearchContainer" class="mui-tab-item" href="#tabbar-with-map">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
</script>


<style scoped>
    .app-container {
        padding-top: 40px;
        overflow-x: hidden;
    }

    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }


</style>