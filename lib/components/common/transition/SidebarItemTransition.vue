<template>
    <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInLeft faster"
        leave-active-class="animated fadeOutLeft faster"
        >
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        name: "SidebarItemTransition",
        props:{
            is_show:{
                type: Boolean,
                default: true,
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
