<template>
    <div class="category-file-viewer text-shadow-1">
        <div class="category-file-title">
            <router-link :to="article.regularPath">
                <FileIcon/> {{ article.title }}
            </router-link>
        </div>
        <div class="category-file-metainfo">
            <CategoryFileMetainfoTransition>
                <CreateDate class="date" :article="article" 
                    v-if="$store.state.category.is_show.datetime"
                    />
            </CategoryFileMetainfoTransition>
            <CategoryFileMetainfoTransition>
                <LastUpdateDate class="date" :article="article" 
                    v-if="$store.state.category.is_show.update_datetime"
                    />
            </CategoryFileMetainfoTransition>
            <CategoryFileMetainfoTransition>                
                <Tags :article="article" :is_show_count="false"
                    v-if="$store.state.category.is_show.tag"
                    />
            </CategoryFileMetainfoTransition>
        </div>
    </div>
</template>

<script>
    import FileIcon from '@theme/components/common/icon/FileIcon.vue'
    import CategoryFileMetainfoTransition from '@theme/components/common/transition/CategoryFileMetainfoTransition.vue'
    import CreateDate from '@theme/components/common/CreateDate.vue'
    import LastUpdateDate from '@theme/components/common/LastUpdateDate.vue'
    import Tags from '@theme/components/common/Tags.vue'

    export default {
        name: "CategoryFileViewer",
        components:{
            FileIcon,
            CategoryFileMetainfoTransition,
            CreateDate,
            LastUpdateDate,
            Tags,
        },
        props:{
            article_id:{}
        },
        data() {
            return {
            }
        },
        computed:{
            article:{
                get(){
                    return this.$articles_hash[this.article_id]
                }
            },
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

<style lang="scss" scoped>

</style>
