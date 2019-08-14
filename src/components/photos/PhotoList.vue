<template>
    <div>
        <!--top左右滑动栏-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']" v-for="item in TitleLists"
                       :key="item.id">
                        {{ item.title_name }}
                    </a>
                </div>
            </div>
        </div>

        <ul>
            <li></li>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'



    export default {
        data() {
            return {
                TitleLists: [
                    {id: 0, title_name: '全部'},
                    {id: 1, title_name: '001'},
                    {id: 2, title_name: '002'},
                    {id: 3, title_name: '003'},
                    {id: 4, title_name: '004'},
                ],
                PicLists: []
            }
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: none;
    }
</style>