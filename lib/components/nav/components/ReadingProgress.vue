<template>
    <BProgress :value="value" variant="secondary" class="reading-progress" 
        v-if="active"
        />
</template>

<script>
    import BProgress from 'bootstrap-vue/es/components/progress/progress'
    import { mapGetters } from 'vuex'
    import throttle from 'lodash.throttle'
    import { screen_size } from '@theme/js/utility.js'

    export default {
        name: "ReadingProgress",
        components:{
            BProgress
        },
        props:{
            is_category_page:{
                type: Boolean,
                required: true,
            },
            is_tag_page:{
                type: Boolean,
                required: true,
            },
            is_archive_page:{
                type: Boolean,
                required: true,
            },
            is_search_page:{
                type: Boolean,
                required: true,
            },
            is_index_page:{
                type: Boolean,
                required: true,
            },
        },
        data: function(){
            return {
                value: 0,
                scroller_target: "html",
            }
        },
        computed:{
            page_type:{
                get(){
                    if( this.is_index_page ){
                        return "index"
                    }
                    if( this.is_category_page ){
                        return "category"
                    }
                    if( this.is_tag_page ){
                        return "tag"
                    }
                    if( this.is_archive_page ){
                        return "archive"
                    }
                    if( this.is_search_page ){
                        return "search"
                    }

                    return 'post'
                }
            },
            active:{
                get(){
                    this.get_screen_resize

                    if( this.is_category_page || this.is_tag_page || this.is_index_page || this.is_archive_page ){
                        return screen_size() == "xs"? !this.is_sidebar_active : false
                    }

                    return screen_size() == "xs"? !this.is_sidebar_active : true
                }
            },
            is_sidebar_active:{
                get(){
                    return this.$store.state.layout.is_sidebar_active
                }
            },
            ...mapGetters('layout',[
                'get_screen_resize'
            ])
        },
        methods:{
            init(){
                let that = this

                that.recycle()
                window.addEventListener('scroll', that.count_value)

                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(document.querySelector(that.scroller_target), throttle(that.count_value, 1)) 
                })
            }, 
            count_value_core(content=[]){
                let that = this
                let total_readed_dis = 0
                let total_dis = 0
                let view_height = document.querySelector("html").clientHeight

                content.forEach( (i) => {
                    let target = document.querySelector(i)
                    if( target ){
                        total_readed_dis += count_readed_distance(target)
                        total_dis += target.clientHeight
                    }
                })

                that.value = view_height + total_readed_dis >= total_dis ? 100 : total_readed_dis / total_dis * 100

                function count_readed_distance(el){
                    let nav_height = 69
                    let dis_to_top = el.getBoundingClientRect().top - nav_height

                    if( dis_to_top >= 0 ){
                        return 0
                    }
                    else{
                        // dis_to_top < 0
                        let abs_dis_to_top = Math.abs(dis_to_top)
                        let el_height = el.clientHeight
                        return abs_dis_to_top >= el_height ? el_height : abs_dis_to_top
                    }
                }
            },
            count_value(){
                let that = this

                let content = []

                switch (that.page_type) {
                    case "index":
                        content = ["div.article-waterfall", "span.search-result"]
                        break;
                    case "category":
                        content = ["div.category-viewer"]
                        break;
                    case "tag":
                        content = ["div.category-viewer", "div.tag-manager"]
                        break;
                    case "archive":
                        content = ["div.archive-article-viewer"]
                        break;
                    case "search":
                        content = ["span.search-result"]
                        break;
                    default:
                        content = ["article.article-content"]
                        break;
                }
                that.count_value_core( content )
            },
            recycle(){
                let that = this
                window.removeEventListener('scroll', that.count_value)
            }
        },
        watch:{
            "$store.state.layout.main_content_mounted"(){
                this.init()
            },
        },
        mounted(){
            this.init()
        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss">
    .reading-progress{
        display: flex;
        height: $reading_progress-height;

        @media (max-width: $mediaquery-width-sm) {
            border-radius: 0px;
            div.progress-bar.bg-secondary{
                background-color: $reading_progress-color-background !important;
            }
        }

        @media (min-width: $mediaquery-width-sm) and (max-width: $mediaquery-width-l) { 
            height: 5px;
            top: 57px;
            left: 0px;
            position: absolute;
            width: 100%;
            border-radius: 0px;
            background-color: unset;
            div.progress-bar.bg-secondary{
                background-color: $header-color-border !important;
            }
        }

        @media (min-width: $mediaquery-width-l) {
            height: 5px;
            top: -9px;
            left: 0px;
            position: relative;
            margin: 0 auto;
            width: calc( 100% - 18px);
            background-color: unset;
            border-bottom: 3px solid #a1b7bd;
            height: 5px;

            div.progress-bar.bg-secondary{
                height: 3px;
                background-color: $header-color-border !important;
            }
        }
    }
</style>
