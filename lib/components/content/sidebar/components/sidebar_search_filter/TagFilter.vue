<template>
    <Multiselect 
        :value="$store.state.search.filter.tag.value"
        :options="$store.state.search.filter.tag.options"
        :maxHeight=250
        :limit=5
        :multiple="true" 
        :close-on-select="false" 
        :clear-on-select="false" 
        :hide-selected="true" 
        :preserve-search="true" 
        placeholder="Select Tag"
        label="name" 
        track-by="name"
        :custom-label="custom_label"
        selectLabel=""

        @input="set_tag_filter_value"
        v-scroller.noself.sub_target="scroller_setting"
        >
        <div slot="noResult">
            <div class="vue-treeselect__icon-container">
                <span class="vue-treeselect__icon-warning"></span>
            </div>
            <span class="vue-treeselect__tip-text vue-treeselect__no-results-tip-text">No results found...</span>
        </div>
    </Multiselect>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Multiselect from 'vue-multiselect'

    export default {
        name: "TagFilter",
        components:{
            Multiselect
        },
        props:{
            
        },
        data: function(){
            return {
                scroller_setting:{
                    sub_target:[
                        // 'div.multiselect__content-wrapper',
                        'ul.multiselect__content',
                    ]
                }
            }
        },
        computed:{

        },
        methods:{
            ...mapMutations('search',[
                'set_tag_filter_value'
            ]),
            custom_label({ name, count }) {
                return `${name} (${count})`
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

<style src='@theme/css/vue-multiselect.min.css'></style>

<style lang="scss">
    ul.multiselect__content{
        max-height: 250px;
    }
</style>
