<template>
    <treeselect 
        :value="$store.state.category.active_category" 
        :options="$store.state.category.options"
        :maxHeight=400
        :showCount="true"
        :showCountOnSearch="true"
        :alwaysOpen="true"
        :searchable="true"
        :flat="false"
        :defaultExpandLevel="5"
        :clearable="false"
        placeholder="Select Category"
        valueConsistsOf="BRANCH_PRIORITY"
        search-nested
        @select="set_active_category"
        v-scroller.noself.sub_target="scroller_setting"
    />
</template>

<script>
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import Treeselect from '@riophae/vue-treeselect'
    import { mapMutations } from 'vuex'
    import { add_treeselect_resize_handler } from '@theme/js/utility.js'

    export default {
        name: "CategoryViewerFilter",
        components:{
            Treeselect,
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
        watch:{
            
        },
        computed:{

        },
        methods:{
            init(){
                add_treeselect_resize_handler()
            },
            ...mapMutations('category',[ 
                'set_active_category',
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
