<template>
    <div id="ErrorTip" class="ErrorTip">
        <span class="iconfont ErrorIcon">&#xe609;</span>
        <span class="ErrorTipContent">{{ErrorContent}}</span>
    </div>
</template>

<script>
export default {
    name: "ErrorTip",
    data() {
        return {
            ErrorContent: "",
        }
    },

}
</script>

<style scoped>
    #ErrorTip {
        display: flex;
        min-width: 200px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        padding: 8px 10px;
        user-select: none;
        align-items: center;
        margin: 10px 0;
    }
    .ErrorIcon{
        color: #fcfcfc;
        line-height: 22px;
        font-weight: 600;
        margin-right: 10px;
        width: 22px;
        height: 22px;
        background-color: red;
        flex-grow: 0;
        text-align: center;
        border-radius: 50%;
    }
    .ErrorTipContent{
        flex-grow: 1;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
    }
</style>