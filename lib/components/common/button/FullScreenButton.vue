<template>
    <div class="FullScreenButton" @click="toggle_full_screen">
        <i class="material-icons" v-if="is_full_screen">fullscreen_exit</i>
        <i class="material-icons" v-else>fullscreen</i>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    // TODO
    // unchecked yet
    export default {
        name: "FullScreenButton",
        components:{
            
        },
        props:{
            
        },
        data(){
            return {

            }
        },
        watch:{
            
        },
        computed:{
            is_full_screen:{
                get(){
                    return this.$store.state.layout.is_full_screen
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
            toggle_full_screen(){
                this.toggle_layout_is('is_full_screen')
                this.$emit("clicked")
            },
            ...mapMutations("layout",[
                "toggle_layout_is",
            ])
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

    .FullScreenButton{
        height: 64px;

        i.material-icons{
            font-size: 64px;
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
