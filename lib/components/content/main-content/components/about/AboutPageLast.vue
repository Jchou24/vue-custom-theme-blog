<template>    
    <ViewSection class="AboutPageLast">
        <video class="bg-video" autoplay muted loop>
            <source src="~@theme/img/bg-video-1.mp4" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>

        <canvas id='city'></canvas>

        <SectionTitle class="section-title"  scroll-out="fadeInDown" scroll-out-delay="250">
            Thanks for your watching
        </SectionTitle>

        <router-link class="section-title section-title-2" to="/Demos/">
        <SectionTitle   scroll-out="fadeInDown" scroll-out-delay="450">
                Watch more demos<span class="material-icons">touch_app</span>
        </SectionTitle>
        </router-link>
    </ViewSection>
</template>

<script>
    import ViewSection from './ViewSection.vue'
    import SectionTitle from './SectionTitle.vue'

    import Inception from '@theme/js/inception.js'

    export default {
        name: "AboutPageLast",
        props:{
            
        },
        components:{ 
            ViewSection,
            SectionTitle
        },
        data(){
            return {
                $inception: null,
            }
        },
        methods:{
        },
        mounted(){
            this.$inception = Inception(document, window, "city")
        },
        beforeDestroy(){
            this.$inception.Recycle()
        }
    }
</script>

<style lang="scss" scoped>
    .AboutPageLast .bg-video{
        z-index: 0;
        height: 100%;
        width: 177.77777778vh; /* 100 * 16 / 9 */
        min-width: 100%;
        min-height: 56.25vw; /* 100 * 9 / 16 */

        position: absolute;
        left: 50%; /* % of surrounding element */
        top: 50%;
        transform: translate(-50%, -50%); /* % of current element */
    }

    #city {
        z-index: 1;

        position: absolute;
        left: 50%; /* % of surrounding element */
        top: 60%;
        transform: translate(-50%, -50%); /* % of current element */
    }

    .section-title{
        z-index: 2;
    }
</style>

<style lang="scss">
    .AboutPageLast.ViewSection{

        &::before{
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 100vw; height: 100%;
            filter: blur(1px) brightness(80%);
        }        

        flex-direction: column;
        padding-top: 70px;
        overflow: hidden;

        height: 100vh;
    }

    .section-title-2 .SectionTitle{
        margin-top: 30px;
        font-size: 32px;
        color: white;

        .material-icons{
            // font-weight: bold;
            position: relative;
            top: 5px;
            font-size: 36px;
        }

        @media (max-width: 619px){
            font-size: 28px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 26px;
        }
    }

    .section-title-2 {
        &:hover{
            .SectionTitle{
                background: rgb(134, 26, 26);
            }
        }
    }
</style>