<template>
    <div class="archive-article-viewer-article-block" :class="{ active: !is_first }">
        <h5 class="archive-article-viewer-article-block-meta">
            <div class="archive-article-viewer-article-block-meta-date">{{ get_datetime() }}</div>
            <BButton :id="'article-popover-info-'+article.key">
                <i class="material-icons"
                    :class="{disactive: category.length == 0 && tag.length == 0 }"
                    >
                    arrow_drop_down
                </i>
            </BButton>

            <router-link :to="article.regularPath">{{ article.title }}</router-link>
        </h5>

        <ClientOnly>
            <BPopover 
                ref="b-popover"
                placement="auto"
                triggers="hover focus" title="" 
                :target="'article-popover-info-'+article.key"  
                v-if=" category.length > 0 || tag.length > 0 "
                >

                <Categories :article="article" />
                <Tags :article="article" />
                <ArticleMetaExcerpt :article="article" />

            </BPopover>
        </ClientOnly>
    </div>
</template>

<script>
    import BButton from 'bootstrap-vue/es/components/button/button'
    // import BPopover from 'bootstrap-vue/es/components/popover/popover'

    import Categories from '@theme/components/common/Categories.vue'
    import Tags from '@theme/components/common/Tags.vue'
    import ArticleMetaExcerpt from '@theme/components/common/ArticleMetaExcerpt.vue'

    export default {
        name: "ArchiveArticleViewerArticleBlock",
        components:{
            BButton,
            // BPopover,
            Categories,
            Tags,
            ArticleMetaExcerpt,
        },
        props:{
            article:{
                type: Object
            },
            is_first:{
                type: Boolean,
            }
        },
        data(){
            return {
            }
        },
        computed:{
            tag:{
                get(){
                    return this.article.tag ? this.article.tag.slice().sort() : []
                }
            },
            category:{
                get(){
                    return this.article.category ? this.article.category : []
                }
            },
        },
        methods:{
            // init(){
            //     let that = this
            //     that.recycle()
            // },
            // update_popover_location(){
            //     // force update popover location
            //     try {
            //         this.$refs["b-popover"].updatePosition()
            //     } catch (error) {}
            // },
            get_datetime(){
                function pad(n, width, z) {
                    z = z || '0';
                    n = n + '';
                    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
                }

                let month = this.article.datetime_dt == "" ? "??" : pad(this.article.datetime_dt.getMonth() + 1, 2)
                let date = this.article.datetime_dt == "" ? "??" : pad(this.article.datetime_dt.getDate(), 2)
                return `${month}/${date}`
            },
            // recycle(){
            //     let that = this
            // }
        },
        beforeMount(){
            this.$options.components.BPopover = () => import('bootstrap-vue/es/components/popover/popover')
        },
        mounted(){
            
        },
        beforeDestroy(){
            
        }
    }
</script>

<style lang="scss" scoped>
    $date-background: #a5bfc780;
    $date-border-radius: 8px;
    $date-height: 30px;
    
    div.archive-article-viewer-article-block{
        opacity: 0;
        &.active{
            opacity: 1;
        }

        &:first-child{
            margin-top: 7px;
        }

        &:last-child{
            margin-bottom: 10px;
        }
    }

        .archive-article-viewer-article-block-meta{
            display: flex;
            font-weight: 400;
            margin-bottom: 15px;

            & > button,
            & > button.btn:active,
            & > button.btn:active:focus{
                all: initial;
                all: unset;
            }
    
            button{
                border: none;
                padding: 0px;
                background: $date-background;
                border-bottom-right-radius: $date-border-radius;
                border-top-right-radius: $date-border-radius;
                height: $date-height;
                
                &:active{
                    background: inherit;
                }
            }
        }

        .archive-article-viewer-article-block-meta{
            i.material-icons{
                position: relative;
                top: 2px;
                margin-right: 4px;

                &.disactive{
                    color: darkgrey;
                    cursor: auto;
                }
            }
        }

        .archive-article-viewer-article-block-meta{
            div.archive-article-viewer-article-block-meta-date{
                margin-left: 10px;
                width: 65px;
                height: $date-height;
                line-height: 27px;
                background: $date-background;
                padding-left: 13px;
                border-bottom-left-radius: $date-border-radius;
                border-top-left-radius: $date-border-radius;
            }
        }

        .archive-article-viewer-article-block-meta{
            a{
                color: inherit;
                margin-left: 10px;      
                line-height: 27px;         
            }
        }

</style>
