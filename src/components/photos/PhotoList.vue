<template>
    <div >
        <!-- 分类列表 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" 
                       v-for="item in categoryList" :key="item.id" @click="getImgListById(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
		</div>

        <!-- 图片懒加载 -->
        <ul class="imgList">
            <router-link v-for="item in imgList" 
            :key="item.id" 
            :to="'/home/photoinfo/'+item.id"
            tag="li">
                <img v-lazy="item.img_url">

                <div class="info">
                    <div class="title">{{item.title}}</div>
                    <div class="content">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
import mui from "../../assets/mui/js/mui.min.js"

export default {
    data(){
        return {
            categoryList:[],
            imgList:[]
        }
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        this.getAllCategory()
        this.getImgListById(0)
    },
    methods:{
        getAllCategory(){
            this.$http.get("api/getimgcategory").then(res=>{
                if(res.data.status==0){
                    this.categoryList = res.data.message;
                    this.categoryList.unshift({id:0,title:"全部"})
                }
            })
        },


        getImgListById(cateId){
            this.$http.get("api/getimages/"+cateId).then(res=>{
                if(res.data.status==0){
                    this.imgList = res.data.message
                }
            })
        }
    }

}
</script>

<style lang="less" scoped>
  *{
      touch-action:pan-y;
  }

  .imgList{
      list-style: none;
      margin:0;
      padding: 8px;
      text-align: center;
      li{  
          margin-bottom:8px;
          box-shadow: 0 0 9px #999;
          position: relative;
          img{
              width: 100%;
              display: block;
          }
          img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
          }

          >.info{
              color:white;
              position: absolute;
              bottom: 0;
              text-align: left;
              background-color: rgba(0,0,0,.3);
              max-height: 85px;
              .title{
                  font-size: 14px;
              }
              .content{
                  font-size: 13px;
              }
          }
      }
  }

</style>


