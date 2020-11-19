<template>
    <div>
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunboList="photoList" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>¥{{goodsInfo.market_price}}</del>&nbsp;&nbsp; 销售价:<span>¥{{goodsInfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量: <numbox @selected="selectedCount" :max="goodsInfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small" >立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsInfo.goods_no}}</p>
                    <p>库存情况:{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间:{{goodsInfo.add_time | timeFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment">发表评论</mt-button>
            </div>
        </div>
        
    </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue"
import numbox from "../subcomponents/goodsinfo_numbox.vue"
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoList:[],
            goodsInfo:{},
            ballFlag:false,
            count:1
        }
    },
    created(){
        this.getGoodsPhotoList()
        this.getGoodsInfo()
    },
    methods:{
        getGoodsPhotoList(){
            this.$http.get("/api/getthumimages/"+this.id).then(res=>{
                // console.log(res)
                if(res.data.status==0){
                    this.photoList = res.data.message
                    this.photoList.forEach(item=>{
                        item.img = item.src
                    })
                }
            })
        },
        getGoodsInfo(){
            this.$http.get("api/goods/getinfo/"+this.id).then(res=>{
                // console.log(res)
                if(res.data.status==0){
                    this.goodsInfo = res.data.message[0]
                }
            })
        },
        goDesc(){
            this.$router.push("/home/goodsdesc/"+this.id)
        },
        goComment(){
            this.$router.push("/home/goodscomment/"+this.id)
        },
        addToCar(){
            this.ballFlag = !this.ballFlag;

            var info = {id:this.id,count:this.count,price:this.goodsInfo.sell_price,selected:true}

            this.$store.commit("addCar",info)

        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;

            // 获取小球与徽标的位置计算差值
            var ballPostion = this.$refs.ball.getBoundingClientRect();
            var badgePostion = document.getElementById("badge").getBoundingClientRect()
            var disX = badgePostion.left - ballPostion.left
            var disY = badgePostion.top - ballPostion.top
            
            el.style.transform = `translate(${disX}px,${disY}px)`;
            el.style.transition = "all 1s ease";

            done()

        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        selectedCount(count){

            this.count = count
            console.log("父组件："+this.count)
        }

    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="less" scoped>
    .price{
        span{
            font-size: 14px;
            color:red;
            font-weight: bold;
        }
    }

    .mui-card-footer{
        display: block;

        button{
            margin:10px 0;
        }
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 999;
        left:140px;
        top:407px;
    }
</style>

