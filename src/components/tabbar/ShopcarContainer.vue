<template>
    <div class="shopcarContainer">

        <!-- 购物车列表区域 -->
        <div class="goodsList">
            <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">¥{{item.sell_price}}</span>
                                <numbox 
                                :initcount="$store.getters.getGoodsCount[item.id]"
                                :id="item.id"></numbox>
                                <a href="" @click.prevent="del(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndamount.count}}</span> 件, 总价 <span class="red">¥{{$store.getters.getGoodsCountAndamount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue"
export default {
    data(){
        return {
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            var idArr = [];

            this.$store.state.shopcar.forEach(item=>{
                idArr.push(item.id)
            })

            if(idArr.length==0){
                return
            }
            this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(res=>{
                // console.log(res)
                if(res.data.status==0){
                    this.goodsList = res.data.message
                }
            })
        },
        del(id,index){
            this.goodsList.splice(index,1);

            this.$store.commit("delGoodsInfo",id)
        },

        selectedChange(id,val){
            this.$store.commit("updateSelected",{id,selected:val})
        }

    },

    components:{
        numbox
    }
}
</script>

<style lang="less" scoped>
    .shopcarContainer{
        .goodsList{
            .mui-card-content-inner{
                display: flex;
                justify-content: space-between;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h3{
                font-size: 13px;
                margin:10px 0;
            }
            .price{
                color:red;
                font-weight: bold;   
            }
        }

        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .red{
                color:red;
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
</style>


