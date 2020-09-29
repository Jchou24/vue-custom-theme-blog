<template>
    <div class="Description">
        <div class="description-row description-row-1 drop-shadow-1 text-shadow-1" scroll-out="fadeInDown" scroll-out-delay="150">
            <div class="description-title">開發</div>
            <div class="description-content">
                網站使用 <a href="https://vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">Vuepress</a> 進行開發
            </div>        
        </div>

        <div class="description-row description-row-2 drop-shadow-1 text-shadow-1" scroll-out="fadeInDown" scroll-out-delay="250">
            <div class="description-title">用途</div>
            <div class="description-content">
                讓我練習開發前端用XD
            </div>        
        </div>

        <div class="description-row description-row-3 drop-shadow-1 text-shadow-1" scroll-out="fadeInDown" scroll-out-delay="350">
            <div class="description-title">使用</div>
            <div class="description-content">
                使用此 Theme 請參考 <router-link to="/VueJCBlog/Quick-Start.html">Quick Start</router-link>
            </div>        
        </div>

        <div class="description-row description-row-4 drop-shadow-1 text-shadow-1" scroll-out="fadeInDown" scroll-out-delay="450">
            <div class="description-title">內容</div>
            <div class="description-content">
                隨手筆記一些心得，以程式開發為主
            </div>        
        </div>
    </div>
</template>

<script>
    export default {
        name: "Description",
    }
</script>

<style lang="scss" scoped>
    // ==========================================================================================
    // description
    
    $description-color: #1c2f45;
    $description-hover-color: #2664a1;

    .Description{
        display: flex;
        flex-direction: column;
        margin-top: 100px;

        @media (min-width: $mediaquery-width-sm) and (max-width: $mediaquery-width-md) { 
            margin-top: 150px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            margin-top: 200px;
            width: 100vw;
        }
    }

    .description-row{
        z-index: 10;
        position: absolute;
        display: flex;

        color: $description-color;
        font-weight: bold;

        @media (max-width: $mediaquery-width-l) { 
            position: relative;
            margin: 0 auto;
            margin-bottom: 30px;
            padding-right: 25px;
        }

        @media (max-width: $mediaquery-width-md) { 
            flex-direction: column;
            padding-right: 0px;
            padding-left: 0px;
        }
    }
    
    @media (min-width: $mediaquery-width-l) { 
        .description-row.description-row-1{
            top: 35%;
            left: calc( 60% - 440px );
        }

        .description-row.description-row-2{
            top: 50%;
            left: calc( 66% - 460px );
        }

        .description-row.description-row-3{
            top: 65%;
            left: calc( 71% - 490px );
        }

        .description-row.description-row-4{
            top: 80%;
            left: calc( 74% - 500px );
        }
    }

    .description-row .description-title{
        width: 100px;
        height: 100px;
        line-height: 100px;
        border-radius: 100%;
        background:  rgba(255, 255, 255, 0.6);
        margin-right: 30px;

        @include box-shadow-inset-1( $hover-width: 8px, $color-hover: #ffffff );

        font-size: 32px;

        @media (max-width: $mediaquery-width-md) { 
            font-size: 28px;
            margin: 0 auto;

            width: 150px;
            height: 60px;
            line-height: 60px;
            border-radius: 30px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 24px;
        }
    }

    .description-row .description-content{
        position: relative;
        top: 10px;

        width: 500px;
        height: 80px;
        line-height: 80px;
        vertical-align: middle;
        background:  rgba(255, 255, 255, 0.6);
        border-radius: 40px;
        padding-left: 15px;
        padding-right: 15px;

        a{
            color: $description-color;
            color: #2664a1;
        }

        @media (max-width: $mediaquery-width-md) { 
            width: 70vw;
            font-size: 24px;
            height: 60px;
            line-height: 60px;
            top: unset;

            margin: 0 auto;
            margin-top: 10px;
            margin-bottom: 5px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            width: 95vw;
            height: auto;
            font-size: 20px;
            border-radius: 20px;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
</style>
