<template>
    <div class="category-filter sidebar-filter">
        <header><h3>
            <CategoryIcon/>
            <span>Category Viewer</span>
        </h3></header>

        <SidebarLiItem class="category-viewer-filter category-filter">
            <CategoryViewerFilter/>
        </SidebarLiItem>
    </div>
</template>

<script>
    import CategoryIcon from '@theme/components/common/icon/CategoryIcon.vue'
    import SidebarLiItem from '../elements/SidebarLiItem.vue'
    import CategoryViewerFilter from './sidebar_category_viewer/CategoryViewerFilter.vue'

    export default {
        name: "SidebarCategoryViewer",
        components:{
            CategoryIcon,
            SidebarLiItem,
            CategoryViewerFilter,
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
