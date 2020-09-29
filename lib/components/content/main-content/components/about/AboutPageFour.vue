<template>    
    <ViewSection class="AboutPageFour" >

        <SectionTitle class="section-title" scroll-out="jackInTheBox" scroll-out-delay="250">
            About the Website
        </SectionTitle>

        <QuarterOval scroll-out="fadeInLeft" scroll-out-delay="500" />

        <div class="view-container cube-box-contaniner">
            <CubeBox class="cube-box"/>
        </div>

        <Description />
    </ViewSection>
</template>

<script>
    import ViewSection from './ViewSection.vue'
    import SectionTitle from './SectionTitle.vue'
    import CubeBox from './page4/CubeBox.vue'
    import QuarterOval from './page4/QuarterOval.vue'
    import Description from './page4/Description.vue'

    export default {
        name: "AboutPageFour",
        components:{ 
            ViewSection,
            SectionTitle,
            CubeBox,
            QuarterOval,
            Description,
        },
        data(){
            return {
            }
        },
        methods:{
        },
    }
</script>

<style lang="scss" scoped>

    .section-title{
        position: absolute;
        top: 60px;
        left:0;
        right:0;
        margin: 0 auto;
    }
    // ==========================================================================================
    // cube-box
    .cube-box-contaniner{
        @media (min-width: $mediaquery-width-l) {
            position: relative;
        }
    }
    .cube-box{
        position: absolute;
        top: 45%;
        left: 0%;
        
        @media (max-width: $mediaquery-width-l) {
            display: none;
        }
    }
</style>

<style lang="scss">
    .AboutPageFour.ViewSection{

        &::before{
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 100vw; height: 100%;
            background: url("~@theme/img/background-sky.jpg") no-repeat center;
            background-attachment: fixed;
            background-size: cover;
            filter: blur(2px) brightness(90%);
        }        

        flex-direction: column;
        padding-top: 70px;

        .SectionTitle{
            margin-top: 50px;            
        }

        @media (max-width: $mediaquery-width-l) {
            height: 850px;
        }

        @media (min-width: $mediaquery-width-sm) and (max-width: $mediaquery-width-md) { 
            height: 950px;
        }

        @media (max-width: $mediaquery-width-sm) {
            height: 900px;
        }
    }
</style>