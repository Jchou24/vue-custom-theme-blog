<template>
    <div class="tags-toggle-manager">
        <span class="tags">
            <span class="tag-item" 
                v-for="( t, index ) in $store.state.tag.options"
                    :class="{active:is_tag_active(t)}"
                    :key="index"
                >
                <a href="" @click.prevent="toggle_tag(t)">
                    {{ t.name }}
                    <BBadge pill variant="light" v-if="t.count > 1"> {{ t.count }} </BBadge>                
                </a>
            </span>
        </span>
    </div>
</template>

<script>
    import BBadge from 'bootstrap-vue/es/components/badge/badge'
    import { mapMutations } from 'vuex'
    import { get_article_category_tree_with_valid_article } from '@theme/js/utility.js'

    export default {
        name: "TagsToggleManager",
        components:{
            BBadge
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
            is_tag_active(tag){
                let that = this
                let is_active = false
                that.$store.state.tag.value.forEach(function(t){
                    if( t.name == tag.name ){
                        is_active = true
                    }
                })
                return is_active
            },
            toggle_tag(tag){
                let that = this
                that.toggle_value(tag)
                that.set_tag_value( that.$store.state.tag.value )

                let article_category_tree = get_article_category_tree_with_valid_article( 
                    that.$article_category_tree, 
                    that.$store.state.tag.active_article_id )
                that.set_article_category_tree(article_category_tree)
            },
            ...mapMutations('tag',[ 
                'toggle_value',
                'set_tag_value',
            ]),
            ...mapMutations('category',[ 
                'set_article_category_tree',
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
