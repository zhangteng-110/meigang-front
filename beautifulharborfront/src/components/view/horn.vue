<template>
    <div class="trumpet-div">
        <div class="box">
            <div class="trumpet-back"></div>
            <div class="trumpet-forward"></div>
            <div class="wifi-symbol">
                <div class="line first"></div>
                <div class="line second"></div>
                <div class="line third"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Trumpet"
    }
</script>

<style scoped>
    .trumpet-div {
        height: 100%;  
    }
    .box {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .trumpet-back {
        height: 12px;
        width: 8px;
        background-color: #00a3af;
        z-index: 1;
    }

    .trumpet-forward {
        width: 0; /*设置宽高为0，所以div的内容为空，从才能形成三角形尖角*/
        height: 0;
        border-bottom: 13px solid #00a3af;
        border-left: 13px solid transparent; /*transparent 表示透明*/
        border-right: 13px solid transparent;
        transform: rotateZ(-90deg);
        margin-left: -16px;
    }

    .wifi-symbol {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 26px;
        margin-left: -4px;
    }
    .line {
        width: 10px;
        height: 2px;
        background-color: #00a3af;
        border-radius: 1px;
    }

    .first {
        transform: rotateZ(-30deg);
        animation: fadeInOut 1s infinite 0.2s;
    }
    .third {
        transform: rotateZ(30deg);
        animation: fadeInOut 1s infinite 0.4s;
    }

    /*动画*/
    @keyframes fadeInOut {
        0% {
            opacity: 0; /*初始状态 透明度为0*/
        }
        100% {
            opacity: 1; /*结尾状态 透明度为1*/
        }
    }
</style>