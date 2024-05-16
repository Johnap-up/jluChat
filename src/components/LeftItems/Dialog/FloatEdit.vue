<template>
    <div id="FloatEditWrapper" class="FloatEditWrapper">
        <div class="FloatEdit">
            <div class="FloatEditTitle">
                <div >Edit Conversation Title</div>
                <span class="iconfont CancelItem" @click="CloseDisappear">&#xe64a;</span>
            </div>
            <input class="FloatEditInput" v-model="SelectedDialog.title">
            <div class="CSChoice clearfix">
                <div class="CloseOrSave" @click="ClickSave">Save</div>
                <div class="CloseOrSave" @click="CloseDisappear">Close</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FloatEdit",
    data(){
        return{
            SelectedDialog:{title:""},
            FloatEditWrapperItem:{},
        }
    },
    methods:{
        CloseDisappear(){
            this.FloatEditWrapperItem.style.display = "none";
        },
        GetFloatEditWrapper(){
            this.FloatEditWrapperItem =document.getElementById("FloatEditWrapper");
        },
        ClickSave(){
            if(this.SelectedDialog.title===""){return ;}
            this.$bus.$emit("ClickSave",this.SelectedDialog);
            this.CloseDisappear();
        },
    },
    mounted() {
        this.GetFloatEditWrapper();
        this.$bus.$on("DialogEdit",(res)=>{
            this.SelectedDialog = res;
            this.FloatEditWrapperItem.style.display = "block";
        });
    }
}
</script>

<style scoped>
    .FloatEditWrapper{
        position: absolute;
        z-index: 50;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;


    }
    .FloatEdit{
        position: absolute;
        width: 450px;
        display: inline-block;
        transform: translateX(-50%) translateY(-50%);
        top: 45%;
        left: 50%;
        padding: 20px;
        border-radius: 15px;
        background-color: rgba(255, 255,255, 1);
    }
    .FloatEditTitle{
        position: relative;
        user-select: none;
        font-size: 20px;
        font-weight: 600;
    }
    .CloseOrSave{
        float: right;
        cursor: pointer;
        margin-left: 10px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        padding: 8px 12px;
        border-radius: 5px;
        font-weight: 500;
        user-select: none;

    }
    .CloseOrSave:nth-child(1){
        background-color: #52525B;
        color: white;
    }
    .CloseOrSave:nth-child(1):hover{
        background-color: #242428;
    }
    .CloseOrSave:nth-child(2):hover{
        background-color: rgb(243, 244, 246);
    }
    .FloatEditInput{
        width: 100%;
        padding: 8px 12px;
        border: 0;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        line-height: 25px;
        box-sizing: border-box;
        margin: 30px 0 ;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
    }
    .FloatEditInput:focus-visible{
        outline: 1px auto rgb(101, 97, 97);
    }
    .CancelItem{
        position: absolute;
        right: 0;
        top: -5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 30px;
        color: #f3f3f3;
        width: 36px;
        height: 36px;
        background-color: #52525B;
        border-radius: 50%;
        cursor: pointer;
    }
    .CancelItem:hover{
        background-color: #242428;
    }
</style>