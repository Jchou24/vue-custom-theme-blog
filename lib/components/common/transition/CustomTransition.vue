<template>
    <transition
        appear           
        name="custom-classes-transition"
        enter-active-class="animated fadeInLeft fastest"
        leave-active-class="animated fadeOutRight fastest"
        :duration="{ enter: duration_enter, leave: duration_leave }"
        :mode=mode
        :enter="enter"
        :after-enter="afterEnter"
        >
        <slot>
        </slot>
    </transition>
</template>

<script>
export default {
    name: "CustomTransition",
    props:{
        mode:{
            type: String,
            default: ""
            // default: () => "out-in"
        },
        enter:{
            typer: Function,
            default: function(){},
        },
        afterEnter: {
            typer: Function,
            default: function(){},
        },
        duration_enter: {
            type: Number,
            default: 500,
        },
        duration_leave: {
            type: Number,
            default: 300,
        },

    },
    data: function(){
        return {

        }
    },
    computed:{

    },
    methods:{
        enter_(){
            this.enter()
        },
        afterEnter_(){
            this.afterEnter()
        },
    },
    mounted(){

    },
    updated(){

    },
    destroyed(){
        
    }
}
</script>

<style lang="scss" scoped>

</style>
