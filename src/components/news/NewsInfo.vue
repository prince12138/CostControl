<template>
    <div class="newsInfoContainer">
        <h3>{{newsInfo.title}}</h3>
        <p>
            <span>发表时间:{{newsInfo.add_time | timeFormat}}</span>
            <span>点击次数: {{newsInfo.click}} 次</span>
        </p>

        <div class="content" v-html="newsInfo.content"></div>

        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from "../subcomponents/comment.vue"

export default {
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get("api/getnew/"+this.id).then(res=>{
                if(res.data.status==0){
                    this.newsInfo = res.data.message[0]
                }
            })
        }
    },
    components:{
        "cmt-box":comment
    }
}
</script>

<style lang="less" scoped>
    .newsInfoContainer{
        padding: 5px;
        >h3{
            text-align: center;
            font-size: 16px;
            color:red;
            margin:10px 0;
        }
        >p{
            display: flex;
            justify-content:space-between;
            color:#333;
            font-size: 14px;
            border-bottom:1px solid #ccc;
            padding:5px 0;
        }
    }
</style>


