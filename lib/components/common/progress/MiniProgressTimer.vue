<template>
    <RadialProgressBar class="mini-progress-timer"
        :completed-steps="completed_steps"
        :total-steps="total_steps" 
        :animateSpeed="100"
        :diameter="diameter"
        :strokeWidth="strokeWidth"
        :startColor="startColor"
        :stopColor="stopColor"
        :innerStrokeColor="innerStrokeColor"
        />
</template>

<script>
    import RadialProgressBar from './RadialProgressBar.vue'

    export default {
        name: "MiniProgressTimer",
        components: {
            RadialProgressBar
        },
        props:{
            total_steps:{
                type: Number,
                default: 15000
            },
            steps:{
                type: Number,
                default: 100
            },
            diameter: {
                type: Number,
                required: false,
                default: 40
            },
            startColor: {
                type: String,
                required: false,
                default: '#a1b7bd'
            },
            stopColor: {
                type: String,
                required: false,
                default: '#1c2e45'
            },
            strokeWidth: {
                type: Number,
                required: false,
                default: 4
            },
            innerStrokeColor: {
                type: String,
                required: false,
                default: '#1c2e45'
            },
        },
        data(){
            return{
                completed_steps: 0,
                timer: null,
                is_active_timer: true,
                is_restart: false,
                is_direction_pos: true,
            }
        },
        methods:{
            start(){            
                let that = this
                that.$emit("start")
                that.clear_countdown_timer()
                that.is_active_timer = true
                
                that.timer = setInterval(function(){

                    if( that.is_direction_pos ){
                        if( that.completed_steps == that.total_steps ){
                            that.is_restart = true
                            that.is_direction_pos = false
                        }
                        that.completed_steps += that.steps
                    }else{
                        if( that.completed_steps == 0 ){
                            that.is_restart = true
                            that.is_direction_pos = true
                        }
                        that.completed_steps -= that.steps
                    }

                    if( that.is_restart ){
                        that.$emit("refresh")
                        that.is_restart = false
                    }

                    
                }, 100)
            },
            stop(){
                let that = this
                that.$emit("stop")
                that.clear_countdown_timer()
                that.is_active_timer = false
            },
            toggle(){
                if( this.is_active_timer ){
                    this.stop()
                }else{
                    this.start()
                }
            },
            reset(){
                if( this.is_direction_pos ){
                    this.completed_steps = 0
                }else{
                    this.completed_steps = this.total_steps
                }
            },
            clear_countdown_timer(){
                let that = this
                try {
                    clearInterval( that.timer )
                    that.timer = null
                } catch (error) {
                    
                }
            },
        },
        mounted(){
            this.start()
        }
    }
</script>

<style lang="scss" scoped>
    div.mini-progress-timer{
        height: 38px;
        width: 38px;
        left: -2px;
        top: -2px;
    }
</style>
