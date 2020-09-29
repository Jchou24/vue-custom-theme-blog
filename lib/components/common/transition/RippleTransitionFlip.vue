<template>
    <transition-group
        appear
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        >
        <slot></slot>
    </transition-group>
</template>

<script>
    export default {
        name: "RippleTransitionFlip",
        props:{
            is_first_active:{
                type: Boolean,
                default: false
            }
        },
        methods:{
            beforeEnter(el) {
                el.style.opacity = 0
                if(this.is_first_active){
                    el.style.height = 0
                }
            },
            enter(el, done) {
                let that = this
                import('velocity-animate/velocity').then(Velocity => {
                    let idx = el.dataset.index % 20
                    let delay = idx * 150 + 300 + 1000
                    setTimeout(function() {
                        // el.className += " animated flipInX"
                        // el.className += " animated rotateInDownLeft"
                        el.className += " rolldown"
                        el.style.height = "initial"
                        Velocity.default(
                            el,
                            { opacity: 1 },
                            { complete: done }
                        )
                    }, delay)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
