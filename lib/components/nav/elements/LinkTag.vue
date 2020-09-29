<template>
    <BaseLink to="/tag/" title="Tag">
        <template #icon>
            <TagIcon/>
        </template>
    </BaseLink>
</template>

<script>
    import BaseLink from './BaseLink.vue'
    import TagIcon from '@theme/components/common/icon/TagIcon.vue'
    
    export default {
        name: "LinkTag",
        components:{
            BaseLink,
            TagIcon
        },
    }
</script>


<style lang="scss" scoped>
    
</style>
