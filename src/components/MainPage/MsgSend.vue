<template>
    <div ref="MsgSend" class="MsgSendRoot-wrapper">
        <div class="MsgSendRoot">
            <textarea
                class="userQuestion"
                placeholder="请在此输入"
                v-model="MsgValue"
                ref="MyInput"
                @keydown="TextToGpt($event)"
                @input="autoHeight($event)">
            </textarea>
            <a href="javascript:" ref="btn_send" :class="btn_SelectedClass" @click="ToGpt" >&#xe666;</a>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {nanoid} from "nanoid";
export default {
    name: "MsgSend",
    data(){
        return{
            ToLocal:[],
            GptMsg:[],
            SingleItem:"",
            HistoryGptReply:"",//接收函数用，用于等待动画效果
            creatorId:["local-user","sql-assistant"],
            MsgValue:"",
            updateMyPage:"",//接收函数用
            BanTwice:1,
            btn_class:["btn_send iconfont"],
            btn_SelectedClass:"btn_send iconfont",
            CurrDialogId:"-1",
            MyDeBounce:{},
        }
    },
    methods:{
        ToGpt(){
            if(this.BanTwice&&this.MsgValue.trim()===""){
                this.MyDeBounce();
                return;
            }
            if(!this.BanTwice)
                return ;
            let conversationStorageTemp=localStorage.getItem("conversation-storage");
            if(!conversationStorageTemp||JSON.parse(conversationStorageTemp).currentConversation.itemIndex===-1){
                this.CurrDialogId=nanoid();
                console.log("EmptyConversation",this.CurrDialogId);
                this.$bus.$emit("EmptyConversation",this.CurrDialogId);
            }
            this.BanTwice=0;
            this.btn_class.push("btn_Ban");
            this.$refs.btn_send.className=this.btn_SelectedClass+" btn_Ban";
            let temp=this.FormUserItems(new Date().getTime(),this.MsgValue,0);
            this.GptMsg.push({role:temp.creatorRole,content:temp.content});
            this.GptMsg.strLength+=temp.content.length;
            this.CutGptMsg(3);
            this.updateMyPage(this.SingleItem);
            temp=this.FormUserItems(new Date().getTime(),"Loading...",1,"assistant");
            let chatTime=document.getElementsByClassName("chatTime");
            let chatRight=document.getElementsByClassName("chat-right");
            this.$nextTick(()=>{
                chatTime[chatTime.length-1].style.display="none";
                chatRight[chatRight.length-1].style.display="none";
            })
            this.updateMyPage(this.SingleItem);
            this.MsgValue="";
            this.$refs.MyInput.style.height="40px";
            this.goBottom();
            // axios({
            //     "method":"post",
            //     // "url":"https://ai.fakeopen.com/v1/chat/completions",
            //     "url":"https://api.openai.com/v1/chat/completions",
            //     "data":{
            //         "model": "gpt-3.5-turbo",
            //         "messages":this.GptMsg,
            //         "temperature": 1,
            //         // "stream": true
            //     },
            //     "headers":{
            //         // "Authorization":"Bearer pk-this-is-a-real-free-pool-token-for-everyone"
            //         "Authorization": "Bearer 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"
            //     }
            // })
            // .then((res)=>{
            //     console.log("get!!!");
            //     let ttt=res.data.choices;
            //     this.HistoryGptReply=ttt[0].message.content;
            //     this.$bus.$emit("Loading",ttt[0].message.content);
                // this.ToLocal[this.ToLocal.length-1].content=temp.content=ttt[0].message.content;
                // this.GptMsg.push({role:temp.creatorRole,content:temp.content});
                // this.GptMsg.strLength+=temp.content.length;
                // let tempMsg=JSON.stringify({state: {messageList: this.ToLocal},version:0});
                // localStorage.setItem("message-storage",tempMsg);
                // this.goBottom();
                // if(res){
                //     this.$bus.$on("FinishTransition",(res)=>{
                //         this.$nextTick(()=>{
                //             this.$refs.btn_send.className=this.btn_SelectedClass;
                //             this.BanTwice=1;
                //         })
                //     })
                // }
            // })
            fetch("https://api.openai.com/v1/chat/completions",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer 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",
                    "Accept": "text/event-stream",
                },
                body:JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages:this.GptMsg,
                        temperature: 1,
                        stream: true
                    }
                )
            })
            .then((response)=>{
                const reader = response.body.getReader();
                let buffer = '',TempLine="";
                let _global=this;
                reader.read().then(function process({ done, value }) {
                    if (done) {
                        console.log('Stream closed');
                        return TempLine;
                    }
                    buffer = new TextDecoder().decode(value);
                    let lines = buffer.split('\n');
                    lines.forEach((line) => {
                        if (line!==""&&!line.includes("[DONE]")){
                            TempLine+=JSON.parse(line.substring(5)).choices[0].delta.content||"";
                        }
                    })
                    _global.HistoryGptReply=TempLine;
                    _global.$bus.$emit("Loading", TempLine);
                    return reader.read().then(process);
                })
                .then((res)=>{
                    this.ToLocal[this.ToLocal.length-1].content=temp.content=res;
                    this.GptMsg.push({role:temp.creatorRole,content:temp.content});
                    this.GptMsg.strLength+=temp.content.length;
                    let tempMsg=JSON.stringify({state: {messageList: this.ToLocal},version:0});
                    localStorage.setItem("message-storage",tempMsg);
                    this.goBottom();
                    // this.$bus.$on("FinishTransition",(res)=>{
                    let LastTemp=document.getElementsByClassName("ByChat");
                    let LastChat=LastTemp[LastTemp.length-1];
                    LastChat.getElementsByClassName("chat-right")[0].style.display="block";
                    LastChat.getElementsByClassName("chatTime")[0].style.display="block";
                        this.$nextTick(()=>{
                            this.$refs.btn_send.className=this.btn_SelectedClass;
                            this.BanTwice=1;
                        })
                    // })
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        deBounce(wait, value){
            let Timer,AllTip=[],end=0,start=0,isFirst=true,tempArr=[0],i=-1,TempTime=0;
            return function (){
                end=start;
                start=new Date().getTime();
                if(!isFirst){
                    tempArr.push(start-end);
                }
                isFirst=false;
                AllTip.push(this.$NewErrorTip(value));
                if (Timer) clearTimeout(Timer);
                Timer = setTimeout(() => {
                    AllTip.forEach((a)=>{
                        i++;
                        TempTime+=tempArr[i];//必须放在setTimeOut外面，因为队列不同
                        setTimeout(() => {
                            a();
                        },TempTime);
                    });
                    AllTip=[];
                    i=-1;
                    TempTime=0;
                }, wait)
            }
        },
        TextToGpt(e){
            if(e.keyCode===13){
                e.preventDefault();
                    this.ToGpt();
            }
        },
        FormUserItems(createdTime,msg,num,role=""){
            let temp={};
            temp.id=nanoid();
            temp.creatorRole=role||"user";
            temp.content=msg;
            temp.createdAt= + createdTime;
            temp.creatorId=this.creatorId[num];
            let currDialog=JSON.parse(localStorage.getItem("conversation-storage"));
            if(currDialog){
                temp.ConversationId=currDialog.currentConversation.ConversationId;
            }else{
                temp.ConversationId=-1;
            }
            this.SingleItem=temp;
            this.ToLocal.push(temp);
            return temp;
        },
        getLocal(){
            let temp=JSON.parse(localStorage.getItem("message-storage"));
            let temp2=JSON.parse(localStorage.getItem("conversation-storage"));
            if(temp2){
                this.CurrDialogId=temp2.currentConversation.ConversationId;
            }
            if(temp){
                this.ToLocal=[...(temp.state.messageList)];
                this.GptMsg=[];
                this.BuildCurrGptMsg(this.CurrDialogId);
            }
        },
        BounceLocal(){
            this.MyDeBounce=this.deBounce(2000,"Please Enter a message.");
        },
        CutGptMsg(x){
            let i=0,Length=this.GptMsg.strLength,DialogLength=this.GptMsg.length;
            while (DialogLength-i>x&&(Length>=700||this.GptMsg[i].role!=="user")){
                Length-=this.GptMsg[i].content.length;
                i++;
            }
            this.GptMsg.splice(0,i);
            // console.log(this.GptMsg)
        },
        BuildCurrGptMsg(DialogId){
            let ToLocalLength=this.ToLocal.length,i,strLength=0;
            for(i=ToLocalLength-1;i>=0;i--){
                if(this.ToLocal[i].ConversationId===DialogId){
                    strLength+=this.ToLocal[i].content.length;
                    if(strLength>700){this.CutGptMsg(2); break;}
                    this.GptMsg.unshift({role:this.ToLocal[i].creatorRole, content:this.ToLocal[i].content});
                    this.GptMsg.strLength=strLength;
                }
            }
        },
        autoHeight(e){
            this.$refs.MyInput.style.height="40px";
            this.$refs.MyInput.style.height=e.target.scrollHeight+"px";
        },
        goBottom(){
            this.$nextTick(()=>{
                this.$refs.MsgSend.parentElement.parentElement.parentElement.parentElement.scrollTo(0,document.documentElement.scrollHeight);
            });
        },
    },
    mounted() {
        this.BounceLocal();
        this.getLocal();
        this.goBottom();
        this.$bus.$on("updateLocal",()=>{
            this.getLocal();
        });
        this.$bus.$on("getBus",(res)=>{
            this.updateMyPage=res;
        })
        this.$bus.$on("GptReply",(res)=>{this.HistoryGptReply=res});
        this.$bus.$on("SelectedDialog",(res)=>{
            this.CurrDialogId=res.ConversationId;
            this.GptMsg=[];
            this.BuildCurrGptMsg(this.CurrDialogId);
        });
    }
}
</script>

<style scoped>
    .MsgSendRoot-wrapper{
        height: 98px;
        width: 100%;
    }
    .MsgSendRoot{
        background-color: white;
        position: fixed;
        z-index: 20;
        bottom: 40px;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
        display: flex;
        width: calc(80% - 307.2px);
        max-width: 896px;
        box-sizing: border-box;
        padding: 8px;
        border-radius: 8px;
        align-items: center;
    }
    .userQuestion{
        max-height: 160px;
        padding: 8px;
        box-sizing: border-box;
        vertical-align: middle;
        height: 40px;
        line-height: 24px;
        width: 100%;
        border: none;
        resize: none;
        outline: none;
        font-size:16px;
    }
    .userQuestion::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    .btn_send{
        text-decoration: none;
        height: 32px;
        width: 32px;
        line-height: 32px;
        /*vertical-align: middle;*/
        text-align: center;
        border: none;
        background-color: white;
        font-size: 28px;
    }
    .btn_send:hover{
        background-color: rgb(237, 239, 243);
        border-radius: 8px;
    }
    .btn_send:active{
        color: blue;
    }
    .btn_Ban{
        cursor: url("../../assets/image/Ban2.ico"),auto;
        color: #8888f6 !important;
    }
</style>