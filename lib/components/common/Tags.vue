<template>
    <span class="tags" v-if=" tag_.length > 0 ">
        <span class="tag-item" v-for="(t, index) in tag_" :key="index">
            <router-link 
                :to="{
                    path:'/tag/', 
                    query:{
                        tag: t,
                        category: category_.slice().join(',')
                    }
                }">
                {{ t }}
                <BBadge pill variant="light" v-if="tag_count[t] > 1 && is_show_count"> {{ tag_count[t] }} </BBadge>                
            </router-link>
        </span>
    </span>
</template>

<script>
    import BBadge from 'bootstrap-vue/es/components/badge/badge'
    import { iter_article_tree } from '@theme/js/utility.js'

    export default {
        name: "Tags",
        components:{
            BBadge
        },
        props:{
            article:{
                required: true,
                type: Object,
            },
            is_show_count:{
                type: Boolean,
                default: true
            }
        },
        computed:{
            tag_:{
                get(){
                    return this.article.tag ? this.article.tag.slice().sort() : []
                }
            },
            category_:{
                get(){
                    return this.article.category ? this.article.category : []
                }
            },
            tag_count:{
                get(){
                    return this.$article_category_tree && this.category_
                        ? iter_article_tree(this.category_, this.$article_category_tree)["tag"] 
                        : {}
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
