<template>
    <MainContentLayout>
        <!-- ================================================= -->
        <!-- for index_waterfall -->
        <!-- <ArticleWaterfall v-if="is_active_ArticleWaterfall" :sample_size="8"/> -->
        <!-- ================================================= -->
        <ArticleCarousel />
        <ArticleList :articles="articles" />
    </MainContentLayout>
</template>

<script>
    import MainContentLayout from './layout/MainContentLayout.vue'
    // =================================================
    // for index_waterfall
    // import ArticleWaterfall from './components/article_waterfall/ArticleWaterfall.vue'
    // =================================================
    import ArticleCarousel from './components/article_carousel/ArticleCarousel.vue'
    import ArticleList from './components/article/ArticleList.vue'
    import { article_sort_function } from '@theme/js/article_sort_function.js'
    import { screen_size } from '@theme/js/utility.js'

    export default {
        name: "IndexMainContent",
        components:{ 
            MainContentLayout,
            // =================================================
            // for index_waterfall
            // ArticleWaterfall,
            // =================================================
            ArticleCarousel,
            ArticleList,
        },
        data(){
            let articles = this.$articles.slice()
            articles = articles.sort( article_sort_function.datetime_desc )
            
            return {     
                articles
            }
        },
        computed:{
            // =================================================
            // for index_waterfall
            // is_active_ArticleWaterfall:{
            //     get(){
            //         this.$store.state.layout.app_resize
            //         return screen_size() == "l" || screen_size() == "xl" 
            //     }
            // }
            // =================================================
        }
    }
</script>


<style lang="scss">
    
</style>
