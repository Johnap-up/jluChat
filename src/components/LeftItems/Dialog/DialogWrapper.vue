<template>
    <div id="DialogWrapper" class="DialogWrapper">
        <img src="../../../assets/image/chat-logo.jpg" alt="wu" class="JluLogo">
        <DialogItem
            v-for="(item,index) in ConversationList"
            :title="item.title" :itemIndex="index" :IsShow="item.IsShow" :ConversationId="item.ConversationId" :key="index"
        ></DialogItem>
        <AddDialog></AddDialog>
        <HoverDialogChoice></HoverDialogChoice>
    </div>
</template>

<script>
import DialogItem from "@/components/LeftItems/Dialog/DialogItem";
import AddDialog from "@/components/LeftItems/Dialog/AddDialog";
import HoverDialogChoice from "@/components/LeftItems/Dialog/HoverDialogChoice";

export default {
    name: "DialogWrapper",
    components:{
        DialogItem,
        AddDialog,
        HoverDialogChoice,
    },
    data(){
        return{
            ConversationList:[],
            CurrentConversation:{},
        }
    },
    computed:{
        ConList:{
            get(){return this.ConversationList},
            set(value){
                if(Array.isArray(value)){
                    this.ConversationList=value;
                }else{
                    this.ConversationList.push(value);
                }
            },
        },
        SomeItem:{//更新对话列表和当前选中对话
            get(){return this.ConversationList},
            set(value){
                if(value.OldOne!==-1&&value.OldOne<this.ConversationList.length){
                    this.ConversationList[value.OldOne].IsShow=true;
                }
                if(value.itemIndex!==-1){
                    this.ConversationList[value.itemIndex].IsShow=false;
                }
                this.CurrentConversation=value;
                console.log("1");
            },
        }
    },
    methods:{
        getLocalConversation(){
            let temp=JSON.parse(localStorage.getItem("conversation-storage"));
            if(temp){
                this.ConList=temp.conversationList;
            }
        },
        BeginChosen(){
            let temp=JSON.parse(localStorage.getItem("conversation-storage"));
            if(temp){
                this.SomeItem=temp.currentConversation;
            }
        },
    },
    mounted() {
        this.$bus.$on("AddDialog",(res)=>{
            this.ConList=res;
            let oldOne=JSON.parse(localStorage.getItem("conversation-storage"));
            let tempNum=this.ConversationList.length-1;
            let temp={
                itemIndex:tempNum,
                title:this.ConversationList[tempNum].title,
                OldOne:-1,
                ConversationId:this.ConversationList[tempNum].ConversationId,
            };
            if(oldOne){
                temp.OldOne= +oldOne.currentConversation.itemIndex;
            }
            this.SomeItem=temp;
            localStorage.setItem("conversation-storage",JSON.stringify({
                conversationList:this.ConversationList,
                currentConversation:temp,
            }));
            this.$bus.$emit("SelectedDialog",temp);
        });
        this.$bus.$on("SelectedItem",(res)=>{
            this.SomeItem=res;
            this.$bus.$emit("SelectedDialog",res);
            localStorage.setItem("conversation-storage",JSON.stringify({
                conversationList:this.ConversationList,
                currentConversation:res,
            }));
        })
        this.$bus.$on("DialogDelete",(res)=>{
            let temp={ConversationId:"-1",OldOne:-1,itemIndex:-1,title:"-1"};
            let NewItemIndex=res.itemIndex>this.CurrentConversation.itemIndex ? this.CurrentConversation.itemIndex : this.CurrentConversation.itemIndex-1;
            let NewOldOne=res.itemIndex>this.CurrentConversation.OldOne ? this.CurrentConversation.OldOne : this.CurrentConversation.OldOne-1;
            if(res.itemIndex!==this.CurrentConversation.itemIndex&&res.itemIndex!==this.CurrentConversation.OldOne){
                temp.OldOne=NewOldOne;
                temp.itemIndex=NewItemIndex;
                temp.title=this.CurrentConversation.title;
                temp.ConversationId=this.CurrentConversation.ConversationId;
            }else if(res.itemIndex===this.CurrentConversation.itemIndex&&res.itemIndex!==this.CurrentConversation.OldOne){
                temp.OldOne=NewOldOne;
            }else if(res.itemIndex!==this.CurrentConversation.itemIndex&&res.itemIndex===this.CurrentConversation.OldOne){
                temp.itemIndex=NewItemIndex;
                temp.title=this.CurrentConversation.title;
                temp.ConversationId=this.CurrentConversation.ConversationId;
            }
            this.$bus.$emit("AfterDeleteDialog",{ConversationList:this.ConversationList,MyTarget:res,NewCurrentConversation:temp});
        });
        this.$bus.$on("UpdateSelectedItemAfterDelete",(res)=>{
            this.SomeItem=res;
        });
        this.$bus.$on("ClickSave",(res)=>{//理论上是要通知所有用到conversation-storage的组件对数据进行更新的，但没多少组件用到了title
            this.ConversationList[res.itemIndex].title=res.title;
            if(res.itemIndex===this.CurrentConversation.itemIndex){ this.CurrentConversation.title=res.title; }
            localStorage.setItem("conversation-storage",JSON.stringify({conversationList:this.ConversationList,currentConversation:this.CurrentConversation}));
        });
        this.getLocalConversation();
        this.BeginChosen();
    }
}
</script>

<style scoped>
    .DialogWrapper{
        width: 80%;
        height: 100vh;
        background-color: rgb(243, 244, 246);
        overflow: auto;
    }
    .JluLogo{
        width: 90%;
        display: block;
        margin: 10px auto;
        background-color: rgb(243, 244, 246);
    }
</style>