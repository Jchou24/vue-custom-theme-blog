<template>
    <div class="SlideZoomer">
        <PlusButton class="toolbar-btn" @clicked="clicked_plus_button()" />
        <MinusButton class="toolbar-btn" @clicked="clicked_minus_button()" />
    </div>
</template>

<script>
    import { screen_size } from '@theme/js/utility.js'

    import PlusButton from '@theme/components/common/button/PlusButton.vue'
    import MinusButton from '@theme/components/common/button/MinusButton.vue'

    export default {
        name: "SlideZoomer",
        components:{
            PlusButton,
            MinusButton,
        },
        props:{
            is_layout_full_screen:{
                type: Boolean,
                default: false,
            },
            update_percentage_unit:{
                type: Number,
                default: 15,
            },
            base_full_screen_percentage_offset:{
                type: Number,
                default: 40,
            },
        },
        data(){
            return {
                current_screen_percentage: 100,
                display_screen_percentage: 100,
            }
        },
        watch:{
            
        },
        computed:{
            screen_percentage:{
                get(){
                    return `${this.current_screen_percentage-this.screen_offset}%`
                }
            },
            full_screen_percentage_offset:{
                get(){
                    this.$store.state.layout.app_resize
                    return screen_size() == 'xs' ? 0 : this.base_full_screen_percentage_offset
                }
            },
            screen_offset:{
                get(){
                    return this.is_layout_full_screen ? this.full_screen_percentage_offset : 0
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
            clicked_plus_button(){
                let that = this

                if(that.display_screen_percentage + that.update_percentage_unit + that.base_full_screen_percentage_offset < 200){
                    that.current_screen_percentage -= that.update_percentage_unit
                    that.display_screen_percentage += that.update_percentage_unit
                    that.update_reveal()
                }
            },
            clicked_minus_button(){
                let that = this

                if(that.display_screen_percentage - that.update_percentage_unit > 0){
                    that.current_screen_percentage += that.update_percentage_unit
                    that.display_screen_percentage -= that.update_percentage_unit
                    that.update_reveal()
                }
            },
            update_reveal(){
                let that = this

                that.$emit("updated", {
                    screen_percentage: that.screen_percentage,
                    display_screen_percentage: that.display_screen_percentage,
                })
            }
        },
        watch:{
            screen_percentage(){
                this.update_reveal()
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
    .SlideZoomer{
        display: flex;
    }
</style>
