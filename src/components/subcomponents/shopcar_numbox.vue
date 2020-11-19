<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number"  :value="initcount"
        @change="countChanged" ref="count"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../assets/mui/js/mui.min.js"
export default {
    mounted(){
        mui(".mui-numbox").numbox()
    },
    methods:{
        countChanged(){
            // this.$refs.count.value   //5

            this.$store.commit("updateGoodsInfo",{id:this.id,count:Number(this.$refs.count.value)})
        }
    },
    props:["initcount","id"]
   
}
</script>

<style lang="less" scoped>

</style>


