<template>
    <div class="article-waterfall">
        <transition-group
            name="item"
            appear
            >
            <ArticleMeta
                :class="get_random_style()"
                :is_for_search="false"
                v-for="( article, index ) in current_articles"
                    :article = "article"
                    :key="index"
                    :data-index="index"
            />
        </transition-group>
    </div>
</template>
<script>
    import ArticleMeta from '@theme/components/common/ArticleMeta.vue'
    import _ from 'lodash'

    export default {
        name: "ArticleWaterfall",
        components:{
            ArticleMeta
        },
        props:{
            sample_size:{
                default: 20
            }
        },
        data(){
            return{
                articles: [],
                current_articles: [],
            }
        },
        watch:{
            "$store.state.waterfall.refresh_waterfall"(){
                this.shuffle()
            },
        },
        methods:{
            init(){
                let articles = this.$articles.slice()
                let current_articles = _.sampleSize(articles, this.sample_size)
                
                this.articles = articles
                this.current_articles = current_articles
            },
            shuffle() {
                let that = this

                that.current_articles = _.sampleSize(that.articles, that.sample_size)

                setTimeout(function(){
                    that.current_articles.sort(function () {
                        return Math.random() - 0.5
                    })
                },400)
            },
            get_random_style(){
                return `style-${_.sample([2,3,4,5])}`
            },
        },
        beforeMount(){
            this.init()
        },
    }
</script>

<style lang="scss">
    div.article-waterfall{
        width: calc( 100% - 20px );
        @media (max-width: $mediaquery-width-sm) { 
            width: 100%;
        }
        .article-meta{
            @include transition(transform, 0.5s, cubic-bezier(.55,0,.1,1));
            box-sizing: border-box;
            display: inline-block;
            margin: 10px !important;
            width: 100%;
            
            @media (max-width: $mediaquery-width-sm) { 
                width: calc( 100% - 10px - 10px );
            }
        }
    }
</style>

<style lang="scss" scoped>
    div.article-waterfall{
        -webkit-column-count: auto;
        -webkit-column-gap: 15px;
        -webkit-column-fill: balance;
        -webkit-column-width: 250px;
        -moz-column-count: auto;
        -moz-column-gap: 15px;
        -moz-column-fill: balance;
        -moz-column-width: 250px;
        column-count: auto;
        column-gap: 15px;
        column-fill: balance;
        column-width: 250px;
        padding: 0px;
        padding-bottom: 10px;
    }
</style>
