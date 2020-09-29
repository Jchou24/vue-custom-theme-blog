<template>
    <MainContentLayout>
        <ArticleHeader/>
        <ArticleContent/>
        <ArticleFooter/>
    </MainContentLayout>
</template>

<script>
    import MainContentLayout from './layout/MainContentLayout.vue'
    import ArticleHeader from './components/article/ArticleHeader.vue'
    import ArticleContent from './components/article/ArticleContent.vue'
    import ArticleFooter from './components/article/ArticleFooter.vue'

    export default {
        name: "PostMainContent",
        components:{ 
            MainContentLayout,
            ArticleHeader,
            ArticleContent,
            ArticleFooter,
        },
        data(){
            return {      
            }
        },
    }
</script>

<style lang="scss">
    
</style>
