<template>
    <li class="sidebar-li-item">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: "SidebarLiItem",
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
