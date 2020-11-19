<template>
    <div id="newsContainer">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h3>{{item.title}}</h3>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.add_time | timeFormat}}</span>
                            <span>点击次数: {{item.click}} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            newslist:[]
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get("api/getnewslist").then(result=>{
                // console.log(result)
                if(result.status==200 && result.data.status==0){
                    this.newslist = result.data.message
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>

   
    .mui-table-view{
        padding-bottom:50px;
        h3{
            font-size: 14px;
            color:#444
        }
        .mui-ellipsis{
            font-size: 12px;
            color:#226aff;
            display:flex;
            justify-content: space-between;
        }
    }
</style>


