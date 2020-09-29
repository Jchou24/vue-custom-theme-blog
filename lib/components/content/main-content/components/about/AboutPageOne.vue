<template>    
    <ViewSection class="AboutPageOne">
        <PageFlipper @AnimationDone="HandleAnimationDone" />

        <VerticleBar/>

        <HorizonBar scroll-out="fadeInLeft" scroll-out-delay="250" />

        <ImgSection/>

        <Description/>
    </ViewSection>
</template>

<script>
    import ViewSection from './ViewSection.vue'
    
    import PageFlipper from './page1/PageFlipper.vue'
    import VerticleBar from './page1/VerticleBar.vue'
    import HorizonBar from './page1/HorizonBar.vue'
    import ImgSection from './page1/ImgSection.vue'
    import Description from './page1/Description.vue'

    export default {
        name: "AboutPageOne",
        components:{ 
            ViewSection,
            PageFlipper,
            VerticleBar,
            HorizonBar,
            ImgSection,
            Description,
        },
        data(){
            return {
                
            }
        },
        methods:{
            HandleAnimationDone(){

            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>

<style lang="scss" >
    $slide-background-image: map-get($imgs-light, whitey);

    $background-mobile-full-screen: radial-gradient(circle, #ffffff00 50%, #a09e9e), $slide-background-image;
    .AboutPageOne.ViewSection{
        background: $background-mobile-full-screen;

        @media (max-width: 956px){
            flex-direction: column;
            justify-content: unset;
            height: 1350px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            padding-top: 70px;
            height: 1100px;
        }
    }
    
</style>