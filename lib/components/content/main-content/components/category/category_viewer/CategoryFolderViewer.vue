<template>
    <div class="category-folder-viewer">
        <span class="category-folder-raw"
            @click="check_downside()"
            >
            <i class="material-icons arrow"
                :class="{ down: is_expand }"
                >
                arrow_drop_down
            </i> 
            <span class="category-folder-raw-body text-shadow-1"
                @dblclick="downside()">
                <i class="material-icons folder text-shadow-2">folder_open</i> {{ category_name }}
            </span>
            <CategoryFileMetainfoTransition>
                <Tags :article="tmp_article_for_tag"
                    v-show="$store.state.category.is_show.tag"
                    />
            </CategoryFileMetainfoTransition>
        </span>

        <ul>
            <RippleTransition>
                <CategoryFolderViewer
                    v-for="( entry, index ) in Object.entries( article_tree_node.children )"
                        :category_path="[ ...category_path, entry[0] ]"
                        :article_tree_node="entry[1]"
                    v-bind:key="get_id()"
                    v-bind:data-index="index"
                    v-if="is_expand"
                />                    
            </RippleTransition>

            <CategoryFilesViewer :is_show="is_expand" :article_tree_node="article_tree_node" />
        </ul>

    </div>
</template>

<script>
    import CategoryFileMetainfoTransition from '@theme/components/common/transition/CategoryFileMetainfoTransition.vue'
    import RippleTransition from '@theme/components/common/transition/RippleTransition.vue'
    import Tags from '@theme/components/common/Tags.vue'
    import CategoryFilesViewer from './CategoryFilesViewer.vue'
    import CategoryFolderViewer from './CategoryFolderViewer.vue'

    import { mapMutations } from 'vuex'
    import { screen_size, uuid } from '@theme/js/utility.js'

    export default {
        name: "CategoryFolderViewer",
        components:{
            CategoryFileMetainfoTransition,
            RippleTransition,
            Tags,
            CategoryFilesViewer,
            CategoryFolderViewer,
        },
        props:{
            category_path:{},
            article_tree_node:{},
        },
        data() {
            return {
                is_expand: false,
            }
        },
        computed:{
            tmp_article_for_tag:{
                get(){
                    return {
                        tag: Object.keys(this.article_tree_node.tag),
                        category: this.category_path,
                    }
                }
            },
            category_name:{
                get(){
                    return this.category_path[this.category_path.length-1]
                }
            }
        },
        watch:{
        },
        methods:{
            get_id(){
                return uuid()
            },
            sorted_article_id(ids){
                let that = this
                let articles = []
                ids.forEach(id => {
                    articles.push( that.$store.state.articles_hash[id] )
                });

                articles.sort( that.$store.state.category.article_sort.sort_function )

                let sorted_ids = []
                articles.forEach( article => {
                    sorted_ids.push(article.id)
                })

                return sorted_ids
            },
            check_downside(){
                if( screen_size() != 'xs' ){
                    this.is_expand = !this.is_expand
                }else{
                    this.downside()
                }
            },
            downside(){
                let that = this
                let downside_category_id = { 
                    id: that.$store.state.category.inverted_id_map[ that.category_path ]
                }
                that.set_active_category(downside_category_id)
            },
            ...mapMutations('category',[ 
                'set_active_category',
            ]),
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
