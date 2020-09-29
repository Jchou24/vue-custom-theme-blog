<template>
    <RippleTransition>
        <CategoryFileViewer
            v-for="( article_id, index ) in sorted_article_id(article_tree_node.id)"
                :article_id = article_id
            v-bind:key="article_id"
            v-bind:data-index="index"
            v-if="is_show"
        />
    </RippleTransition>
</template>

<script>
    import RippleTransition from '@theme/components/common/transition/RippleTransition.vue'
    import CategoryFileViewer from './CategoryFileViewer.vue'

    export default {
        name: "CategoryFilesViewer",
        components:{
            RippleTransition,
            CategoryFileViewer
        },
        props:{
            article_tree_node:{
                required: true,
                type: Object,
            },
            is_show:{
                default: true,
                type: Boolean,
            }
        },
        data() {
            return {
                article: this.$articles_hash[this.article_id]
            }
        },
        computed:{

        },
        methods:{
            sorted_article_id(ids){
                let that = this
                let articles = []
                ids = ids || []
                ids.forEach(id => {
                    articles.push( that.$articles_hash[id] )
                });

                articles.sort( that.$store.state.category.article_sort.sort_function )

                let sorted_ids = []
                articles.forEach( article => {
                    sorted_ids.push(article.id)
                })

                return sorted_ids
            },
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
