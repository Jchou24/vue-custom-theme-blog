<template>
    <SidebarItemTransition>
        <div class="sidebar-item" v-show="is_show">
            <slot></slot>
        </div>
    </SidebarItemTransition>
</template>

<script>
    import SidebarItemTransition from '@theme/components/common/transition/SidebarItemTransition.vue'
    
    export default {
        name: "SidebarItem",
        components:{ SidebarItemTransition },
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
