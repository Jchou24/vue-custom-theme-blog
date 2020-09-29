<template>
    <div class="ScreenRotateButton" @click="clicked">
        <i class="material-icons" v-if="is_show">screen_rotation</i>
    </div>
</template>

<script>
    import { check_is_mobile } from '@theme/js/utility.js'

    export default {
        name: "ScreenRotateButton",
        components:{
            
        },
        props:{
            is_display_mobile_only:{
                type: Boolean,
                default: true,
            }
        },
        data(){
            return {

            }
        },
        watch:{
            
        },
        computed:{
            is_show:{
                get(){
                    if (this.is_display_mobile_only) {
                        return this.is_mobile()
                    }else{
                        return true
                    }
                }
            },
        },
        methods:{
            init(){
                let that = this
                
                that.recycle()
            },
            recycle(){
                let that = this
            },
            clicked(){
                this.$emit("clicked")
            },
            is_mobile(){
                

                return check_is_mobile()
            },
        },
        mounted(){

        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss" scoped>

    .ScreenRotateButton{
        height: 64px;
        margin-top: 7px;

        i.material-icons{
            font-size: 50px;
            opacity: 0.5;
            @include transition(all, 0.1s, ease-in-out);
        }

        &:hover{
            i.material-icons{
                font-weight: 900;
                opacity: 1;
            }

            cursor: pointer;
        }
    }
    
</style>
