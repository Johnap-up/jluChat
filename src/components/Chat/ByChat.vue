<template>
    <div class="DialogRoot ChatRoot ByChat ">
        <div class="img-wrapper pad-4 ">
            <img alt="wu" class="img " src="../../../public/jlu.webp">
        </div>
        <div class="chat-wrapper">
            <div class="chat-div div-half-1rem" v-html="newMyBubble(MyBubble)"  @click="newMyBubble(MyBubble)"></div>
            <div class="chatTime">{{chatTime(MyBubble.createdAt)}}</div>
        </div>
        <a href="javascript:" class="chat-right iconfont" @click="ShowHoverChoice($event)">&#xe611;</a>
    </div>

</template>

<script>
export default {
    name: "ByChat",
    props:["MyBubble","MyIndex"],
    data(){
        return{
            currTime:"",
        }
    },
    methods:{
        chatTime(time){
            let bbb=(""+new Date(time)).split(" ").splice(1,4);
            return bbb[0]+" "+(+bbb[1])+","+bbb[2]+" "+bbb[3].split(":").splice(0,2).join(":");
        },
        ShowHoverChoice(event){
            this.$bus.$emit("getCopyTarget",{MyBubble:this.MyBubble,MyIndex:this.MyIndex});
            let box1=document.getElementById("HoverChoice-wrapper");
            box1.style.display="inline";
            box1.style.left = event.target.offsetLeft-box1.offsetWidth/2+event.target.offsetWidth/2+"px";
            box1.style.top = event.target.offsetTop+40+"px";
        },
        newMyBubble(target){
            return this.$FormChatHtml(target.content);
        },
    },
}
</script>

<style scoped>
    .ChatRoot{
        padding-right: 96px;
    }
    .img-wrapper{
        user-select: none;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .img{
        width: 32px;
        height: 32px;
    }
    .chat-div{
        line-height: 24px;
        background-color: rgb(243,244,246);
    }
    .chatTime{
        float: right;
        padding: 2px 4px 0 0;
        color: rgb(164, 170, 181);
    }
    .chat-right{
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        font-weight: 500;
        font-size: 20px;
        margin: 8px 0 0 4px;
        color: #a8a8a8;
        visibility: hidden;
    }
    .chat-wrapper{
        max-width: 710px;
    }
    .chat-right:hover{
        color: black;
    }
    .ByChat:hover .chat-right{
        visibility: visible;
    }
</style>
