<template>
    <div id="app">
        <LeftWrapper class="LeftWrapper"></LeftWrapper>
        <HistoryDialog class="HistoryDialog" msg="Welcome to Your Vue.js App"/>
        <FloatEdit></FloatEdit>
    </div>
</template>
<!--hoverChoice的z-index是30  leftWrapper的是20  FloatEdit的是50-->
<script>

import HistoryDialog from './components/MainPage/HistoryDialog.vue'
import LeftWrapper from "@/components/LeftItems/LeftWrapper";
import FloatEdit from "@/components/LeftItems/Dialog/FloatEdit";

export default {
    name: 'App',
    components: {
        HistoryDialog,
        LeftWrapper,
        FloatEdit,
    },
    methods:{
        HoverDisappear(){
            let box1=document.getElementById("HoverChoice-wrapper");
            let box2=document.getElementById("HoverDialogChoice-wrapper");
            let box3=document.getElementById("FloatEditWrapper");
            window.addEventListener("click",(e)=>{
                if(typeof e.target.className==="string"){
                    if(!e.target.className.includes("chat-right")&&!e.target.className.includes("HoverChoice-wrapper"))
                        box1.style.display="none";
                    if(!e.target.className.includes("DialogSetting")&&!e.target.className.includes("HoverDialogChoice-wrapper"))
                        box2.style.display="none";
                    if(e.target.className.includes("FloatEditWrapper"))
                        box3.style.display="none";
                }else{
                    box1.style.display="none";
                    box2.style.display="none";
                    box3.style.display="none";
                }
            })
        },

    },
    mounted() {
        this.HoverDisappear();
    }
}
</script>

<style>
    #app{
        position: relative;
        display: flex;
        height: 100%;
    }
    .clearfix::after,
    .clearfix::before{
        display: table;
        clear: both;
        content: "";
    }
    .pad-4{
        padding: 4px;
        box-sizing: border-box;
    }
    .div-half-1rem{
        padding: 8px 16px;
        border-radius: 8px;
    }
    .DialogRoot{
        display: flex;
        margin: 16px 0;
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
    }
    .By-Chat-p{
        margin: 0;
        line-height:24px;
    }
    .By-Chat-ol{
        margin: 0;
    }
</style>
