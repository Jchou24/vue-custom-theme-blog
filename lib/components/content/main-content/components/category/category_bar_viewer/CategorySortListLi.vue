<template>
    <li
        v-b-tooltip.hover :title="'sort by '+target"
        @click="set_sort_function_name(target); set_article_sort_function()"
        :class="{ active: $store.state.category.article_sort.sort_function_name == target }"
        >
        {{ target }}
    </li>
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import { mapMutations } from 'vuex'

    export default {
        name: "CategorySortListLi",
        components:{
            
        },
        directives:{
            'b-tooltip': vBTooltip
        },
        props:{
            target:{}
        },
        data: function(){
            return {

            }
        },
        computed:{

        },
        methods:{
            ...mapMutations('category',[
                'set_sort_function_name',
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
