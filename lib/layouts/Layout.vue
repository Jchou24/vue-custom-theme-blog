<template>
    <BaseLayout :root_class="current_layout.toLowerCase()" :is_search_page="is_search_page" :is_full_page="is_full_page" >
        
        <template v-slot:nav>
            <NavArea 
                :is_category_page="is_category_page" 
                :is_tag_page="is_tag_page"
                :is_archive_page="is_archive_page"
                :is_search_page="is_search_page"
                :is_index_page="is_index_page"
                :is_full_page="is_full_page"
            />
        </template>

        <template v-slot:sidebar>
            <component
                :is="sidebar_component"
            />
        </template>

        <template v-slot:content>
            <component
                :is="content_component"  
                :key="$route.name"
            />
        </template>

        <template v-slot:full-page>
            <component
                :is="content_component"  
                :key="$route.name"
            />
        </template>

    </BaseLayout>
</template>

<script>
    import BaseLayout from './BaseLayout.vue'

    import AboutFullPage from '@theme/components/content/main-content/AboutFullPage.vue'
    import PostMainContent from '@theme/components/content/main-content/PostMainContent.vue'
    import TagMainContent from '@theme/components/content/main-content/TagMainContent.vue'
    import ArchiveMainContent from '@theme/components/content/main-content/ArchiveMainContent.vue'
    import SearchMainContent from '@theme/components/content/main-content/SearchMainContent.vue'

    import PostSidebar from '@theme/components/content/sidebar/PostSidebar.vue'
    import ArchiveSidebar from '@theme/components/content/sidebar/ArchiveSidebar.vue'
    import SearchSidebar from '@theme/components/content/sidebar/SearchSidebar.vue'

    import { mapMutations } from 'vuex'

    export default {
        name: "Layout",
        components:{
            BaseLayout,

            AboutFullPage,

            PostMainContent,
            TagMainContent,
            ArchiveMainContent,
            SearchMainContent,

            PostSidebar,
            ArchiveSidebar,
            SearchSidebar,
        },
        data(){
            return {
                
            }
        },
        computed: {
            is_category_page:{
                get(){
                    return this.current_layout == "Category"
                }
            },
            is_tag_page:{
                get(){
                    return this.current_layout == "Tag"
                }
            },
            is_archive_page:{
                get(){
                    return this.current_layout == "Archive"
                }
            },
            is_search_page:{
                get(){
                    return this.current_layout == "Search"
                }
            },
            is_index_page:{
                get(){
                    return this.current_layout == "Index"
                }
            },
            is_not_found:{
                get(){
                    return this.$page.path ? false : true
                }
            },
            is_full_page:{
                get(){
                    return this.$frontmatter.layout == "AboutFullPage"
                }
            },
            current_layout:{
                get(){
                    if( this.is_not_found ){
                        return 'NotFound'
                    }

                    let layout = this.$frontmatter.layout || "Post"
                    switch (this.$page.path) {
                        case "/":
                            layout = "Index"
                            break
                    
                        case "/category/":
                            layout = "Category"
                            break

                        case "/tag/":
                            layout = "Tag"
                            break

                        case "/archive/":
                            layout = "Archive"
                            break

                        case "/search/":
                            layout = "Search"
                            break
                    
                        default: // for post
                            layout = layout == "Layout" ? "Post" : layout
                            break
                    }
                    return layout                    
                }
            },
            sidebar_component:{
                get(){
                    let component = ""
                    switch (this.current_layout) {
                        case "Index":
                            component = "IndexSidebar"
                            break;
                        case "Category":
                            component = "CategorySidebar"
                            break;
                        case "Tag":
                            component = "CategorySidebar"
                            break;
                        case "Archive":
                            component = "ArchiveSidebar"
                            break;
                        case "Search":
                            component = "SearchSidebar"
                            break;
                        case "Post":
                            component = "PostSidebar"
                            break;
                        default: // NotFound
                            component = this.$frontmatter.layout
                            break;
                    }
                    return component
                }
            },
            content_component:{
                get(){
                    let component = ""
                    switch (this.current_layout) {
                        case "Index":
                            component = "IndexMainContent"
                            break;
                        case "Category":
                            component = "CategoryMainContent"
                            break;
                        case "Tag":
                            component = "TagMainContent"
                            break;
                        case "Archive":
                            component = "ArchiveMainContent"
                            break;
                        case "Search":
                            component = "SearchMainContent"
                            break;
                        case "Post":
                            component = "PostMainContent"
                            break;
                        case "AboutFullPage":
                            component = "AboutFullPage"
                            break;
                    
                        default: // NotFound
                            break;
                    }
                    return component
                }
            },
        },
        methods:{
            init(){
                this.init_firebase(this.$site.themeConfig.firebase)
            },
            ...mapMutations('firebase',[
                'init_firebase',
            ])
        },
        beforeMount(){
            this.$options.components.CategorySidebar = () => import('@theme/components/content/sidebar/CategorySidebar.vue')
            this.$options.components.CategoryMainContent = () => import('@theme/components/content/main-content/CategoryMainContent.vue')
            this.$options.components.NavArea = () => import('@theme/components/nav/NavArea.vue')
            this.$options.components.IndexMainContent = () => import('@theme/components/content/main-content/IndexMainContent.vue')
            this.$options.components.IndexSidebar = () => import('@theme/components/content/sidebar/IndexSidebar.vue')
        },
        mounted(){
            this.init()
        }
    }
</script>

<style lang="scss" scoped>

</style>
