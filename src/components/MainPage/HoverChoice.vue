<template>
    <div id="HoverChoice-wrapper" class="HoverChoice-wrapper">
        <a href="javascript:" class="ChoiceItem" id="Copiar" @click="ClickCopy">
            <span class="iconfont Hover-ico">&#xe606;</span>
            Copiar
        </a>
        <div class="fenge"></div>
        <a href="javascript:" class="ChoiceItem" id="Borrar" @click="ClickDelete">
            <span class="iconfont Hover-ico">&#xec7b;</span>
            Borrar
        </a>
    </div>
</template>

<script>
export default {
    name: "HoverChoice",
    data(){
        return {
            CopyText:"",
            updateInfo:"",
        }
    },
    methods:{
        ClickCopy(){
            navigator.clipboard.writeText(this.CopyText.MyBubble.content)
                .then(() => {
                    console.log('文本已经成功复制到剪切板',this.CopyText);
                })
                .catch(err => {
                    console.error('无法复制此文本：', err);
                });
        },
        ClickDelete(){
            this.$bus.$emit("DeleteItem",this.CopyText);
        },
    },
    mounted() {
        this.$bus.$on("getCopyTarget",(res)=>{this.CopyText=res});
    }
}
</script>

<style scoped>
    .HoverChoice-wrapper{
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