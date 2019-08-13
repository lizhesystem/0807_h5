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
    export default {
        data() {
            return {
                content: [
                    {
                        id: 1,
                        title: "在关怀与自强中活出精彩人生",
                        add_time: new Date(),
                        NewsDetails: "由于各种原因，社会中还有一些困难群众。做好这部分人的民生帮扶工作，实现“弱有所扶”，是党和政府的庄严承诺。鼓励残疾人活出精彩人生，祝福下岗再就业职工日子过得更好，在农村低保户家问实情唠家常送温暖……习近平总书记始终关心困难群众的安危冷暖，鼓励他们努力创造更好生活。回访习近平总书记关心过的那些困难群众，记者注意到，他们心怀感恩之情，自强不息、奋斗拼搏。如今的他们，生活得更好、心气儿更足、获得感更多",
                        click: 1,
                        img_url: './images/title.jpg'
                    },
                    {
                        id: 2,
                        title: "中国移动获 195 新号段：新增 1 亿号码资源",
                        add_time: new Date(),
                        NewsDetails: "8 月 3 日，工业和信息化部向中国移动核配 195（0-9）号段，共计 1 亿号码资源用于发展公众移动通信业务 … 上个月中国电信获批 193 号段，截至目前，中国电信拿到 191、193 和 199，中国移动拿到 198 和 195，这样一来，中国联通在 19X 号段仅剩 2、4、6、7 可以选择 … 截止 2019 年 8 月，工业和信息化部已分配 51.13 亿码号资源用于公众移动通信业务",
                        click: 2,
                        img_url: './images/title.jpg'
                    },
                    {
                        id: 3,
                        title: "腾讯音乐第二季度营收 59 亿元，净利同比增 2.5%",
                        add_time: new Date(),
                        NewsDetails: "报告显示，腾讯音乐第二季度总营收为人民币 59.0 亿元（约合 8.59 亿美元），同比增幅为 31.0%；归属于公司股东的净利润为人民币 9.27 亿元（约合 1.35 亿美元），同比增长 2.5% … 腾讯音乐第二季度在线音乐服务的移动 MAU（月度活跃用户人数）为 6.52 亿人，同比增长 1.2%，付费用户人数为 3100 万人，同比增长 33.0%；社交娱乐服务的移动 MAU 为 2.39 亿人，同比增长 4.8%，付费用户人数为 1110 万人，同比增长 16.8%",
                        click: 3,
                        img_url: './images/title.jpg'
                    },
                    {
                        id: 4,
                        title: "美图秀秀接入华为相机底层算法",
                        add_time: new Date(),
                        NewsDetails: "据媒体报道，美图秀秀已经与华为合作，接入华为的系统级相机底层算法，提供更佳的美图秀秀相机功能体验，以进一步满足用户的专业化需求 … 值美图秀秀的手机硬件业务已经全盘卖给小米，后者专门打造了全新的小米 CC 系列，但是美图秀秀此番与华为合作，并不涉及硬件产品，也与小米无关。",
                        click: 2,
                        img_url: './images/title.jpg'
                    }
                ]
            }
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