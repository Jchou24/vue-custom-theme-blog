<template>    
    <div class="CubeBox scene">
        <div  class="cube">
            <div class="front"></div>
            <div class="back"></div>
            <div class="top"></div>
            <div class="bottom"></div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CubeBox",
        components:{ 
        },
        data(){
            return {
            }
        },
    }
</script>

<style lang="scss" scoped>
    @keyframes cube-rotate {
        0% {
            transform: rotateY(0);
        }
        100% {
            transform: rotateY(360deg);
        }
    }

    .scene {
        width: 200px;
        height: 200px;
        margin: 50px 0 0 50px;
        
        perspective: 1000px;
        perspective-origin: 50% -150px;
    }

    .cube {
        transform-style: preserve-3d;
        animation: cube-rotate 8s infinite linear;
    }

    .cube div {
        display: block;
        position: absolute;
        width: 200px;
        height: 200px;
        line-height: 200px;
        font-size: 40px;
        color: white;
        text-align: center;
        backface-visibility: visible;

        &.front,
        &.back,
        // &.top,
        // &.bottom,
        &.left,
        &.right
        {
            -webkit-box-reflect: below 50px linear-gradient(rgba(#fff, 0), rgba(#fff, .7));
        }      
    }

    .front {
        background: rgba(255, 255, 255, 0.4);
        transform: translateZ(100px);
    }

    .back {
        background: rgba(211, 211, 211, 0.4);
        transform: rotateY(180deg) translateZ(100px);
    }

    .top {
        background: rgba(168, 168, 168, 0.4);
        transform: rotateX(90deg) translateZ(100px);
    }

    .bottom {
        background: rgba(126, 126, 126, 0.4);
        transform: rotateX(-90deg) translateZ(100px);
    }

    .left {
        background: rgba(94, 94, 94, 0.4);
        transform: rotateY(-90deg) translateZ(100px);
    }

    .right {
        background: rgba(46, 46, 46, 0.4);
        transform: rotateY(90deg) translateZ(100px);
    }
</style>