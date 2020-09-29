<template>
    <div class="skill-details">
        <SkillDetail class="skill-details-ele skill-detail-1" :skills="frontEndSkills" :is_nested="false" skillTitle="Front-End" />
        <SkillDetail class="skill-details-ele skill-detail-2" :skills="backEndSkills" :is_nested="true" skillTitle="Back-End" />
        <SkillDetail class="skill-details-ele skill-detail-3" :skills="analyticsSkills" :is_nested="false" skillTitle="Analytics" />
        <SkillDetail class="skill-details-ele skill-detail-4" :skills="otherSkills" :is_nested="false" skillTitle="Others" />
    </div>
</template>

<script>
    import SkillDetail from './SkillDetail.vue'

    export default {
        name: "SkillDetails",
        components:{
            SkillDetail,
        },
        data(){
            return {
                frontEndSkills: "Vue, NPM, Webpack, Jquery, Bootstrap, Javascript, Html, CSS",
                backEndSkills: [{
                        name: 'Server',
                        skills: 'IIS',
                    },{
                        name: 'Language',
                        skills: "Python (Django, Flask), C# (MVC, Console Program)",
                    },{
                        name: 'DB',
                        skills: "PostgreSQL, MongoDB, MS SQL",
                    },{
                        name: 'OS',
                        skills: "Linux, Windows",
                    },{
                        name: 'IaaS',
                        skills: "Microsoft Azure",
                }],
                analyticsSkills: "Data Mining, Text Mining, Topic Modeling, Deep Learning",
                otherSkills: "Crawler, Git (Bitbucket, Github), TFS, Unit Test"
            }
        },
        methods:{
        },
    }
</script>

<style lang="scss" scoped>
    // ==========================================================================================
    // skill-detail
    .skill-details{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        z-index: 10;
        margin-top: 20px;
    }

    .skill-details-ele{
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 30px;
    }
</style>
