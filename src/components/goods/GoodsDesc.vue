<template>
    <div class="descContainer">
        <h3>{{desc.title}}</h3>

        <hr>

        <div v-html="desc.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            desc:{}
        }
    },
    created(){
        this.getDesc()
    },
    methods:{
        getDesc(){
            this.$http.get("api/goods/getdesc/"+this.id).then(res=>{
                if(res.data.status==0){
                    this.desc = res.data.message[0]
                }
            })
        }
    }
}
</script>

<style lang="less" >
    .descContainer{
        padding:5px;
        h3{
            font-size: 14px;
            color:red;
            text-align: center;
            margin:15px 0;
        }
        img{
            width: 100%;
        }
    }
</style>


