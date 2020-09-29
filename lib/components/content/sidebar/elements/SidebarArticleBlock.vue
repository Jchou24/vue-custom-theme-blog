<template>
    <SidebarLiItem>
        <router-link :to="article.regularPath">
            <h4> <FileIcon v-if="is_add_article_icon" /> {{ article.title }} </h4>
            <hr class="style-3" v-if="is_active_hr" />
            <CreateDate :article="article" ref="CreateDate"/>
            <LastUpdateDate :article="article" ref="LastUpdateDate"/>
        </router-link>        

        <div class="article-popover-btn" 
            v-if=" category_.length > 0 || tag_.length > 0 "
            >
            <BButton :id="'article-popover-info-'+idx"><i class="material-icons">arrow_drop_down</i></BButton>
        </div>

        <BPopover
            ref="BPopover"
            triggers="hover focus" title="" 
            :target="'article-popover-info-'+idx"  
            v-if=" category_.length > 0 || tag_.length > 0 "
            >
            <Categories :article="article" />
            <Tags :article="article" />
            <ArticleMetaExcerpt :article="article" />
        </BPopover>
    </SidebarLiItem>
</template>

<script>
    import { uuid, ToDateString } from '@theme/js/utility.js'

    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import BButton from 'bootstrap-vue/es/components/button/button'
    import BPopover from 'bootstrap-vue/es/components/popover/popover'

    import SidebarLiItem from './SidebarLiItem.vue'
    import FileIcon from '@theme/components/common/icon/FileIcon.vue'
    import CreateDate from '@theme/components/common/CreateDate.vue'
    import LastUpdateDate from '@theme/components/common/LastUpdateDate.vue'
    import Categories from '@theme/components/common/Categories.vue'
    import Tags from '@theme/components/common/Tags.vue'
    import ArticleMetaExcerpt from '@theme/components/common/ArticleMetaExcerpt.vue'

    export default {
        name: "SidebarArticleBlock",
        components:{
            BButton,
            BPopover,
            SidebarLiItem,
            FileIcon,
            CreateDate,
            LastUpdateDate,
            Categories,
            Tags,
            ArticleMetaExcerpt,
        },
        directives:{
            'b-tooltip': vBTooltip
        },
        props:[ 'article', 'is_add_article_icon' ],
        data: function(){
            return {
                idx: uuid(),
                popover_target: "aside.sidebar-content",
                is_active_hr: false,
            }
        },
        computed:{
            update_datetime:{
                get(){
                    try {
                        return ToDateString(this.article.update_datetime_dt)
                    } catch (error) {
                        return ""
                    }
                }
            },
            tag_:{
                get(){
                    return this.article.tag ? this.article.tag.slice().sort() : []
                }
            },
            category_:{
                get(){
                    return this.article.category ? this.article.category : []
                }
            }
        },
        methods:{
            init(){
                let that = this
                let target = document.querySelector(that.popover_target)
                if( target ){
                    target.addEventListener('ps-scroll-y', that.update_popover_location)
                }
            },
            set_is_active_hr(){
                let is_CreateDate_active = this.$refs.CreateDate ? this.$refs.CreateDate.is_active : false
                let is_LastUpdateDate_active = this.$refs.LastUpdateDate ? this.$refs.LastUpdateDate.is_active : false
                this.is_active_hr = is_CreateDate_active || is_LastUpdateDate_active
            },
            update_popover_location(){
                let that = this
                // force update popover location
                try {
                    that.$refs["BPopover"].updatePosition()
                } catch (error) {
                    // document.querySelector("aside.sidebar-content").removeEventListener('ps-scroll-y', update_popover_location)
                }
            },
            recycle(){
                let that = this
                let target = document.querySelector(that.popover_target)
                if( target ){
                    target.removeEventListener('ps-scroll-y', that.update_popover_location)
                }
            }
        },
        mounted(){
            let that = this
            that.init()

            that.$nextTick(()=>{
                that.set_is_active_hr()
            })
        },
        updated(){
            this.set_is_active_hr()
        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss">

    div.popover{
        padding-bottom: 10px;
    }

</style>
