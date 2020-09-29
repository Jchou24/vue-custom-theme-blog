<template>
    <div class="VerticleBar">
        <div class="verticle-bar" scroll-out="fadeInDown" scroll-out-delay="250"></div>
        <div class="verticle-bar verticle-bar2"></div>
        <div class="verticle-bar verticle-bar-move verticle-bar-move-1"></div>
        <div class="verticle-bar verticle-bar-move verticle-bar-move-2"></div>
        <div class="verticle-bar verticle-bar-move verticle-bar-move-3"></div>
    </div>
</template>

<script>
    export default {
        name: "VerticleBar",
    }
</script>

<style lang="scss" scoped>
    // ==========================================================================================
    // verticle-bar
    $verticle-bar-base-left: calc( 50% - 480px );

    .verticle-bar{
        z-index: 5;
        position: absolute;
        width: 120px;
        height: 100%;
        left: $verticle-bar-base-left;
        top: 0%;

        background-image: map-get($imgs-heavy, dark_wood);
    }

    .verticle-bar2{
        z-index: 5;
        left: calc( #{$verticle-bar-base-left} + 140px );
        width: 20px;
    }

    .verticle-bar-move{
        z-index: 4;
        width: 20px;
        opacity: 0.5 !important;
        position: absolute;
        -webkit-animation:linear infinite alternate;
        -webkit-animation-duration: 5s;
    }

    .verticle-bar-move-1{        
        -webkit-animation-name: run-1;
    }

    .verticle-bar-move-2{
        -webkit-animation-name: run-2;
    }

    .verticle-bar-move-3{
        -webkit-animation-name: run-3;
    }

    @-webkit-keyframes run-1 {
        0% { left: calc( #{$verticle-bar-base-left} + 100px ) ;}
        100%{ left: calc( #{$verticle-bar-base-left} + 150px );}
    }    

    @-webkit-keyframes run-2 {
        0% { left: calc( #{$verticle-bar-base-left} + 150px ) ;}
        50%{ left : calc( #{$verticle-bar-base-left} + 100px ) ;}
        100%{ left: calc( #{$verticle-bar-base-left} + 140px );}
    }    

    @-webkit-keyframes run-3 {
        0% { left: calc( #{$verticle-bar-base-left} + 70px ) ;}
        50%{ left: calc( #{$verticle-bar-base-left} + 150px );}
        100%{ left: calc( #{$verticle-bar-base-left} + 60px );}
    }

    @media (max-width: 956px) { 
        $verticle-bar-base-left: 0px;

        .verticle-bar{
            left: $verticle-bar-base-left;
        }

        .verticle-bar2{
            left: calc( #{$verticle-bar-base-left} + 140px );
        }

        @-webkit-keyframes run-1 {
            0% { left: calc( #{$verticle-bar-base-left} + 100px ) ;}
            100%{ left: calc( #{$verticle-bar-base-left} + 150px );}
        }    

        @-webkit-keyframes run-2 {
            0% { left: calc( #{$verticle-bar-base-left} + 150px ) ;}
            50%{ left : calc( #{$verticle-bar-base-left} + 100px ) ;}
            100%{ left: calc( #{$verticle-bar-base-left} + 140px );}
        }    

        @-webkit-keyframes run-3 {
            0% { left: calc( #{$verticle-bar-base-left} + 70px ) ;}
            50%{ left: calc( #{$verticle-bar-base-left} + 150px );}
            100%{ left: calc( #{$verticle-bar-base-left} + 60px );}
        }
    }
    // ==========================================================================================
</style>
