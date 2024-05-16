<template>
    <div ref="HistoryRoot" class="HistoryRoot clearfix">
        <div id="ErrorTip-Wrapper" class="ErrorTip-Wrapper"></div>
        <div>
            <template v-for="(item,index) in Info">
                <BySelf  v-if="item.creatorRole===`user`&&item.ConversationId===SelectedDialog" :key="item.id" :MyBubble="item" class="ByChat"></BySelf>
                <ByChat  v-else-if="item.ConversationId===SelectedDialog" :key="item.id" :MyBubble="item" :MyIndex="index" class="ByChat"></ByChat>
            </template>
        </div>
        <MsgSend></MsgSend>
        <ErrorTip style="display: none"></ErrorTip>
        <HoverChoice></HoverChoice>
    </div>
</template>

<script>
import Vue from "vue";
import ByChat from "@/components/Chat/ByChat";
import BySelf from "@/components/Chat/BySelf";
import MsgSend from "@/components/MainPage/MsgSend";
import ErrorTip from "@/components/MainPage/ErrorTip";
import HoverChoice from "@/components/MainPage/HoverChoice";

export default {
    name: 'HelloWorld',
    components:{ByChat,BySelf,MsgSend,ErrorTip,HoverChoice},
    data(){
        return{
            Info:[],
            GptReply:"Loading...",
            SelectedDialog:"-1",
            ErrorTipNum:0,
        }
    },
    computed:{
        ComInfo:{
            get(){return this.Info;},
            set(value){
                if(Array.isArray(value)){
                    this.Info=[...value];
                }
                else{
                    this.Info.push(value);
                }
            }
        },
        ComGptReply:{
            get(){return this.GptReply},
            set(value){this.Info[this.Info.length-1].content=value}
        },
        ComDialog:{
            get(){return this.SelectedDialog},
            set(value){this.SelectedDialog=value}
        }
    },
    methods:{
        getLocal(){
            let temp=JSON.parse(localStorage.getItem("message-storage"));
            let temp2=JSON.parse(localStorage.getItem("conversation-storage"));
            if(temp2){
                this.SelectedDialog=temp2.currentConversation.ConversationId;
            }
            if(temp){
                this.ComInfo=temp.state.messageList;
            }else{//应该是现实首页的，但现在还没实现
                console.log("hhh");
            }
        },
        getBus(value){
            this.ComInfo=value;
        },
        getBottom(){
            window.onload=()=>{
                this.$refs.HistoryRoot.parentElement.parentElement.parentElement.scrollTo(0,document.documentElement.scrollHeight);
            }
        },
        updateGptReply(value){this.ComGptReply=value},
        LoadingTransition(res){
            let num=res.length;
            // console.log(num);
            let LastTemp=document.getElementsByClassName("ByChat");
            let LastChat=LastTemp[LastTemp.length-1];
            LastChat.getElementsByClassName("chat-right")[0].style.display="block";
            LastChat.getElementsByClassName("chatTime")[0].style.display="block";
            let temp=LastChat.querySelectorAll("div")[1].querySelectorAll("div")[0];
            temp.innerHTML="";
            let i =0,loc=this.$refs.HistoryRoot.parentElement.parentElement.parentElement,flag=1;
            let done=setInterval(()=>{
                temp.innerHTML = res.substr(0,i);
                i++;
                if(flag){
                    this.$nextTick(()=>{
                        loc.scrollTo(0,loc.scrollHeight+100);
                    })
                }
                console.log(loc.scrollHeight,loc.scrollTop,loc.clientHeight);
                if(loc.scrollHeight-loc.scrollTop-loc.clientHeight<=2){
                    flag=1;
                    console.log("pppppppppppppppppp")
                }
                else
                    flag=0;
                if(i> num){
                    this.$bus.$emit("FinishTransition","ok");
                    clearInterval(done);
                }
            },80);
        },
        NewLoadingTransition(res){
            let LastTemp=document.getElementsByClassName("ByChat");
            let LastChat=LastTemp[LastTemp.length-1];
            // LastChat.getElementsByClassName("chat-right")[0].style.display="block";
            // LastChat.getElementsByClassName("chatTime")[0].style.display="block";
            let temp=LastChat.querySelectorAll("div")[1].querySelectorAll("div")[0];
            temp.innerHTML=this.$FormChatHtml(res);
            let loc=this.$refs.HistoryRoot.parentElement.parentElement.parentElement,flag=1;
            if(loc.scrollHeight-loc.scrollTop-loc.clientHeight<=50){
                flag=1;
            }
            else
                flag=0;
            if(flag){
                this.$nextTick(()=>{
                    loc.scrollTo(0,loc.scrollHeight+100);
                })
            }
        },
        DeleteItem(id){
            this.Info.splice(id,1);
            let tempMsg=JSON.stringify({state: {messageList: this.Info},version:0});
            localStorage.setItem("message-storage",tempMsg);
            this.ComInfo=this.Info;
            this.$bus.$emit("updateLocal","ok");
        },
        MyBubble(target){
            return this.$FormChatHtml(target.content);
        },
    },
    mounted() {
        this.getLocal();
        this.getBottom();
        this.$bus.$emit("getBus",this.getBus);
        this.$bus.$emit("GptReply",this.updateGptReply);
        this.$bus.$on("Loading",(res)=>{
            this.NewLoadingTransition(res);
            // this.LoadingTransition(res);
        });
        this.$bus.$on("DeleteItem",(res)=>{
            this.DeleteItem(res.MyIndex);
        });
        this.$bus.$on("SelectedDialog",(res)=>{
            this.ComDialog=res.ConversationId;
        });
        this.$bus.$on("AfterDeleteDialog",(res)=>{
            let temp=[];
            this.Info.forEach((a)=>{
                if(a.ConversationId!==res.MyTarget.ConversationId){
                    temp.push(a);
                }
            });
            res.ConversationList.splice(res.MyTarget.itemIndex,1)
            localStorage.setItem("message-storage",JSON.stringify({state: {messageList:temp},version:0}));
            localStorage.setItem("conversation-storage",JSON.stringify({
                conversationList:res.ConversationList,
                currentConversation:res.NewCurrentConversation
            }));
            this.$bus.$emit("updateLocal","ok");
            this.$bus.$emit("UpdateSelectedItemAfterDelete",res.NewCurrentConversation);
            this.getLocal();//更新this.Info
        });
    }
}
</script>

<style scoped>
    .HistoryRoot{
        height: 100%;
        max-width: 896px;
        margin-left: calc(307.2px + 10%);
        width: calc(80% - 307.2px);
        background-color: #ffffff;
        position: relative;
    }
    .ErrorTip-Wrapper{
        position: fixed;
        left: 50%;
        max-width: 400px;
        transform: translateX(-50%);
    }
</style>
