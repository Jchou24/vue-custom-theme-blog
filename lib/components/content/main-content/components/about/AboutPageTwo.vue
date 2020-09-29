<template>    
    <ViewSection class="AboutPageTwo" >
        <vue-particles class="particles" 
            color="#dedede"
            :particlesNumber="100"
            />    
        <SectionTitle scroll-out="jackInTheBox" scroll-out-delay="250">
            My Web Application Skills
        </SectionTitle>
        <SkillFrames />
        <!-- <SkillGraph class="skill-graph fixed-position"/> -->
        
    </ViewSection>
</template>

<script>
    import ViewSection from './ViewSection.vue'
    
    import SkillFrames from './page2/SkillFrames.vue'
    import SectionTitle from './SectionTitle.vue'

    // import SkillGraph from './page2/SkillGraph.vue'


    export default {
        name: "AboutPageTwo",
        components:{ 
            ViewSection,
            SkillFrames,
            SectionTitle,
            // SkillGraph,
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
    .particles{
        position: absolute;
        height: 100%;
        width: 100%;
    }
</style>

<style lang="scss">   
    .AboutPageTwo.ViewSection{

        &::before{
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 100%; 
            height: 100%;
            background: url("~@theme/img/background-coding.jpg") no-repeat center;
            background-attachment: fixed;
            background-size: cover;
            filter: blur(5px) brightness(60%);
        }        

        &.mobile::before{
            background-attachment: scroll;
        }   

        flex-direction: column;

        height: unset;
    }
</style>