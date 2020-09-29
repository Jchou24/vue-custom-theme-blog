<template>
    <span class="Search">

        <slot></slot>

        <RippleTransition class="search-result">
            <ArticleMeta
                v-for="( article, index ) in articles"
                    v-if="(pageNumber-1)*pageSize <= index && index < pageNumber*pageSize"
                        :article = "article"
                        :is_for_search = "is_for_search"
                v-bind:key="article.key"
                v-bind:data-index="index"
            />
        </RippleTransition>

        <div class="article-meta-footer">
            <v-page 
                v-show="articles.length > 0"
                :setting="{ ...pageSet, ...{ totalRow: articles.length } }" 
                :class="{ sm: is_pagination_sm }"
                @page-change="pageChange"
                ref="v_page"
                />
        </div>
    </span>
</template>

<script>
    import RippleTransition from '@theme/components/common/transition/RippleTransition.vue'
    import ArticleMeta from '@theme/components/common/ArticleMeta.vue'
    import 'jquery-ui/ui/effect.js'
    import throttle from 'lodash.throttle'
    import { scroll_article } from '@theme/js/scroller.js'

    export default {
        name: "ArticleList",
        components:{
            RippleTransition,
            ArticleMeta,
        },
        props:{
            articles:{
                required: true,
                type: Array,
            },
            is_for_search:{
                type: Boolean,
                default: () => false
            }
        },
        data(){
            let init_pageSize = 10
            return {
                pageSet: { 
                    totalRow: 0, //required option
                    language: 'en', //default: 'cn'
                    pageSizeMenu: [init_pageSize, 20, 50, 100], //default: [10, 20, 50, 100]
                    align: "center"
                },
                pageNumber: 1,
                pageSize: init_pageSize,
                is_pagination_sm: false
            }
        },
        watch:{
            articles(){
                this.$refs.v_page.currentPage = 1
            },
        },
        methods:{
            set_is_pagination_sm(ul){
                this.is_pagination_sm = ul.clientWidth < 440 ? true : false
            },
            init(){
                let that = this

                let ul = that.$el.querySelector("div.vPagination.vPaginationCenter ul")
                that.set_is_pagination_sm(ul)
                import('resize-sensor').then(ResizeSensor => {                    
                    ResizeSensor.default(ul, throttle(function(){
                        that.set_is_pagination_sm(ul)
                    }, 500)) 
                })
            },
            pageChange( pInfo ){
                this.pageNumber = pInfo.pageNumber
                this.pageSize = pInfo.pageSize

                let scroller_element = 'div.article'
                let new_top = document.querySelector("div.article-waterfall")
                new_top = new_top ? new_top.clientHeight : 0
                scroll_article( new_top, document.querySelector(scroller_element).scrollTop )
            },
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

<style lang="scss">
    span.search-result{
        display: inline-block;
        width: 100%;
        @media (max-width: $mediaquery-width-sm) {
            padding-left: 5px;
            padding-right: 5px;
        }
    }

    div.article-meta-footer{
        div.vPagination.vPaginationCenter{
            $pagination-border-radius: 10px;

            &.sm ul{
                li{
                    &:nth-child(1) a, &:nth-child(2) a{
                        border-radius: $pagination-border-radius;
                    }

                    &:nth-child(3) a{
                        border-top-left-radius: $pagination-border-radius;
                        border-bottom-left-radius: $pagination-border-radius;
                    }

                    &:nth-last-child(2) a{
                        border-top-right-radius: $pagination-border-radius;
                        border-bottom-right-radius: $pagination-border-radius;
                    }
                }
            }

            ul{
                display: flex;
                flex-flow: row wrap;
                align-content: center;
                justify-content: center;
                box-shadow: none;

                li{
                    display: contents;
                    & a{
                        float: none;
                        margin-bottom: 5px;
                    }

                    &:nth-child(2)::after{
                        content: '';
                        width: 100%;
                    }

                    &:first-child a{
                        border-top-left-radius: $pagination-border-radius;
                        border-bottom-left-radius: $pagination-border-radius;
                    }

                    &:nth-child(2) a{
                        border-top-right-radius: $pagination-border-radius;
                        border-bottom-right-radius: $pagination-border-radius;
                    }

                    &:nth-child(3) a{
                        border-top-left-radius: $pagination-border-radius;
                        border-bottom-left-radius: $pagination-border-radius;
                    }

                    &:nth-last-child(2) a{
                        border-top-right-radius: $pagination-border-radius;
                        border-bottom-right-radius: $pagination-border-radius;
                    }
                }
            }
        }
    }
</style>
