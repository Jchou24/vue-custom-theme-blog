<template>    
    <ViewSection class="AboutPageThree" >
        <SectionTitle scroll-out="jackInTheBox" scroll-out-delay="150">
            Skill Detail
        </SectionTitle>
        <SkillDetails class="view-container" scroll-out="zoomIn" scroll-out-delay="150" />
    </ViewSection>
</template>

<script>
    import ViewSection from './ViewSection.vue'
    import SectionTitle from './SectionTitle.vue'
    import SkillDetails from './page3/SkillDetails.vue'

    export default {
        name: "AboutPageThree",
        components:{ 
            ViewSection,
            SectionTitle,
            SkillDetails,
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

</style>

<style lang="scss">
    .AboutPageThree.ViewSection{

        &::before{
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 100%; 
            height: 100%;
            background: radial-gradient(circle, #ffffff00 60%, #326094), url("~@theme/img/blue-block.jpg") no-repeat center;
            background-attachment: fixed;
            background-size: cover;
            filter: blur(2px) brightness(85%);
        }       

        &.mobile::before{
            background-attachment: scroll;
        }

        flex-direction: column;
        padding-top: 70px;

        height: unset;

        .SectionTitle{
            margin-top: 50px;            
        }
    }
</style>