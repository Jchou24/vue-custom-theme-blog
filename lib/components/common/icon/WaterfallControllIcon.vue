<template>
    <a class="sidebar-icon-circle waterfall-controll-icon" href="" @click.prevent="emit()"> 
        <div class="sidebar-icon">
            <i class="material-icons">{{ icon_target }}</i>
        </div>
    </a>
</template>

<script>
    export default {
        name: "WaterfallControllIcon",
        props:{
            icon: {
                type: String,
                required: true
            }
        },
        data(){
            let icon = ""
            switch (this.icon) {
                case "play_water_flow":
                    icon = "play_arrow"
                    break
                case "pause_water_flow":
                    icon = "pause"
                    break
                case "refresh_water_flow":
                    icon = "autorenew"
                    break        
                default:
                    break;
            }
            return {
                icon_target: icon
            }
        },
        methods:{
            emit(){
                this.$emit('clicked')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
