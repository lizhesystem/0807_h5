<template>
    <div class="productinfo-container">
        <!--轮播图区域，把轮播图抽离成一个组件-->
        <Carousel :picList="PicList" :isfull="false"></Carousel>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ GoodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>￥{{ GoodsInfo.market_price }}</del>&nbsp;销售价：<span class="price_rmb">￥{{GoodsInfo.sell_price}}</span>
                    </p>
                    <p>购买数量</p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>

    </div>
</template>

<script>
    import Toast from 'mint-ui'
    import Carousel from "../subcomments/Carousel.vue";

    export default {
        data() {
            return {
                PicList: [],
                id: this.$route.params.id,
                GoodsInfo:{}
            }
        },
        methods: {
            getPicList() {
                // 获取商品轮播图
                this.axios.get('api/getthumimages/' + this.id).then(resource => {
                    if (resource.data.status === 0) {
                        // 轮播图组件只认img属性的图,这个接口获取的是src的属性的图,需要转换下
                        resource.data.message.forEach(item =>{
                            item.img = item.src
                        });
                        this.PicList =  resource.data.message;
                        console.log(this.PicList)
                    }else{
                        Toast('获取数据失败')
                    }
                })
            },
            // 获取商品详情信息
            getGoodsInfo(){
                this.axios.get('api/goods/getinfo/' + this.id).then(resource =>{
                    if(resource.data.status === 0){
                        this.GoodsInfo = resource.data.message[0]
                    }else{
                        Toast('获取数据失败')
                    }
                })
            }
        },
        components: {
            Carousel
        },
        created() {
            this.getPicList();
            this.getGoodsInfo()
        }
    }
</script>

<style scoped>

</style>