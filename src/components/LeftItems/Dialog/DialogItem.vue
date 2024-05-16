<template>
    <div class="ItemOuter" @click="SelectedItem($event)">
        <svg v-if=IsShow class="DialogImg" id="DisplayClick2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"></path></svg>
<!--        <svg v-if=IsShow id="DisplayClick2" t="1689417433634" class="DialogImg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1885" width="20" height="20"><path d="M69.376512 957.5424l215.3984-44.1344 16.0768 8.2944A458.5472 458.5472 0 0 0 512.000512 972.8a460.8 460.8 0 1 0-460.8-460.8c0 80.128 20.48 157.184 58.8288 225.4336l9.9328 17.7664-50.5856 202.3424z m10.2912 50.176a51.2 51.2 0 0 1-59.904-62.6176l45.568-182.5792A509.696 509.696 0 0 1 0.000512 512C0.000512 229.2224 229.222912 0 512.000512 0s512 229.2224 512 512-229.2224 512-512 512c-84.5824 0-164.352-20.48-234.6496-56.832l-197.632 40.4992z" fill="#000000" p-id="1886"></path></svg>-->
        <svg v-else id="DisplayClick1" stroke="currentColor" class="DialogImg" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M76.83 480a25.69 25.69 0 01-25.57-25.74 29.13 29.13 0 011.2-7.63L70.88 380c.77-2.46-.1-4.94-1.23-6.9l-.22-.4c-.08-.13-.46-.66-.73-1.05s-.58-.81-.86-1.22l-.19-.27A215.66 215.66 0 0132 251.37c-.18-57.59 22.35-112 63.46-153.28C138 55.47 194.9 32 255.82 32A227.4 227.4 0 01398 81.84c39.45 31.75 66.87 76 77.21 124.68a213.5 213.5 0 014.78 45c0 58.93-22.64 114.28-63.76 155.87-41.48 42-97.18 65.06-156.83 65.06-21 0-47.87-5.36-60.77-9-15.52-4.34-30.23-10-31.85-10.6a15.12 15.12 0 00-5.37-1 14.75 14.75 0 00-5.8 1.15l-.85.33-67.48 24.38A29.44 29.44 0 0176.83 480zm-2-31.8zM87.48 380z"></path></svg>
        <span class="DialogText">{{title}}</span>
        <div class="DialogSetting iconfont" @click="ShowHoverChoice($event)">&#xe73a;</div>
    </div>
</template>

<script>
export default {
    name: "MyDialog",
    props:["title","itemIndex","IsShow","ConversationId"],
    methods:{
        SelectedItem(e){
            let tempClassName=e.target.className;
            if(typeof tempClassName==="string"){
                if(tempClassName.includes("DialogSetting"))
                return;
            }
            let oldOne=JSON.parse(localStorage.getItem("conversation-storage"));
            let temp={itemIndex:this.itemIndex,title:this.title,OldOne:-1,ConversationId:this.ConversationId};
            if(oldOne){
                temp.OldOne= +oldOne.currentConversation.itemIndex;
            }
            this.$bus.$emit("SelectedItem",temp);
        },
        ShowHoverChoice(event){
            this.$bus.$emit("getDialogTarget",{ConversationId:this.ConversationId,itemIndex:this.itemIndex,title:this.title});
            let box1=document.getElementById("HoverDialogChoice-wrapper");
            box1.style.display="inline";
            box1.style.left = event.target.offsetLeft-box1.offsetWidth/2+event.target.offsetWidth/2+"px";
            box1.style.top = event.target.offsetTop+40+"px";
        },
    },

}
</script>

<style scoped>
    .ItemOuter{
        display: flex;
        align-items: center;
        width: 90%;
        cursor: pointer;
        background-color: rgb(243, 244, 246);
        margin: 10px auto;
        height: 55px;
        font-weight: 500;
        box-sizing: border-box;
        padding: 12px 16px;
        border-radius: 10px;
        box-shadow: 0 0 2px rgba(0,0,0,0.2);
    }
    .ItemOuter:hover{
        background-color: white;
    }
    .ItemOuter:hover .DialogSetting{
        display: block;
    }
    .DialogImg{
        flex-shrink: 0;
        font-size: 20px;
        padding-right: 8px;
    }
    .DialogSetting{
        flex-shrink: 0;
        display: none;
        color: #af4848;
    }
    .DialogSetting:hover{
        color: #ff3c3c;
    }
    .DialogText{
        flex-shrink: 0;
        flex-grow: 1;
    }
</style>