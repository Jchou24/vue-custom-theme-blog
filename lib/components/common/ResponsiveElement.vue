<template>
    <div :class="size_class">
        <slot></slot>
    </div>
</template>

<script>
    import settings from "@theme/js/settings.js"
    import throttle from 'lodash.throttle'
    
    export default {
        name: "ResponsiveElement",
        components:{
            
        },
        props:{
            get_class:{
                type: Function,
                default: null,
            },
            wait_time:{
                type: Number,
                default: 300,
            }
        },
        data(){
            return {
                size_class: "",
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

            default_get_class(width){
                return width <= settings.screen_size.sm ? "sm" : ""
            },
            maintance_size_class(){
                let width = this.$el.offsetWidth
                let get_class = this.get_class || this.default_get_class

                this.size_class = get_class(width)
            },
            resize(){
                let that = this

                that.maintance_size_class()
                that.$emit("resized")
                // console.log("resized")
            }
        },
        mounted(){
            let that = this
            that.maintance_size_class()
            import('resize-sensor').then(ResizeSensor => {
                ResizeSensor.default(that.$el, throttle(that.resize, that.wait_time))
            })
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
