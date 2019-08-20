<template>
    <div>
        <!--把评论组件专门写在在商品详情里的评论组件里.要不然不是父子关系,无法把值传给评论组件-->
        <comment :id="$route.params.id"></comment>
        <!--<comment :id=id></comment>-->

    </div>
</template>

<script>
    import comment from "../subcomments/comment.vue";

    export default {
        data() {
            return {
                // id: this.$route.params.id
            }
        },
        components: {
            comment
        }
    }
</script>

<style scoped>

</style>