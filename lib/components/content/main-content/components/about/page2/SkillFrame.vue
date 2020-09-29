<template>    
    <div class="SkillFrame">
        <div class="SkillFrame-ele title">{{skillTitle}}</div>
        <div class="SkillFrame-ele skill-circle"
            :class="imgClass"
            ></div>
    </div>
</template>

<script>
    export default {
        name: "SkillFrame",
        props:{ 
            imgClass:{
                type: String,
                default: ""
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
    }
</script>

<style lang="scss" scoped>
    .SkillFrame{
        display: flex;
        flex-direction: column;

        .SkillFrame-ele{
            margin: 0 auto;
        }

        &:hover{
            .title{
                background: rgba(143, 27, 27, 0.8);
                box-shadow: 50px 0px 50px rgba(226, 226, 226, 0.4), -20px 0px 50px rgba(226, 226, 226, 1.0);
            }

            .skill-circle{
                border: 3px solid rgba(255, 255, 255, 1.0);
                background-color: rgba(255, 255, 255, 0.8);
                @include box-shadow-1( 50px, rgba(226, 226, 226, 0.6) );
            }
        }
    }

    .title{
        z-index: 25;

        min-width: 200px;
        padding: 25px;
        padding-top: 5px;
        padding-bottom: 10px;
        border-radius: 15px;

        font-weight: bold;

        &.SkillFrame-ele{
            margin-bottom: 20px;
        }
        // background: rgba(13, 39, 48, 0.65);
        background: rgba(90, 17, 17, 0.65);

        box-shadow: 50px 0px 50px rgba(226, 226, 226, 0.4), -20px 0px 50px rgba(226, 226, 226, 0.4);
    }    

    .skill-circle{
        z-index: 20;
        width: 250px;
        height: 250px;
        border-radius: 100%;
        border: 3px solid rgba(255, 255, 255, 0.7);
        background-color: rgba(255, 255, 255, 0.65);
        
        @include box-shadow-1( 50px, rgba(226, 226, 226, 0.4) );

        @media (max-width: $mediaquery-width-sm) { 
            width: 200px;
            height: 200px;
        }
    }
</style>