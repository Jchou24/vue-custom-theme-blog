<template>
    <SidebarLayout class="search">
        <template slot="content">
            <SidebarItem>
                <SidebarSearchFilter />
            </SidebarItem>
        </template>
    </SidebarLayout>
</template>

<script>
    import SidebarLayout from "./layout/SidebarLayout.vue"
    import SidebarItem from "./elements/SidebarItem.vue"
    import SidebarSearchFilter from "./components/sidebar_search_filter/SidebarSearchFilter.vue"

    export default {
        name: "SearchSidebar",
        components:{
            SidebarLayout,
            SidebarItem,
            SidebarSearchFilter
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

<style lang="scss">
    @media (max-width: $mediaquery-width-sm) { 
        div.sidebar.search aside.sidebar-content{
            height: calc( 100vh - 60px - #{$header_nav-height} );
        }
    }
</style>
