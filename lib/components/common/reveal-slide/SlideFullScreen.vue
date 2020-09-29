<template>
    <div class="SlideFullScreen">
        <FullScreenButton class="toolbar-btn full-screen-btn clear-margin-right" @clicked="handle_full_screen_button_clicked" />
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    import FullScreenButton from '@theme/components/common/button/FullScreenButton.vue'

    export default {
        name: "SlideFullScreen",
        components:{
            FullScreenButton,
        },
        props:{
        },
        data(){
            return {
                is_slide_full_screen: false,
                timers: [],
            }
        },
        watch:{
            
        },
        computed:{
            is_layout_full_screen:{
                get(){
                    return this.$store.state.layout.is_full_screen || false
                }
            },
            is_slide_active_full_screen:{
                get(){
                    return this.is_layout_full_screen && this.is_slide_full_screen
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
            handle_full_screen_button_clicked(){
                let that = this
                that.is_slide_full_screen = !that.is_slide_full_screen
                that.set_layout({ key: "is_disabled_scroll", val: that.is_slide_active_full_screen})
                
                that.update_reveal()
                that.clear_timers()
                if(that.is_slide_active_full_screen){
                    that.timers.push( setTimeout(that.update_reveal, 1500) )
                }else{
                    that.timers.push( setTimeout(that.update_reveal, 500) )
                }
            },
            clear_timers(){
                let that = this
                for( let timer of that.timers ){
                    clearTimeout(timer)
                }
                that.timers = []
            },
            update_reveal(){
                let that = this
                that.$emit("updated", {
                    is_slide_active_full_screen: that.is_slide_active_full_screen,
                    is_layout_full_screen: that.is_layout_full_screen,
                })
            },
            ...mapMutations("layout",[
                "set_layout",
            ]),
        },
        watch:{
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

</style>
