<template>
    <div class="LeftWrapper">
        <ControlWrapper class="ControlWrapper"></ControlWrapper>
        <DialogWrapper class="DialogWrapper"></DialogWrapper>
    </div>
</template>

<script>
import ControlWrapper from "@/components/LeftItems/Control/ControlWrapper";
import DialogWrapper from "@/components/LeftItems/Dialog/DialogWrapper";

export default {
    name: "LeftWrapper",
    components:{
        ControlWrapper,
        DialogWrapper,
    }
}
</script>

<style scoped>
    .LeftWrapper{
        display: flex;
        width: 307.2px;
        height: 100vh;
        position: fixed;
        z-index: 20;
    }
</style>