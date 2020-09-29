<template>
    <div v-if=" categories.length > 0 || tags.length > 0  || datetime || lastUpdate">

        <Categories :article="article" />
        <div class="article-meta-info-main">
            <hr class="style-1-2">

            <li class="datetime" v-if=" datetime || lastUpdate "> 
                <CreateDate :article="article" />
                <LastUpdateDate :article="article" />
            </li>

            <li class="count">
                <DisqusCount :identifier="article.path" />
                <ArticleViewsCount :article="article" />
            </li>
            
            <li 
                v-if="tags.length > 0">
                <Tags :article="article" />
            </li>

            <hr class="style-1-2">
        </div>
        <Keywords class="article-meta-info-keywords" :article="article" />
    </div>
</template>

<script>
    import CreateDate from './CreateDate.vue'
    import LastUpdateDate from './LastUpdateDate.vue'
    import Categories from './Categories.vue'
    import Tags from './Tags.vue'
    import Keywords from './Keywords.vue'
    import ArticleViewsCount from './ArticleViewsCount.vue'

    export default {
        name: "ArticleMetaInfo",
        components:{
            CreateDate,
            LastUpdateDate,
            Categories,
            Tags,
            Keywords,
            ArticleViewsCount
        },
        props:{
            article:{
                required: true,
                type: Object
            }
        },
        data: function(){
            return {

            }
        },
        computed:{
            datetime:{
                get(){
                    return this.article.datetime_dt
                }
            },
            lastUpdate:{
                get(){
                    return this.article.update_datetime_dt
                }
            },
            categories:{
                get(){
                    return this.article.category || []
                }
            },
            tags:{
                get(){
                    return this.article.tag || []
                }
            },
        },
        methods:{

        },
        beforeMount(){
            this.$options.components.DisqusCount = () => import('./DisqusCount.vue')
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
    .article-meta-info-keywords{
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
