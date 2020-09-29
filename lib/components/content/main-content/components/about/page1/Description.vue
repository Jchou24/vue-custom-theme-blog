<template>
    <div class="description text-shadow-1 drop-shadow-1">
        <p class="description-p" scroll-out="zoomIn" scroll-out-delay="0" >
            喜歡新奇的事物、寫寫程式、玩玩遊戲，主要從事Web Application相關開發
        </p>
        <p class="description-p" scroll-out="zoomIn" scroll-out-delay="250" >
            <a href="https://github.com/Jchou24" target="_blank" rel="noopener noreferrer"><GithubIcon class="github-icon"/></a>
            <a href="https://www.linkedin.com/in/codejc" target="_blank" rel="noopener noreferrer"><LinkinIcon class="linkin-icon"/></a>
            <a href="mailto:codejchou24@gmail.com" title="codejchou24@gmail.com" class="a-mail"><span class="material-icons mail-icon">mail_outline</span> codejchou24@gmail.com</a>
        </p>
        <p class="description-p" scroll-out="zoomIn" scroll-out-delay="500" >
            <span class="material-icons location-icon">location_on</span> Taipei, Taiwan <ArticleViewsCount class="article-views-count" />
        </p>
        <div  scroll-out="zoomIn" scroll-out-delay="750" >
            <IndexQRCode class="index-qrcode"/>
        </div>
    </div>
</template>

<script>
    import GithubIcon from '@theme/components/common/icon/GithubIcon.vue'
    import LinkinIcon from '@theme/components/common/icon/LinkinIcon.vue'
    import IndexQRCode from '@theme/components/common/IndexQRCode.vue'

    import ArticleViewsCount from '@theme/components/common/ArticleViewsCount.vue'

    export default {
        name: "Description",
        components:{ 
            GithubIcon,
            LinkinIcon,
            IndexQRCode,
            ArticleViewsCount,
        },
    }
</script>

<style lang="scss" scoped>
    // ==========================================================================================

    $description-color: #1c2f45;
    $description-hover-color: #2664a1;

    .description{
        z-index: 4;

        padding: 15px;
        color: $description-color;
        font-weight: bold;

        position: absolute;
        max-width: 550px;
        height: 450px;
        left: calc( 50% - 100px );
        top: 32%;

        @media (max-width: 956px) { 
            z-index: 6;
            position: relative;
            
            top: unset;
            left: 0px;
            margin: 0 auto;
            margin-top: 160px;
            min-height: 600px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            padding: 10px;
            min-height: 500px;
            margin-top: 120px;
        }
    }

    .description-p{
        border-radius: 30px;
        padding-top: 10px;
        padding-bottom: 15px;
        padding-left: 25px;
        padding-right: 25px;

        @media (max-width: 956px) { 
            background:  rgba(255, 255, 255, 0.6); // 玻璃效果
            // background: radial-gradient(circle, #ffffff00 50%, #b8b8b8) rgba(245, 245, 245, 0.6); // 漸變效果
        }

        @media (max-width: $mediaquery-width-sm) { 
            border-radius: 15px;
            padding-top: 5px;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 18px;
        }
    }

    .github-icon,
    .linkin-icon{
        height: 30px;
        width: 30px;
        fill: $description-color;

        &:hover{
            fill: $description-hover-color;
        }

        @media (max-width: $mediaquery-width-sm) { 
            margin-top: -5px;
        }
    }

    .a-mail{
        color: $description-color;
        &:hover{
            color: $description-hover-color;

            .material-icons.mail-icon{
                color: $description-hover-color;
            }
        }
    }

    .material-icons.mail-icon{
        font-size: 32px;
        position: relative;
        top: 9px;
        font-weight: bold;
        color: $description-color;
    }

    .material-icons.location-icon{
        font-size: 28px;
        position: relative;
        top: 4px;
        font-weight: bold;
        margin-right: -5px;

        @media (max-width: $mediaquery-width-sm) { 
            top: 8px;
        }
    }

    .index-qrcode{
        margin-top: 20px;
        border-radius: 20px;
        @include box-shadow-1( $hover-width: 15px, $color-hover: #a0a0a0 );
    }
    // ==========================================================================================

</style>

<style lang="scss">
    .article-views-count{
        font-size: 22px;
        top: 3px;
        margin-left: 7px;
        position: relative;

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 18px;
        }
    }
</style>