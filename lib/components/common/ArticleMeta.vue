<template>
    <div class="article-meta">
        
        <h3 class="title">
            <router-link :to="article.regularPath">{{ article.title }}</router-link>
        </h3>

        <div class="article-body-scroller" ref="scroller" >
            <ArticleMetaInfo class="article-meta-info" :article="article" />

            <ArticleMetaExcerpt class="article-meta-wordcloud" :article="article" :is_for_search="is_for_search" />

            <!-- <ArticleMetaWordCloud :article="article" /> -->
        </div>

    </div>
</template>

<script>
    import Scrollbar from 'smooth-scrollbar';
    import ArticleMetaInfo from './ArticleMetaInfo.vue'
    import ArticleMetaExcerpt from './ArticleMetaExcerpt.vue'
    // import ArticleMetaWordCloud from './ArticleMetaWordCloud.vue'

    export default {
        name: "ArticleMeta",
        components:{
            ArticleMetaInfo,
            ArticleMetaExcerpt,
            // ArticleMetaWordCloud,
        },
        props:{
            article:{
                required: true,
                type: Object
            },
            is_for_search:{
                type: Boolean,
                default: false,
            },
            scroller_setting:{
                type: Object,
                default: () => {

                },
            }
        },
        data: function(){
            return {
                scroller: null
            }
        },
        computed:{

        },
        methods:{
            init(){
                let that = this

                that.scroller = Scrollbar.init(that.$refs.scroller)
            },
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.init()
            })
        },
        updated(){

        },
        beforeDestroy(){
            Scrollbar.destroy()
        },
    }
</script>

<style lang="scss" scoped>

</style>
