<template>
    <MainContentLayout>
        <span class="category-main-content">
            <CategoryBarViewer 
                v-if="is_active_CategoryBarViewer"
                class="d-none d-sm-block"
                ref="category_bar_viewer" />
        
                <slot name="tag-manager"></slot>
            <CategoryViewer/>
        </span>
    </MainContentLayout>
</template>

<script>
    import MainContentLayout from './layout/MainContentLayout.vue'
    import CategoryBarViewer from './components/category/category_bar_viewer/CategoryBarViewer.vue'
    import CategoryViewer from './components/category/category_viewer/CategoryViewer.vue'
    import { mapMutations } from 'vuex'
    import { screen_size } from '@theme/js/utility.js'
    import { URLParser } from '@theme/js/url_handler.js'

    
    export default {
        name: "CategoryMainContent",
        components:{
            MainContentLayout,
            CategoryBarViewer,
            CategoryViewer,
        },
        data(){
            return {
            }
        },
        computed:{
            is_active_CategoryBarViewer:{
                get(){
                    this.$store.state.layout.app_resize
                    return screen_size() != 'xs'
                }
            }
        },
        watch:{
            "$route.query"(){
                let that = this
                
                let category_path = URLParser.get_category(that.$route)
                let category_id = { 
                    id: that.$store.state.category.inverted_id_map[ category_path ]
                }
                that.set_active_category(category_id)
            },
        },
        methods:{
            init(){
                let that = this

                let category_path = URLParser.get_category(that.$route)
                // console.log(category_path)
                that.set_original_category_path(category_path)
                that.refresh()
            },
            ...mapMutations('category',[ 
                'set_original_category_path',
                'set_active_category',
                'refresh',
            ]),
        },
        mounted(){
            this.init()
        },
        updated(){

        },
        destroyed(){

        }
    }
</script>

<style lang="scss">
    span.category-main-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        @media (min-width: $mediaquery-width-sm){ 
            overflow: auto;
        }
    }
</style>
