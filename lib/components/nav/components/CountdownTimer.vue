<template>
    <BProgress 
        class="countdown-timer"
        style="display: flex;"
        :value="get_countdown_percatage()" variant="danger" 
        :class="{ restart: is_restart }"
        v-if="is_display"
        />
</template>

<script>
    import BProgress from 'bootstrap-vue/es/components/progress/progress'
    import { screen_size } from '@theme/js/utility.js'
    import throttle from 'lodash.throttle'
    
    export default {
        name: "CountdownTimer",
        components:{
            BProgress
        },
        props:{
            is_show: {
                default: true
            },
            max_countdown_time: {
                default: 15000
            }
        },
        data: function(){
            return {
                is_active_countdown: this.determine_is_display(),
                is_active_countdown_previous: true,
                countdown_time: this.max_countdown_time,
                countdown_timer: null,
                is_restart: false,
                is_display: this.determine_is_display(),
                is_first_start: true,
            }
        },
        watch:{
            is_show(new_value, old_value){
                let is_display = this.is_display
                this.is_display = this.is_display_screen_size() && new_value

                if( is_display == true && this.is_display == false ){
                    this.is_active_countdown_previous = this.is_active_countdown
                    this.is_active_countdown = false
                }

                if( is_display == false && this.is_display == true ){
                    this.is_active_countdown = this.is_active_countdown_previous
                }            
            },
            is_active_countdown(new_value, old_value){
                if( new_value != old_value && new_value == true ){
                    this.start()
                }else if( new_value != old_value && new_value == false ){
                    this.stop()
                }
            },
            "$store.state.waterfall.pause_waterfall"(){
                this.stop()
            },
            "$store.state.waterfall.start_waterfall"(){
                this.start()
            },
        },        
        methods:{
            determine_is_display(){
                return this.is_display_screen_size() && this.is_show
            },
            is_display_screen_size(){
                if( screen_size() != 'xs' ){
                    return true
                }
                return false
            },
            get_countdown_percatage(){
                return  ( this.countdown_time / this.max_countdown_time ) * 100
            },
            start(){
                let that = this
                that.clear_countdown_timer()
                that.is_active_countdown = true
                
                that.countdown_timer = setInterval(function(){
                    if( that.is_show == false ){
                        that.stop()
                    }

                    if( that.countdown_time == that.max_countdown_time ){
                        that.is_restart = false
                    }

                    that.countdown_time -= 100
                    if( that.countdown_time <= 0 ){
                        that.$emit("refresh")
                        that.is_restart = true
                        that.countdown_time = that.max_countdown_time
                    }
                }, 100)
            },
            stop(){
                let that = this
                that.clear_countdown_timer()
                that.is_active_countdown = false
            },
            clear_countdown_timer(){
                let that = this
                try {
                    clearInterval( that.countdown_timer )
                    that.countdown_timer = null
                } catch (error) {
                    
                }
            },
            init(){
                let that = this

                that.recycle()
                window.addEventListener('resize', that.on_resize)

                if( that.is_display_screen_size() && that.is_first_start ){
                    that.start()
                }

                that.is_first_start = false
            },
            on_resize: throttle(function(){
                let that = this

                let is_display = that.is_display
                that.is_display = that.determine_is_display()

                if( is_display == true && that.is_display == false ){
                    that.is_active_countdown_previous = that.is_active_countdown
                    that.is_active_countdown = false
                }

                if( is_display == false && that.is_display == true ){
                    that.is_active_countdown = that.is_active_countdown_previous
                }
            }, 300),
            recycle(){
                // console.log("recycle CountdownTimer")
                window.removeEventListener( 'resize', this.on_resize )
                this.stop()
            }
        },
        mounted(){
            this.init()
        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss" scoped>
    .countdown-timer.restart{
        div.progress-bar{
            transition: none;
        }
    }

    .countdown-timer{
        margin: 0 auto;
        height: 3px;
        position: absolute;
        left: 0px;
        right: 0px;
        border-radius: 0;
        & div.progress-bar{
            transition: width 0.1s ease;
        }
        &.restart{
            div.progress-bar{
                transition: none;
            }
        }

        @media (min-width: $mediaquery-width-l){
            border-radius: 3px;
        }

        @media (min-width: $mediaquery-width-l) and (max-width: $mediaquery-width-xl) { 
            width: calc( 100vw - 50px );
        }

        @media (min-width: $mediaquery-width-xl) { 
            width: calc( #{$mediaquery-width-xl} - 50px );
        }
    }
</style>
