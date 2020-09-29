<template>    
    <div class="skill-frames">
        <div class="skill-frames-children">
            <SkillFrame class="skill-frames-ele skill-frame-1" scroll-out="flipInY" scroll-out-delay="150"
                imgClass="front-end-img" 
                skillTitle="Front-End"/>
            <SkillFrame class="skill-frames-ele skill-frame-2" scroll-out="flipInY" scroll-out-delay="250"
                imgClass="backend-end-img" 
                skillTitle="Backend-End"/>
        </div>
        <div class="skill-frames-children">
            <SkillFrame class="skill-frames-ele skill-frame-3" scroll-out="flipInY" scroll-out-delay="350"
                imgClass="analytics-img" 
                skillTitle="Analytics"/>
            <SkillFrame class="skill-frames-ele skill-frame-4" scroll-out="flipInY" scroll-out-delay="450"
                imgClass="data-collection-img" 
                skillTitle="Crawler"/>
        </div>            
    </div>
</template>

<script>
    import SkillFrame from './SkillFrame.vue'

    export default {
        name: "SkillFrames",
        components:{ 
            SkillFrame,
        },
    }
</script>

<style lang="scss" scoped>    
    .skill-frames{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        position: relative;

        height: fit-content;
        padding-top: 100px;

        @media (max-width: 619px){
            padding-top: 50px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            padding-top: 30px;
        }

        .skill-frames-children{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            @media (max-width: 1179px) { 
                justify-content: space-around;
                width: 100vw;

                padding-left: 100px;
                padding-right: 100px;
            }

            @media (max-width: 779px) { 
                padding-left: 20px;
                padding-right: 20px;
            }
        }

        .skill-frames-ele{
            margin-left: 20px;
            margin-right: 20px;
            margin-bottom: 20px;
            height: 350px;

            @media (max-width: $mediaquery-width-sm) { 
                margin-bottom: 0px;
                height: 320px;
            }
        }
    }
</style>
