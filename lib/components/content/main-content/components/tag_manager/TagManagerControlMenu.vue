<template>
    <div class="tag-manager-control-menu">
        <Multiselect 
            :value="$store.state.tag.value"
            :options="$store.state.tag.options"
            :maxHeight=250
            :limit=1
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

            @input="set_tag_value"
            v-scroller.noself.sub_target="scroller_setting"
            >
            <div slot="noResult">
                <div class="vue-treeselect__icon-container">
                    <span class="vue-treeselect__icon-warning"></span>
                </div>
                <span class="vue-treeselect__tip-text vue-treeselect__no-results-tip-text">No results found...</span>
            </div>
        </Multiselect>

        <TagsToggleManager/>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import TagsToggleManager from './TagsToggleManager.vue'
    import { mapMutations } from 'vuex'
    import { get_article_category_tree_with_valid_article } from '@theme/js/utility.js'

    export default {
        name: "TagManagerControlMenu",
        components:{
            Multiselect,
            TagsToggleManager
        },
        props:{
            
        },
        data: function(){
            return {
                scroller_setting:{
                    sub_target:[
                        'div.multiselect__content-wrapper',
                    ]
                },
            }
        },
        computed:{

        },
        watch:{
            "$store.state.tag.active_article_id"(new_value){
                let article_category_tree = get_article_category_tree_with_valid_article( this.$article_category_tree, new_value )
                this.set_article_category_tree(article_category_tree)
            }
        },
        methods:{
            ...mapMutations('tag',[ 
                'set_tag_value',
            ]),
            ...mapMutations('category',[ 
                'set_article_category_tree',
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
    div.tag-manager-control-menu{
        div.multiselect{
            width: 260px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;

            div.multiselect__tags{
                border: none;
                border-radius: 10px;

                background: #ffffff78;
                box-shadow: 
                    0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155,
                    1px 1px 20px 1px rgba(128,128,153,0.35) inset, 
                    1px 1px 40px 10px rgba(128,128,153,0.35) inset;

                span.multiselect__single{
                    background: none;
                    cursor: pointer;
                }

                input.multiselect__input{
                    background: none;
                }

                span.multiselect__tag{
                    // border: 1.5px #4a6686 solid;
                    border-radius: 7px;
                    color: $sidebar_filter_tag-color;
                    // background: $sidebar_filter_tag-color-background;
                    background: #4a668636;
                    font-weight: 700;
                    cursor: pointer;

                    i.multiselect__tag-icon:hover{
                        background: $sidebar_filter_tag-color;
                    }

                }

                span.multiselect__placeholder{
                    color: #35495e;
                    font-family: inherit;
                    font-size: 16px;
                    margin-bottom: 8px;
                    position: relative;
                    display: inline-block;
                    position: relative;
                    min-height: 20px;
                    line-height: 20px;
                    border: none;
                    border-radius: 5px;
                    padding: 0 0 0 5px;
                    width: 100%;
                    -webkit-transition: border .1s ease;
                    transition: border .1s ease;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    vertical-align: top;
                }                
            }

            div.multiselect__content-wrapper{
                margin-top: 4px;
                overflow: hidden;
                border: none;
                border-radius: 10px;
                background: #ffffff;
                box-shadow: 
                    0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155, 0px 0px 4px #304155,
                    1px 1px 20px 1px rgba(128,128,153,0.35) inset, 
                    1px 1px 40px 10px rgba(128,128,153,0.35) inset;

                span.multiselect__option.multiselect__option--highlight,
                .vue-treeselect__option--highlight{
                    color: $sidebar_filter_tag-color;
                    // background: $sidebar_filter_tag-color-background-hover;
                    background-image: linear-gradient(-90deg, #a8bac1 0%, #e1e6eb 3%, #e1e6eb 97%, #a8bac1 100%) !important;
                }
            }
        }

        span.tags span.tag-item.active{
            background: $anchor-color-active;
            color: $tags-color-border;
        }
    }
    
</style>
