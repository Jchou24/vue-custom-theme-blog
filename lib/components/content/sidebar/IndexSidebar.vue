<template>
    <SidebarLayout>
        <template slot="icons" v-if="is_active_sidebar_icons">
            <!-- ================================================= -->
            <!-- for index_waterfall -->
            <!-- <WaterfallControllIcon icon="refresh_water_flow" @clicked="trigger_refresh_waterfall()"/>
            <WaterfallControllIcon icon="pause_water_flow"   @clicked="trigger_pause_waterfall()"/>
            <WaterfallControllIcon icon="play_water_flow"    @clicked="trigger_start_waterfall()"/> -->
            <!-- ================================================= -->
        </template>
        <template slot="content">
            <SidebarItem :is_show="is_active_article_lists">
                <MiniCategoryViewer/>
            </SidebarItem>

            <SidebarItem :is_show="is_active_recent_post">
                <SidebarRecentPost/>
            </SidebarItem>
        </template>
    </SidebarLayout>
</template>

<script>
    import SidebarLayout from "./layout/SidebarLayout.vue"
    // =================================================
    // for index_waterfall
    // import WaterfallControllIcon from "@theme/components/common/icon/WaterfallControllIcon.vue"
    // =================================================
    import SidebarItem from "./elements/SidebarItem.vue"
    import MiniCategoryViewer from "./components/MiniCategoryViewer.vue"
    import SidebarRecentPost from "./components/SidebarRecentPost.vue"

    import { mapMutations } from 'vuex'
    import { screen_size } from '@theme/js/utility.js'

    export default {
        name: "IndexSidebar",
        components:{
            SidebarLayout,
            // =================================================
            // WaterfallControllIcon,
            // =================================================
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
            is_active_article_lists:{
                get(){
                    return this.$store.state.layout.is_active_article_lists
                }
            },
            is_active_recent_post:{
                get(){
                    return this.$store.state.layout.is_active_recent_post
                }
            },
            is_active_sidebar_icons:{
                get(){
                    this.$store.state.layout.app_resize
                    return screen_size() == "l" || screen_size() == "xl" 
                }
            }
        },
        methods:{
            ...mapMutations("layout",[
                "toggle_layout_is",
            ]),
            // =================================================
            // for index_waterfall
            // ...mapMutations("waterfall",[
            //     "trigger_refresh_waterfall",
            //     "trigger_pause_waterfall",
            //     "trigger_start_waterfall",
            // ]),
            // =================================================
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
