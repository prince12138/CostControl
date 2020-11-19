<template>
    <div class="photoInfoContainer">
        <h3>{{photoInfo.title}}</h3>
        <p>
            <span>发表时间:{{photoInfo.add_time | timeFormat}}</span>
            <span>点击次数: {{photoInfo.click}} 次</span>
        </p>

        <vue-preview :slides="photoThumbs" @close="handleClose"></vue-preview>

        <div class="content" v-html="photoInfo.content"></div>

        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from "../subcomponents/comment.vue"

export default {
    data(){
        return {
            id:this.$route.params.id,
            photoInfo:{},
            photoThumbs:[],
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(res=>{
                if(res.data.status==0){
                    this.photoInfo = res.data.message[0]
                }
            })
        },
        getThumbs(){
            this.$http.get("api/getthumimages/"+this.id).then(res=>{
                // console.log(res)
                if(res.data.status==0){
                    this.photoThumbs = res.data.message

                    this.photoThumbs.forEach(item=>{
                        item.msrc = item.src
                        item.w = 600;
                        item.h = 400
                    })
                }
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components:{
        "cmt-box":comment
    }
}
</script>

<style lang="less">
    .photoInfoContainer{
        padding:5px;
        >h3{
            font-size: 15px;
            color:red;
            text-align: center;
        }
        >p{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        >.content{
            font-size: 13px;
        }
    }

    .my-gallery{
        figure{
            width: 30%;
            display: inline-block;
            margin:5px;
            padding: 0;
            box-shadow: 0 0 9px #999;

            img{
                width: 100%;
                display: block;
            }
        }
        
    }

</style>


