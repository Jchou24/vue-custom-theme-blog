<template>    
    <div class="SkillDetail">
        <div class="SkillDetail-ele title">{{skillTitle}}</div>
        <div class="SkillDetail-ele detail detail-nested" v-if="is_nested">
            <div class="detail-nested-row" v-for="(skill,idx) in skills"
                :key=idx>
                <div class="detail-nested-row-name">
                    {{skill.name}}
                </div>

                <div class="detail-nested-row-skills">
                    {{skill.skills}}
                </div>
            </div>
        </div>
        <div class="SkillDetail-ele detail" v-else>
            {{skills}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "SkillDetail",
        props:{ 
            skills:{
                
            },
            is_nested:{
                type: Boolean,
                default: false
            },
            skillTitle:{
                type: String,
                default: ""
            },
        },
        data(){
            return {
            }
        },
        methods:{
            FormatSkills(array){
                return array.join(", ")
            }
        }
    }
</script>

<style lang="scss" scoped>
    $background: hsla(213, 42%, 19%, 0.7);
    $border-color: rgb(149, 193, 206);
    $color: rgb(221, 247, 255);
    $border: $border-color 4px solid;
    $box-shadow: 10px 0px 30px rgba(226, 226, 226, 0.4), -20px 0px 50px rgba(226, 226, 226, 0.4);
    $box-shadow-hover: 10px 0px 30px rgba(226, 226, 226, 0.8), -20px 0px 50px rgba(226, 226, 226, 0.8);

    .SkillDetail{
        display: flex;
        flex-direction: column;

        .SkillDetail-ele{
            margin: 0 auto;
        }

        color: $border-color;
        color: $color;

        &:hover{
            .title, .detail{
                box-shadow: $box-shadow-hover;
            }
        }
    }

    .title{
        min-width: 200px;
        padding: 25px;
        padding-top: 5px;
        padding-bottom: 10px;
        border-radius: 15px;

        &.SkillDetail-ele{
            margin-bottom: 20px;
        }
        background: $background;
        border: $border;
        font-weight: bold;

        box-shadow: $box-shadow;
        font-size: 26px;
    }    

    .detail{
        padding: 20px;

        width: 250px;
        min-height: 250px;
        border-radius: 15px;
        background: $background;
        border: $border;

        box-shadow: $box-shadow;
        font-size: 26px;

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 24px;
            min-height: unset;
            padding: 15px;
        }
    }

    .detail-nested{
        width: 500px;

        @media (max-width: $mediaquery-width-sm) { 
            width: calc( 100vw - 20px );
        }
    }

    .detail-nested-row{
        display: flex;
    }

    .detail-nested-row-name{
        width: 150px;
        border-right: 2px solid $border-color;
        font-size: 26px;

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 22px;
            width: 135px;
            margin-right: 5px;
        }
    }

    .detail-nested-row-skills{
        width: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 18px;
            width: calc( 100vw - 20px - 135px - 5px );
        }
    }
</style>