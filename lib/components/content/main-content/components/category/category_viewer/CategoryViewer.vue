<template>
    <div class="category-viewer">
        <RippleTransition>
            <CategoryFolderViewer
                v-for="( entry, index ) in Object.entries( get_article_tree_node.children )"
                    :category_path="[ ...get_active_category_path, entry[0] ]"
                    :article_tree_node="entry[1]"
                v-bind:key="get_id()"
                v-bind:data-index="index"
            />
        </RippleTransition>

        <CategoryFilesViewer :article_tree_node="get_article_tree_node" />

    </div>
</template>

<script>
    import RippleTransition from '@theme/components/common/transition/RippleTransition.vue'
    import CategoryFolderViewer from './CategoryFolderViewer.vue'
    import CategoryFilesViewer from './CategoryFilesViewer.vue'
    import { mapGetters } from 'vuex'
    import { uuid } from '@theme/js/utility.js'

    export default {
        name: "CategoryViewer",
        components:{
            RippleTransition,
            CategoryFolderViewer,
            CategoryFilesViewer,
        },
        props:{
            
        },
        data: function(){
            return {

            }
        },
        computed:{
            ...mapGetters('category',[ 
                'get_active_category_path',
                'get_article_tree_node'
            ]),
        },
        methods:{
            get_id(){
                return uuid()
            }
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
