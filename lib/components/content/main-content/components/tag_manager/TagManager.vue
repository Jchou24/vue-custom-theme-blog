<template>
    <ResponsiveElement class="tag-manager"
        :get_class="maintance_size_class"
        >
        <TagManagerControlMenu/>
        <TagManagerMetaInfo ref="tag_manager_meta_info" />
    </ResponsiveElement>
</template>

<script>
    import ResponsiveElement from '@theme/components/common/ResponsiveElement.vue'
    import TagManagerControlMenu from './TagManagerControlMenu.vue'
    import throttle from 'lodash.throttle'
    import { mapMutations } from 'vuex'

    export default {
        name: "TagManager",
        components:{
            TagManagerControlMenu,
            ResponsiveElement,
        },
        props:{
            
        },
        data: function(){
            return {
            }
        },
        computed:{

        },
        watch:{
            "$store.state.category.active_category"(){
                this.reset_by_category_path(this.$store.state.category.active_category_path)
            },
        },
        methods:{
            init(){
                let that = this
            },
            maintance_size_class(width){
                return width >= 650 ? "lg" : "sm"
            },
            ...mapMutations('tag',[
                'reset_by_category_path'
            ])
        },
        beforeMount(){
            this.$options.components.TagManagerMetaInfo = () => import('./TagManagerMetaInfo.vue')
        },
        mounted(){
            this.init()  
        },
        updated(){

        },
        beforeDestroy(){
            
        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss">
    // div.tag-manager[min-width~="650px"]{
    div.tag-manager.lg{
        display: flex;
        flex-direction: row !important;
        padding: 15px;
        padding-bottom: 0px;

        div.tag-manager-control-menu{
            width: 65%;

            div.tags-toggle-manager{
                span.tags{
                    // justify-content: flex-start;
                }
            }
        }

        div.tag-manager-meta-info{
            width: 35%;
        }
    }

    // div.tag-manager[max-width~="650px"]{
    div.tag-manager.sm{
        display: flex;
        flex-direction: column !important;
        padding-top: 15px;

        div.tag-manager-control-menu{

        }

        div.tag-manager-meta-info{
            display: flex;
            flex-direction: column-reverse;
        }
    }
</style>


<style lang="scss">
    div.tag-manager{
        $background: #ffffff8a;
        background: $background;
        border-radius: $card-border-radius;
        padding: $card-border-radius;
        padding-top: 20px;
        @media (max-width: $mediaquery-width-sm) {
            margin-right: 0px;
        }
        margin-bottom: 15px;
    }  
</style>
