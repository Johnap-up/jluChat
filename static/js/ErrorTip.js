import Vue from "vue";
import ErrorTip from "@/components/MainPage/ErrorTip";

let NewErrorTip= function ( value ) {
    console.log("ttt");
    let MyErrorTip=Vue.extend(ErrorTip);
    let temp=new MyErrorTip().$mount();//必须写$mount
    temp.ErrorContent=value;
    let temp2=temp.$el;
    document.getElementById("ErrorTip-Wrapper").insertAdjacentElement("beforeend",temp2);
    return ()=>{
        // setTimeout(()=>{
            let temp3=document.getElementsByClassName("ErrorTip");
            document.getElementById("ErrorTip-Wrapper").removeChild(temp3[0]);
        // },1000)
    }
}
let FormChatHtml=function (content){
    let temp1=content.split("\n"),TempNode='',IsLiEnd=0,IsFirst=0,startStr=/^\d/;
    temp1.forEach((line)=>{
        if(line){
            if(startStr.test(line)){
                let DotIndex=line.indexOf(".")<0?100:line.indexOf("."),CommaIndex=line.indexOf(":")<0?100:line.indexOf(":");
                // console.log(DotIndex,CommaIndex);
                let MyIndex=DotIndex<CommaIndex?DotIndex:CommaIndex;
                if(!IsFirst) {
                    IsFirst=1;
                    TempNode+=`<ol class="By-Chat-ol">`
                }
                TempNode+=DOM(2,line.substring(MyIndex+1));
                IsLiEnd=1;
            }else{
                if(IsLiEnd){
                    TempNode+=(IsFirst===1)?"</ol>":"";
                    IsLiEnd=IsFirst=0;
                }
                TempNode+=DOM(0,line);
            }
        }

    })
    function DOM(num,MyContent="",MyClass=""){
        let MyDOM=[`<p class="${MyClass} By-Chat-p">${MyContent}</p>`,`<ol class="${MyClass} By-Chat-ol">${MyContent}</ol>`,`<li class="${MyClass} By-Chat-p">${MyContent}</li>`]
        return MyDOM[num];
    }
    return TempNode;
}
export  {NewErrorTip,FormChatHtml};