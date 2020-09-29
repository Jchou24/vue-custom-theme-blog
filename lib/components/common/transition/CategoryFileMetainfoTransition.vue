<template>
    <transition :mode="mode"
        enter-active-class="animated fadeInDown fastest"
        leave-active-class="animated fadeOutUp fastest"
        >
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        name: "CategoryFileMetainfoTransition",
        props:{
            mode:{
                type: String,
                default:""
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
