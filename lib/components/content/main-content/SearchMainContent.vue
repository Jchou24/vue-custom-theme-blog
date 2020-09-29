<template>
    <MainContentLayout class="search" :is_minimal_init="true">
        <Search/>
    </MainContentLayout>
</template>

<script>
    import MainContentLayout from './layout/MainContentLayout.vue'

    export default {
        name: "SearchMainContent",
        components:{
            MainContentLayout,
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
            this.$options.components.Search = () => import('./components/search/Search.vue')
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
