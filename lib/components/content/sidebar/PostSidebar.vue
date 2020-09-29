<template>
    <SidebarLayout>
        <template slot="icons">
            <SidebarIcon icon="toc" @change="toggle_layout_is('is_active_toc')" :is_actiable="is_toc_actiable"></SidebarIcon>
            <SidebarIcon icon="article_lists" @change="toggle_layout_is('is_active_article_lists')"></SidebarIcon>
            <SidebarIcon icon="recent_post" @change="toggle_layout_is('is_active_recent_post')"></SidebarIcon>
            <SidebarIcon icon="media_displayer"
                class="d-none d-sm-none d-md-none d-lg-none d-xl-block"
                :class="{'active-display': is_displayer_active }"
                @change="toggle_layout_is('is_displayer_active')"></SidebarIcon>
        </template>
        <template slot="content">
            <SidebarItem :is_show="is_active_toc && is_toc_actiable">
                <ClientOnly>
                    <ArticleContentTOC @change="set_is_toc_actiable" />
                </ClientOnly>
            </SidebarItem>

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
    import SidebarIcon from "@theme/components/common/icon/SidebarIcon.vue"
    import SidebarItem from "./elements/SidebarItem.vue"
    import ArticleContentTOC from "./components/ArticleContentTOC.vue"
    import MiniCategoryViewer from "./components/MiniCategoryViewer.vue"
    import SidebarRecentPost from "./components/SidebarRecentPost.vue"

    import { mapMutations } from 'vuex'

    export default {
        name: "PostSidebar",
        components:{
            SidebarLayout,
            SidebarIcon,
            SidebarItem,
            ArticleContentTOC,
            MiniCategoryViewer,
            SidebarRecentPost,
        },
        props:{
            
        },
        data(){
            return {
                is_toc_actiable: false
            }
        },
        watch:{
            
        },
        computed:{
            is_active_toc:{
                get(){
                    return this.$store.state.layout.is_active_toc
                }
            },
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
            is_displayer_active:{
                get(){
                    return this.$store.state.layout.is_displayer_active
                }
            },
        },
        methods:{
            set_is_toc_actiable(length){
                // console.log("catch toc change")
                this.is_toc_actiable = length > 0 ? true : false
                // console.log(this.is_toc_actiable)
            },
            ...mapMutations("layout",[
                "toggle_layout_is",
            ])
        },
        mounted(){
            //  console.log( this.$article_category_tree )
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>

</style>
