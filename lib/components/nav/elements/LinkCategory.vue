<template>
    <BaseLink to="/category/" title="Category">
        <template #icon>
            <CategoryIcon/>
        </template>
    </BaseLink>
</template>

<script>
    import BaseLink from './BaseLink.vue'
    import CategoryIcon from '@theme/components/common/icon/CategoryIcon.vue'
    
    export default {
        name: "LinkCategory",
        components:{
            BaseLink,
            CategoryIcon
        },
    }
</script>


<style lang="scss" scoped>
    
</style>
