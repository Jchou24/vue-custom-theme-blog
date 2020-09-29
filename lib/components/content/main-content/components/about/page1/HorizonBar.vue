<template>
    <div class="HorizonBar drop-shadow-1">
        <div class="horizon-bar text-shadow-1">Hi! I'm Johnny.</div>
    </div>

</template>

<script>
    export default {
        name: "HorizonBar",
    }
</script>

<style lang="scss" scoped>
    .HorizonBar{
        z-index: 5;

        position: absolute;
        width: 100vw;
        height: 100px;
        left: 0;
        top: 190px;        

        background-image: radial-gradient(circle, #ffffff00 50%, #a09e9e), map-get($imgs-heavy, grey_wash_wall);

        font-size: 48px;
        font-weight: bold;
        line-height: 100px;

        @media (min-width: 956px) { 
            .horizon-bar{
                position: absolute;
                left: calc( 50% - 100px );
                width: 550px;
            }
        }

        @media (max-width: 956px) { 
            padding-left: 10px;
            text-align: center;

            top: unset;
            margin-top: 20px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 32px;
            line-height: 60px;
            height: 60px;
        }
    }
</style>
