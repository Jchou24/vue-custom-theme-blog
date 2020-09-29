<template>
    <MainContentLayout>
        <ArchiveArticleViewer :is_first_transition="is_archive_article_viewer_first_transition__" />
    </MainContentLayout>
</template>

<script>
    import MainContentLayout from './layout/MainContentLayout.vue'
    import ArchiveArticleViewer from './components/Archive/ArchiveArticleViewer.vue'
    import { mapMutations } from 'vuex'

    export default {
        name: "ArchiveMainContent",
        components:{
            MainContentLayout,
            ArchiveArticleViewer
        },
        props:{
            
        },
        data: function(){
            return {
                is_archive_article_viewer_first_transition__: false,
            }
        },
        computed:{
            is_archive_article_viewer_first_transition:{
                get(){
                    return this.$store.state.layout.is_archive_article_viewer_first_transition
                }
            }
        },
        watch:{
            
        },
        methods:{
            ...mapMutations("layout",[
                'set_layout'
            ])
        },
        beforeMount(){
            this.is_archive_article_viewer_first_transition__ = this.is_archive_article_viewer_first_transition
            this.set_layout({ key: "is_archive_article_viewer_first_transition", val: false })
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
