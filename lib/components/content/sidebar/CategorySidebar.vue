<template>
    <SidebarLayout :is_display_sidebar_icons="is_display_sidebar_icons">
        <!-- <template slot="icons">
            <SidebarIcon icon="category_viewer" @change="toggle_layout_is('is_active_category_viewer')" />
            <SidebarIcon icon="recent_post" @change="toggle_layout_is('is_active_recent_post')" />
        </template> -->
        <template slot="content">
            <SidebarItem :is_show="is_active_category_viewer">
                <SidebarCategoryViewer/>
            </SidebarItem>

            <SidebarItem :is_show="is_active_recent_post">
                <SidebarRecentPost/>
            </SidebarItem>
        </template>
    </SidebarLayout>
</template>

<script>
    import SidebarLayout from "./layout/SidebarLayout.vue"
    import SidebarIcon from "@theme/components/common/icon/SidebarIcon.vue"
    import SidebarItem from "./elements/SidebarItem.vue"
    import SidebarCategoryViewer from "./components/SidebarCategoryViewer.vue"
    import SidebarRecentPost from "./components/SidebarRecentPost.vue"

    import { mapMutations } from 'vuex'
    import { screen_size } from '@theme/js/utility.js'

    export default {
        name: "CategorySidebar",
        components:{
            SidebarLayout,
            SidebarIcon,
            SidebarItem,
            SidebarCategoryViewer,
            SidebarRecentPost,
        },
        props:{
            
        },
        data: function(){
            return {
            }
        },
        computed:{
            is_active_category_viewer:{
                get(){
                    return this.$store.state.layout.is_active_category_viewer
                }
            },
            is_active_recent_post:{
                get(){
                    return this.$store.state.layout.is_active_recent_post
                }
            },
            is_display_sidebar_icons:{
                get(){
                    this.$store.state.layout.app_resize
                    return screen_size() != 'xl' ? false : true
                }
            }
        },
        methods:{
            ...mapMutations("layout",[
                "toggle_layout_is",
            ])
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
