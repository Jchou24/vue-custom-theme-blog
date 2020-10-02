<template>
    <nav class="nav-header disactive-search"
        v-bind:class="{
            'active-display': is_active_display,
            'active-displayer': is_displayer_active,
            'hidden': is_full_screen,
            'full-page': is_full_page,
            }"
        >

        <div class="view-container">
        
            <NavBar :is_full_page="is_full_page"/>

            <!-- for category page -->
            <!-- For xs size -->
            <ClientOnly>
                <CategoryBarViewer 
                    v-if="is_active_CategoryBarViewer"
                    class="d-sm-none d-block animated fadeInDown fastest"
                    />
            </ClientOnly>

            <!-- for index page -->
            <!-- for index_waterfall -->
            <!-- <CountdownTimer v-if="is_active_CountdownTimer" @refresh="trigger_refresh_waterfall()" /> -->

            <ReadingProgress
                :is_category_page="is_category_page"
                :is_tag_page="is_tag_page"
                :is_archive_page="is_archive_page"
                :is_search_page="is_search_page"
                :is_index_page="is_index_page"
                />
        
        </div>

    </nav>

</template>

<script>
    import NavBar from './components/NavBar.vue'    
    import CategoryBarViewer from '@theme/components/content/main-content/components/category/category_bar_viewer/CategoryBarViewer.vue'

    import { mapMutations } from 'vuex'

    import { screen_size } from '@theme/js/utility.js'

    export default {
        name: "NavArea",
        components: { 
            NavBar,
            CategoryBarViewer,
        },
        props:{
            is_category_page:{
                type: Boolean,
                required: true,
            },
            is_tag_page:{
                type: Boolean,
                required: true,
            },
            is_archive_page:{
                type: Boolean,
                required: true,
            },
            is_search_page:{
                type: Boolean,
                required: true,
            },
            is_index_page:{
                type: Boolean,
                required: true,
            },
            is_full_page:{ // to control whether the layout is one column full screen
                type: Boolean,
                default: false,
            },
        },
        data(){
            return {
                
            }
        },
        computed:{
            is_displayer_active:{
                get(){
                    return false
                    // return this.$store.state.layout.is_displayer_active
                }
            },
            is_nav_header_active:{
                get(){
                    return this.$store.state.layout.is_nav_header_active
                }
            },
            is_sidebar_active:{
                get(){
                    return this.$store.state.layout.is_sidebar_active
                }
            },
            is_full_screen:{
                get(){
                    return this.$store.state.layout.is_full_screen
                }
            },
            is_active_CategoryBarViewer:{
                get(){
                    this.$store.state.layout.app_resize
                    return (this.is_category_page || this.is_tag_page) && !this.is_sidebar_active && screen_size() == 'xs'
                }
            },            
            is_active_display:{
                get(){
                    if( this.is_full_screen ){
                        return false
                    }
                    return this.is_nav_header_active || this.is_sidebar_active
                }
            },
            // =================================================
            // for index_waterfall
            // is_active_CountdownTimer:{
            //     get(){
            //         this.$store.state.layout.app_resize
            //         return this.is_index_page && ( screen_size() == "l" || screen_size() == "xl" )
            //     }
            // }
            // =================================================
        },
        methods:{
            // =================================================
            // for index_waterfall
            // ...mapMutations("waterfall",[
            //     "trigger_refresh_waterfall",
            // ])
            // =================================================
        },
        beforeMount(){
            this.$options.components.ReadingProgress = () => import('./components/ReadingProgress.vue')
            // =================================================
            // for index_waterfall
            // this.$options.components.CountdownTimer = () => import('./components/CountdownTimer.vue')
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
