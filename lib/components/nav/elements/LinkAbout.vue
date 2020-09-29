<template>
    <BaseLink to="/about/" title="About" icon="info" class="left-item d-none d-sm-none d-md-block" v-if="!is_sm_size" />
    <BaseLink to="/about/" icon="info" class="d-sm-block d-md-none" v-else />
</template>

<script>
    import BaseLink from './BaseLink.vue'
    
    export default {
        name: "LinkAbout",
        props:{
            is_sm_size:{
                type: Boolean,
                default: false,
            }
        },
        components:{
            BaseLink
        },
    }
</script>


<style lang="scss" scoped>
    
</style>
