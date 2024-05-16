// let deBounce =function (wait, value){
//     let Timer,AllTip=[],end=0,start=0,isFirst=true,tempArr=[0],i=-1,TempTime=0;
//     return function (){
//         end=start;
//         start=new Date().getTime();
//         console.log(start-end);
//         if(!isFirst){
//             tempArr.push(start-end);
//         }
//         isFirst=false;
//         AllTip.push(this.$NewErrorTip(value));
//         if (Timer) clearTimeout(Timer);
//         Timer = setTimeout(() => {
//             AllTip.forEach((a)=>{
//                 i++;
//                 TempTime+=tempArr[i];//必须放在setTimeOut外面，因为队列不同
//                 setTimeout(() => {
//                     a();
//                 },TempTime);
//             });
//             AllTip=[];
//             i=-1;
//             TempTime=0;
//         }, wait)
//     }
// },