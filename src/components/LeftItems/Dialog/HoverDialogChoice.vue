<template>
    <div id="HoverDialogChoice-wrapper" class="HoverDialogChoice-wrapper">
        <a href="javascript:" class="ChoiceItem" id="DialogEdit" @click="DialogEdit">
            <span class="iconfont Hover-ico">&#xe600;</span>
            Edit
        </a>
        <div class="fenge"></div>
        <a href="javascript:" class="ChoiceItem" id="DialogDelete" @click="DialogDelete">
            <span class="iconfont Hover-ico">&#xec7b;</span>
            Delete
        </a>
    </div>
</template>
<script>
export default {
    name: "HoverDialogChoice",
    data(){
        return{
            DialogItem:{},
        }
    },
    methods:{
        DialogDelete(){
            this.$bus.$emit("DialogDelete",this.DialogItem);
        },
        DialogEdit(){
            this.$bus.$emit("DialogEdit",this.DialogItem);
        },
    },
    mounted() {
        this.$bus.$on("getDialogTarget",(res)=>{this.DialogItem=res});
    }
}
</script>


<style scoped>
.HoverDialogChoice-wrapper{
    width: 110px;
    /*text-align: center;*/
    position: absolute;
    top:0;
    right: 0;
    z-index: 30;
    box-shadow: 0 0 6px rgba(0,0,0,0.5);
    border-radius: 10px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 4px;
    background-color: #ffffff;
    display: none;
}
.fenge{
    width: 80%;
    height: 0.5px;
    background-color: #a8a8a8;
    margin: 4px auto;
}
.ChoiceItem{
    height: 34px;
    width: 100%;
    line-height: 34px;
    display: inline-block;
    box-sizing: border-box;
    color: black;
    padding-left: 15px;
}
.ChoiceItem:hover{
    background-color: #eeeeee;
    border-radius: 10px;
}
.Hover-ico{
    font-weight: bold;
    font-size: 14px;
    padding-right: 5px;
}

</style>