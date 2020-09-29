<template>
    <article class="article-footer">
        <Pagination/>
        <MessageBoard/>
    </article>
</template>

<script>
    import Pagination from './pagination/Pagination.vue'

    export default {
        name: "ArticleFooter",
        components:{
            Pagination
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

        },
        beforeMount(){
            this.$options.components.MessageBoard = () => import('./MessageBoard.vue')
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
