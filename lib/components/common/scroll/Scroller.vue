<template>
    <span>
        <slot></slot>
    </span>
</template>

<script>
    import { ScrollerHandler } from '@theme/js/scroller_handler.js'
    
    export default {
        name: "Scroller",
        props:{
            is_noself:{
                type: Boolean,
                default: false
            },
            sub_target:{
                type: Array,
                default: () => []
            },
            scroller_option:{
                type: Object,
                default: () => {}
            },
            watch_init:{
                required: true,
                type: String, // enter, after_enter
            }
        },
        data(){
            return {
                scroller_handler: null,
            }
        },
        computed:{
            el:{
                get(){
                    return this.$slots.default[0].elm
                }
            },
            is_watch_init_enter:{
                get(){
                    return this.watch_init == "enter" ? true : false
                }
            },
            is_watch_init_after_enter:{
                get(){
                    return this.watch_init == "after_enter" ? true : false
                }
            }
        },
        watch:{

        },
        methods:{
            init(){
                if( !this.scroller_handler ){
                    this.scroller_handler = new ScrollerHandler(this.scroller_option, this.is_noself, this.sub_target, this.el)
                }            
                
                this.scroller_handler.initial()
            }
        },
        mounted(){
            this.init()
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>

</style>
