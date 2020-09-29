<template>
    <div class="mini-timer"
        @click="toggle_timer"        
        >
        <MiniProgressTimer 
            :total_steps="total_steps"
            :steps="steps"
            :diameter="diameter"
            :startColor="startColor"
            :stopColor="stopColor"
            :strokeWidth="strokeWidth"
            :innerStrokeColor="innerStrokeColor"
            @start="is_show_pause = true"
            @stop="is_show_pause = false"
            @refresh="$emit('refresh')"
            ref="mini_progress_timer"
            />
        <i class="material-icons"
            v-if="!is_show_pause"
            >play_arrow</i>
        <i class="material-icons"
            v-if="is_show_pause"
            >pause</i>
    </div>
</template>

<script>
    import MiniProgressTimer from '@theme/components/common/progress/MiniProgressTimer.vue'

    export default {
        name: "MiniTimer",
        components:{
            MiniProgressTimer
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
            return {
                is_show_pause: true,
            }
        },
        watch:{
            
        },
        computed:{

        },
        methods:{
            init(){
                let that = this
                
                that.recycle()
            },
            recycle(){
                let that = this
            },
            toggle_timer(){
                this.$refs.mini_progress_timer.toggle()
            },
            reset(){
                this.$refs.mini_progress_timer.reset()
            },
            stop(){
                this.$refs.mini_progress_timer.stop()
            }
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
    $text-shadow-color-hover: #a2b6bb;

    div.mini-timer{
        cursor: pointer;
        border-radius: 20px;
        height: 36px;
        width: 36px;
        position: relative;
        @include transition( all, 0.1s );
        
        & > i.material-icons{
            position: absolute;
            top: 6px;
            left: 6.5px;
        }

        &:hover{
            box-shadow: 
                0px 0px 8px #a2b6bb, 
                0px 0px 8px #a2b6bb, 
                0px 0px 8px #a2b6bb, 
                0px 0px 8px #a2b6bb, 
                0px 0px 8px #a2b6bb, 
                0px 0px 8px #a2b6bb, 
                0px 0px 8px #a2b6bb;

            & > i.material-icons{
                @include text-shadow-1(2px, $text-shadow-color-hover);
            }
        }
    }
</style>
