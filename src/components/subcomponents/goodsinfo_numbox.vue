<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number"  @change="countChanged" ref="count"/>
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
            this.$emit("selected",this.$refs.count.value)
        }
    },
    props:["max"],

    watch:{
        max:function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }

}
</script>

<style lang="less" scoped>

</style>


