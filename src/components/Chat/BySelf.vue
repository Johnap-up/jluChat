<template>
    <div class="SelfRoot clearfix DialogRoot">
        <div class="userImg iconfont pad-4">&#xe657;</div>
        <div class="user-div div-half-1rem">{{MyBubble.content}}</div>
    </div>
</template>

<script>
export default {
    name: "BySelf",
    props:["MyBubble"],
}
</script>

<style scoped>
    .SelfRoot{
        flex-direction: row-reverse;
        padding-left: 96px;
    }
    .user-div{
        color:white;
        line-height: 24px;
        background-color: rgb(79, 70, 229);
        max-width: 710px;
    }
    .userImg{
        user-select: none;
        margin-left: 10px;
        width: 40px;
        font-size: 32px;
        height: 40px;
    }
</style>