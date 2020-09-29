<template>    
    <div class="ImgSection">
        <FlipCircle class="flip-circle"/>

        <div class="poly-img" scroll-out="fadeInDown" scroll-out-delay="0" >
            <PolyImg class="poly-img-ele" imgClass="picture" :polyStyle="1" :scale="1.2" />
        </div>
        <div class="poly-img-2" scroll-out="fadeInLeft" scroll-out-delay="250" >
            <PolyImg class="poly-img-ele" imgClass="picture-2" :polyStyle="1" :scale="1.2" />
        </div>
        <div class="poly-img-3" scroll-out="fadeInRight" scroll-out-delay="500" >
            <PolyImg class="poly-img-ele" imgClass="picture-3" :polyStyle="1" :scale="1.2" />
        </div>
    </div>
</template>

<script>
    import FlipCircle from './FlipCircle.vue'
    import PolyImg from './PolyImg.vue'

    export default {
        name: "ImgSection",
        components:{
            FlipCircle,
            PolyImg
        },
    }
</script>

<style lang="scss" scoped>
    // ==========================================================================================
    // img-section
    .ImgSection{
        z-index: 6;
        position: absolute;

        top: 234px;
        left: calc( 50% - 650px );

        @media (min-width: 956px) and (max-width: 1260px) { 
            left: calc( 50% - 670px + 125px - 20px );
        }

        @media (max-width: 956px) { 
            

            position: relative;
            top: 140px;
            left: 0;
            margin: 0 auto;
            width: 100vw;
            max-width: 100vw;
        }

        @media (max-width: $mediaquery-width-sm) { 
            overflow: hidden;
            top: 100px;
            height: 380px;
            min-height: 380px;
        }
    }

    // ==========================================================================================
    // flip-circle

    .flip-circle{        
        position: absolute;

        @media (max-width: 956px) {
            position: relative;
            left: 0; 
            right: 0; 
            margin-left: auto; 
            margin-right: auto; 
            background: rgba(245, 245, 245, 0.8);
        }
    }
    
    // ==========================================================================================
    // picture

    $img-base-top: -50px;
    $img-base-left: 180px;
    .poly-img{
        z-index: 10;
        position: absolute;
        left: calc( #{$img-base-left} );
        top: $img-base-top;
    }
    .poly-img-2{
        z-index: 9;
        position: absolute;
        left: calc( #{$img-base-left} - 120px );
        top: calc( #{$img-base-top} + 180px );
    }
    .poly-img-3{
        z-index: 8;
        position: absolute;
        left: calc( #{$img-base-left} + 80px );
        top: calc( #{$img-base-top} + 270px );
    }

    @media (max-width: 956px) { 
        $img-base-left: calc( 50% - 120px );
        $img-base-top: 30px;
        .poly-img{
            left: $img-base-left;
            top: $img-base-top;     
            // top: 50px;     
        }
        .poly-img-2{
            left: calc( #{$img-base-left} - 130px );
            top: calc( #{$img-base-top} + 220px );
        }
        .poly-img-3{
            left: calc( #{$img-base-left} + 130px );
            top: calc( #{$img-base-top} + 220px );   
        }
    }

    @media (max-width: $mediaquery-width-sm) { 
        .poly-img-ele{
            transform: scale(0.75);
        }

        $img-base-left: calc( 50% - 120px );
        $img-base-top: 0px;
        .poly-img{
            left: $img-base-left;
            top: $img-base-top;
        }
        .poly-img-2{
            left: calc( #{$img-base-left} - 95px );
            top: calc( #{$img-base-top} + 160px );
        }
        .poly-img-3{
            left: calc( #{$img-base-left} + 95px );
            top: calc( #{$img-base-top} + 160px );   
        }
    }
    // ==========================================================================================
</style>
