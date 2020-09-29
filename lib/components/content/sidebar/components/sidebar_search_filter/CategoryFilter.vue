<template>
    <Treeselect 
        :value="$store.state.search.filter.category.value"
        :options="$store.state.search.filter.category.options"
        :minHeight=200
        :maxHeight=300
        :limit=5
        :multiple="true" 
        :showCount="true"
        :showCountOnSearch="true"
        :alwaysOpen="true"
        :searchable="true"
        :flat="false"
        placeholder="Select Category"
        valueConsistsOf="BRANCH_PRIORITY"
        search-nested

        @input="set_category_filter_value"
        v-scroller.noself.sub_target="scroller_setting"
    />
</template>

<script>
    import { mapMutations } from 'vuex'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import { add_treeselect_resize_handler } from '@theme/js/utility.js'

    export default {
        name: "CategoryFilter",
        components:{
            Treeselect
        },
        props:{
            
        },
        data: function(){
            return {
                scroller_setting:{
                    sub_target:[
                        'div.vue-treeselect__menu',
                    ]
                }
            }
        },
        computed:{

        },
        methods:{
            init(){
                add_treeselect_resize_handler()
            },
            ...mapMutations('search',[
                'set_category_filter_value'
            ]),
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.init()
            })
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>

</style>
