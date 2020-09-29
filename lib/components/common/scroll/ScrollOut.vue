<template>
    <div class="ScrollOut">
        <slot></slot>
    </div>
</template>

<script>
    import $ from 'jquery'
    import ScrollOut from "scroll-out";

    export default {
        name: "ScrollOut",
        components:{
            
        },
        props:{
            is_force_reflow:{
                type: Boolean,
                default: true,
            },
            targets:{
                type: String,
                default: "[scroll-out]",
            },
            animattion_attribute_name:{
                type: String,
                default: "scroll-out",
            },
            animattion_delay_attribute_name:{
                type: String,
                default: "scroll-out-delay",
            },
            animattion_once_attribute_name:{
                type: String,
                default: "scroll-out-once",
            },
            animattion_previx:{
                type: String,
                default: "animated",
            },
            hidden_class:{
                type: String,
                default: "scroll-out-hidden",
            },
        },
        data(){
            return {
                $scrollout: null,
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
                that.init_scroll_out()
            },
            recycle(){
                let that = this

                if(that.$scrollout){
                    that.$scrollout.teardown()
                }                
            },
            init_scroll_out(){
                let that = this

                function is_once(el){
                    let check = el.getAttribute(that.animattion_once_attribute_name)
                    if( check ){
                        return check.toLowerCase() === 'true' || check.toLowerCase() === 'done'
                    }
                    return false
                }

                that.$scrollout = ScrollOut({
                    scope: that.$el,
                    targets: that.targets,
                    onShown: function(el){
                        let is_done = el.getAttribute(that.animattion_once_attribute_name) === 'done'
                        if(is_done){
                            return
                        }

                        let scroll_out_animation = el.getAttribute(that.animattion_attribute_name)

                        // remove the class
                        el.classList.remove(that.animattion_previx);
                        el.classList.remove(scroll_out_animation);
                        el.classList.remove(that.hidden_class);

                        if( that.is_force_reflow ){
                            // force reflow
                            void el.offsetWidth;
                        }

                        // re-add the animated cl
                        el.classList.add(that.animattion_previx);
                        el.classList.add(scroll_out_animation);
                    },
                    onHidden: function(el){
                        if( is_once(el) ){
                            el.setAttribute(that.animattion_once_attribute_name, 'done')
                            return
                        }

                        el.classList.add(that.hidden_class);
                    },
                });

                that.init_delay()
            },
            init_delay(){
                let that = this
                $(`[${that.animattion_delay_attribute_name}]`).each(function(){
                    let delay = this.getAttribute(that.animattion_delay_attribute_name)
                    delay = parseInt(delay)
                    if( !isNaN(delay) ){
                        delay = delay/1000 + 's'
                        this.style.setProperty( "animation-delay", delay )
                    }
                })     
            }
        },
        mounted(){
            this.init()
        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss">
    .scroll-out-hidden{
        visibility: hidden;
    }
</style>
