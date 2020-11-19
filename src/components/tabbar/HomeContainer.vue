<template>
    <div>
        <!-- 轮播图组件 -->
        <swiper :lunboList="lunboList" :isfull="true"></swiper>

        <!-- 六宫格导航 -->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资询</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue"

export default {
    data(){
        return {
            lunboList:[]
        }
    },
    created(){
        this.getLunbo()
    },
    methods:{
        getLunbo(){
            this.$http.get("api/getlunbo").then((result)=>{
                // console.log(result)
                if(result.status==200&&result.data.status==0){
                    this.lunboList = result.data.message
                }

            })
        }
    },
    components:{
        swiper:swiper
    }

}
</script>

<style lang="less" scoped>
    
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        .mui-table-view-cell{
            border-right:none;
            border-bottom:none;
            img{
                width: 60px;
                height: 60px;
            }
            div{
                font-size: 13px;
            }
        }
    }
</style>


