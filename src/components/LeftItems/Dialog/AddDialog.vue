<template>
    <div class="ItemOuter" @click="AddDialog">
        <span class="iconfont AddImg">&#xe6ea;</span>
        <span class="DialogText">新建会话</span>
    </div>
</template>

<script>
import {nanoid} from "nanoid";

export default {
    name: "AddDialog",
    data(){
        return{
            ConversationList:[],
        }
    },
    computed:{
        ConList:{
            get(){return this.ConversationList},
            set(value){this.ConversationList.push(value)},
        }
    },
    methods:{
        AddDialog(value){
            if(typeof value==="string"){
                this.$bus.$emit("AddDialog", this.FormConversationItem(value));
            }else{
                this.$bus.$emit("AddDialog", this.FormConversationItem());
            }
        },
        FormConversationItem(MyId=""){
            let temp={};
            let tempTime=new Date();
            let strTime=tempTime.toLocaleTimeString();
            temp.ConversationId=MyId||nanoid();
            // console.log(temp.ConversationId,"oooooooooooooooooooooo");
            temp.createdAt=tempTime.getTime();
            temp.role="sql-assistant"
            temp.title=strTime.slice(2,strTime.length)+" "+((strTime[0]==="下")?"PM":"AM");
            temp.IsShow=true;
            return temp;
        },
    },
    mounted(){
        this.$bus.$on("EmptyConversation",(res)=>{this.AddDialog(res);});
    }
}
</script>

<style scoped>
    .ItemOuter{
        width: 90%;
        cursor: pointer;
        background-color: rgb(243, 244, 246);
        margin: 10px auto;
        height: 55px;
        box-sizing: border-box;
        text-align: center;
        line-height: 31px;
        padding: 12px 16px;
        border-radius: 10px;
        color: #969696;
        box-shadow: 0 0 2px rgba(0,0,0,0.2);
    }
    .ItemOuter:hover{
        background-color: white;
        color: black;
    }
    .DialogText{
        margin-left: 5px;
        font-weight: 500;
    }
    .AddImg{
        font-weight: 600;
    }
</style>