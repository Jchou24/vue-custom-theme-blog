<template>
    <SidebarLayout>
        <template slot="content">
            <SidebarItem>
                <MiniCategoryViewer/>
            </SidebarItem>
            <SidebarItem>
                <SidebarRecentPost/>
            </SidebarItem>    
        </template>
    </SidebarLayout>
</template>

<script>
    import SidebarLayout from "./layout/SidebarLayout.vue"
    import SidebarItem from "./elements/SidebarItem.vue"
    import MiniCategoryViewer from "./components/MiniCategoryViewer.vue"
    import SidebarRecentPost from "./components/SidebarRecentPost.vue"

    export default {
        name: "ArchiveSidebar",
        components:{
            SidebarLayout,
            SidebarItem,
            MiniCategoryViewer,
            SidebarRecentPost,
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
