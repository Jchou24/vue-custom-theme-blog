<template>
    <article class="article-header">
        <h1 class="title text-shadow-1">{{ $page.title }}</h1>

        <ArticleMetaInfo class="article-header-info" :article="$page" />
    </article>
</template>

<script>
    import { mapMutations } from 'vuex'
    import ArticleMetaInfo from "@theme/components/common/ArticleMetaInfo.vue"

    export default {
        name: "ArticleHeader",
        components:{
            ArticleMetaInfo
        },
        props:{
            
        },
        data: function(){
            return {

            }
        },
        computed:{
            
        },
        methods:{
            init(){
                this.add_views({ url: this.$el.baseURI })
            },
            ...mapMutations('firebase',[
                "add_views",
            ])
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.init()
            })            
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>

</style>
