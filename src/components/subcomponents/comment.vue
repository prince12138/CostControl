<template>
    <div class="cmtContainer">
        <h3>发表评论</h3>
        <textarea placeholder="请发表你的观点" v-model="cmtMsg"></textarea>
        <mt-button type="primary" size="large" @click="addCmt">发表评论</mt-button>

        <!-- 评论列表 -->
        <div class="cmtList">
            <div class="cmtItem" v-for="(item,index) in commentsList" :key="item.id">
                <div class="cmtHeader">
                    第{{index+1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time | timeFormat}}
                </div>
                <div class="cmtBody">
                   {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
    
</template>

<script>
import { Toast }  from "mint-ui"

export default {
    data(){
        return {
            page:1,
            commentsList:[],
            cmtMsg:""
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.page).then(res=>{
                // console.log(res)
                if(res.data.status==0){
                    this.commentsList = this.commentsList.concat(res.data.message)
                }
            })
        },
        getMore(){
            this.page ++;
            this.getComments();
        },
        addCmt(){
            if(this.cmtMsg.trim()==''){
                return Toast("请输入评论内容")
            }

            this.$http.post("api/postcomment/"+this.id,{content:this.cmtMsg}).then(res=>{
                if(res.data.status==0){
                    var info = {user_name:"匿名用户",add_time:Date.now(),content:this.cmtMsg};

                    this.commentsList.unshift(info);

                    // console.log(this.commentsList);
                }
            })
        }
    },
    props:["id"]
}
</script>

<style lang="less" scoped>
    .cmtContainer{
        >h3{
            font-size: 18px;
            padding-top:10px;
            border-top:1px solid #ccc;
        }
        >textarea{
            height: 85px;
            font-size: 14px;
            margin-bottom:5px;
        }

        >.cmtList{
            margin:10px 0;
            .cmtItem{
                font-size: 14px;
               
                .cmtHeader{
                    background-color: #ccc;
                    line-height: 30px;
                    padding-left:10px;
                }
                .cmtBody{
                    line-height: 35px;
                    padding-left:20px;
                }
            }
        }
    }
</style>


