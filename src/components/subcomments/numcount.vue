<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <!-- "-"按钮，点击可减小当前数值 -->
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" value="1" @change="countChange" ref="numbox"/>
        <!-- "+"按钮，点击可增大当前数值 -->
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
    // 导入js
    import mui from "../../lib/mui/js/mui.min.js";

    export default {
        // 使用计数的组件需要使用mui的导入方式
        mounted() {
            mui('.mui-numbox').numbox();
        },
        methods: {
            // 每当文本框的数据被修改，立即把最新的数据通过事件调用的方式传递给父组件,第二个参数是DOM获取当前的数值
            countChange() {
                this.$emit('getCount', parseInt(this.$refs.numbox.value))
            }
        },
        props: ['max'],  // 之前的思路直接把这个值赋值给最大值，但是获取的值是undfund，是因为我们使用的api获取的数据，它无法知道什么时候能获取到数据，使用watch来解决
        // 使用 watch 属性监听，来监听父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值
        watch: {
            // 使用属性监听来监听最大库存量
            max: function (newVal, oldVal) {
                // mui里设置最大值的方式

                mui(".mui-numbox").numbox().setOption("max", newVal)
            }
        }
        // computed: {  使用计算属性好像实现不行，一直提示The computed property "NumMax" is already defined as a prop.
        //     'NumMax': function () {
        //         mui(".mui-numbox").numbox().setOption("max", parseInt(this.NumMax))
        //     }
        // }
    }
</script>

<style scoped lang="scss">

</style>