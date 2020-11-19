<template>
    <div class="goodsListContainer">
        <div class="goodsItem" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="new">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="text">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            page:1,
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            this.$http.get("api/getgoods?pageindex="+this.page).then(res=>{
                if(res.data.status==0){
                    this.goodsList = this.goodsList.concat(res.data.message)
                }
            })
        },
        
        getMore(){
            this.page++
            this.getGoodsList()
        },

        goDetail(id){

            // 编程式导航
            this.$router.push("/home/goodsinfo/"+id);

        }
    }
}
</script>

<style lang="less" scoped>
    .goodsListContainer{
        display:flex;
        flex-wrap: wrap;
        padding: 6px;
        justify-content: space-between;
        .goodsItem{
            border:1px solid #ccc;
            width: 49%;
            margin:5px 0;
            box-shadow: 0 0 8px #999;
            padding: 3px;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 255px;
            >img{
                width: 100%;
            }
            >h3{
                font-size: 14px;
            }
            >.info{
                background-color: #ddd;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .new{
                        font-size: 14px;
                        color:red;
                        font-weight: blod;
                    }
                    .old{
                        font-size: 12px;
                        margin-left:10px;
                        text-decoration: line-through;
                    }
                }
                .text{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }

            }

        }
    }
</style>


