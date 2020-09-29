<template>
    <div class="category-sort-list">
        <div class="sort-order">
            <i class="material-icons"
                @click="toggle_is_desc()"
                :class="{asc: $store.state.category.article_sort.is_desc}"
                >arrow_drop_down</i>
        </div>
        <div class="sort-option">
            <CategorySortListLi
                v-for="( option, index ) in sort_option "
                :target="option" 
                v-bind:key="index"
                v-bind:data-index="index"
                />
        </div>
    </div>
</template>

<script>
    import CategorySortListLi from './CategorySortListLi.vue'
    import { mapMutations } from 'vuex'

    export default {
        name: "CategorySortList",
        components:{
            CategorySortListLi
        },
        props:{
            
        },
        data() {
            return {
                sort_option: [ 'datetime', 'title' ]
            }
        },
        computed:{

        },
        methods:{
            toggle_is_desc(){
                let is_desc = !this.$store.state.category.article_sort.is_desc
                this.set_is_desc(is_desc)
                this.set_article_sort_function()
            },
            ...mapMutations('category',[
                'set_is_desc',
                'set_article_sort_function'
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
