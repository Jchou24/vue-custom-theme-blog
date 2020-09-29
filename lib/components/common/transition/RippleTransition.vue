<template>
    <transition-group
        appear
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        >
        <slot></slot>
    </transition-group>
</template>

<script>
    export default {
        name: "RippleTransition",
        props:{
            is_active:{
                type: Boolean,
                default: true,
            }
        },
        methods:{
            beforeEnter(el){
                if(this.is_active){
                    el.style.opacity = 0
                    el.style.height = 0
                }
            },
            enter(el, done){
                if(this.is_active){
                    import('velocity-animate/velocity').then(Velocity => {
                        var delay = el.dataset.index * 100
                        // var delay = el.dataset.index * 200
                        setTimeout(function() {
                            el.style.height = "initial"
                            Velocity.default(
                                el,
                                { opacity: 1 },
                                { complete: done }
                            )
                        }, delay)
                    })
                }else{
                    done()
                }                
            },
            leave(el, done){
                if(this.is_active){
                    import('velocity-animate/velocity').then(Velocity => {
                        var delay = el.dataset.index * 60
                        // var delay = el.dataset.index * 150
                        setTimeout(function() {
                            Velocity.default(
                                el,
                                { opacity: 0, height: 0 },
                                { complete: done }
                            )
                        }, delay)
                    })
                }else{
                    done()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
