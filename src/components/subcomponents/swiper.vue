<template>
     <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunboList" :key="item.img">
            <img :src="item.img" alt="" :class="{'full':isfull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props:["lunboList","isfull"]
}
</script>

<style lang="less" >
    .mint-swipe{
        height: 200px;
        text-align: center;
        img{
            // width: 100%;
            height: 100%;
            // display: block;
        }

        .full{
            width: 100%;
        }
    }
</style>

