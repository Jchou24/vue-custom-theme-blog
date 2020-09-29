<template>
    <CategoryMainContent>
        <template slot="tag-manager">
            <TagManager/>
        </template>
    </CategoryMainContent>
</template>

<script>
    import TagManager from './components/tag_manager/TagManager.vue'

    export default {
        name: "TagMainContent",
        components:{
            TagManager
        },
        props:{
            
        },
        data: function(){
            return {

            }
        },
        computed:{

        },
        methods:{

        },
        beforeMount(){
            this.$options.components.CategoryMainContent = () => import('./CategoryMainContent.vue')
        },
        mounted(){

        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss">
    
</style>
