<template>
    <ArticleList :articles="active_article" :is_for_search="true">
        <Searchbar ref="searchbar" />
    </ArticleList>
</template>

<script>
    import ArticleList from '@theme/components/content/main-content/components/article/ArticleList.vue'
    import Searchbar from './Searchbar.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: "Search",
        components:{
            ArticleList,
            Searchbar,
        },
        props:{
            
        },
        data(){
            return {

            }
        },
        computed:{
            ...mapGetters('search',[
                'active_article'
            ])
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
    
</style>
