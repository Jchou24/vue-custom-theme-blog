<template>
    <div class="archive-article-viewer">
        <div class="archive-article-viewer-year-group"
            :class="{xs: is_xs}"
            v-for="(article_group, index) in article_groups"
            >

            <div class="archive-article-viewer-year animated fadeInUp fast"
                :class="{xs: is_xs}"
                >
                <h2> {{ get_year(article_group) }}</h2>
                <p>({{ article_group.length }})</p>
                <hr class="style-1 animated fadeInUp fast delay-1s" v-if="is_xs"/>
            </div>
            
            <div class="archive-article-viewer-articles"
                :class="{xs: is_xs}"
                >
                <RippleTransitionFlip :is_first_active="is_first_transition">
                    <ArchiveArticleViewerArticleBlock 
                        v-for="(article, index) in article_group"
                            :article="article" 
                            :is_first="is_first_transition"
                            :index="index"
                            :key="index"
                            :data-index="index"
                    />
                </RippleTransitionFlip>
            </div>
        </div>
    </div>
</template>

<script>
    import RippleTransitionFlip from '@theme/components/common/transition/RippleTransitionFlip.vue'
    import ArchiveArticleViewerArticleBlock from './ArchiveArticleViewerArticleBlock.vue'
    import throttle from 'lodash.throttle'
    import { article_sort_function } from '@theme/js/article_sort_function.js'
    
    export default {
        name: "ArchiveArticleViewer",
        components:{
            RippleTransitionFlip,
            ArchiveArticleViewerArticleBlock
        },
        props:{
            is_first_transition:{
                type: Boolean,
                default: false,
            }
        },
        data(){
            let that = this
            let articles = that.$articles.slice()
            articles.sort(article_sort_function.datetime_asc)

            let groups = []
            let group = []
            let year = -1
            articles.forEach(function(article){
                let current_year = article.datetime_dt == "" ? -1 : article.datetime_dt.getFullYear()
                if( year != current_year ){
                    year = current_year
                    if( group.length > 0 ){
                        groups.push( group.slice() )
                    }
                    group = []
                }
                group.push( article )
            })
            if( group.length > 0 ){
                groups.push(group)
            }

            groups.reverse()
            groups.forEach( group => group.reverse() )

            return {
                article_groups: groups,
                is_xs: false
            }
        },
        methods:{
            init(){
                let that = this

                that.determin_is_xs()
                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(that.$el, throttle(that.determin_is_xs, 300))
                })                
            },
            determin_is_xs(){
                this.is_xs = this.$el.clientWidth <= 576? true : false
            },
            get_year(article_group){
                if( article_group[0].datetime_dt ){
                    return article_group[0].datetime_dt == "" ? "0000" : article_group[0].datetime_dt.getFullYear()
                }else{
                    return "0000"
                }
            },
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.init()
            })
        }
    }
</script>


<style lang="scss" scoped>
    $year-group-border-radius: 20px;
    $background-color: #ffffff94;

    div.archive-article-viewer{
        display: table;
        width: 100%;

        @media (max-width: $mediaquery-width-sm) { 
            padding: 5px;
            padding-top: 8px;
        }
    }
        
        div.archive-article-viewer-year-group{
            display: flex;
            flex-direction: row;
            background: $background-color;      


            @media (max-width: $mediaquery-width-sm) { 
                margin-right: 0px;
                flex-direction: column;
            }

            &.xs{
                flex-direction: column;
            }

            @media (max-width: $mediaquery-width-l) { 
                padding-left: 0px;
            }

            // Large devices (desktops, 992px and up)
            @media (min-width: $mediaquery-width-l) { 
                padding-left: 10%;
            }
        }

        div.article.sidebar_disactive div.archive-article-viewer-year-group{
            @media (max-width: $mediaquery-width-md) { 
                padding-left: 0px;
            }

            @media (min-width: $mediaquery-width-md) { 
                margin-right: 10%;
                margin-left: 10%;
            }
        }

        div.archive-article-viewer-year-group:first-child{
            border-top-left-radius: $year-group-border-radius;
            border-top-right-radius: $year-group-border-radius;
        }

        // last child is resize-sensor
        div.archive-article-viewer-year-group:nth-last-child(2){
            border-bottom-left-radius: $year-group-border-radius;
            border-bottom-right-radius: $year-group-border-radius;
        }   

            div.archive-article-viewer-year{
                margin-right: 10px;
                padding: 10px;
                padding-left: 20px;
                position: sticky;
                top: $header_nav_hidden-height;
                &.xs{
                    top: $header_nav-height;
                }
                @media (max-width: $mediaquery-width-sm) { 
                    top: 10px !important;
                }
                height: 100px;

                h2{
                    color: #828282;
                    font: bold 45px Helvetica, Verdana, sans-serif;
                    margin-bottom: 0;                 
                }

                p{
                    text-align: right;
                }

                @mixin archive-article-viewer-year-xs(){
                    margin-right: 0px;
                    padding-left: 0px;
                    height: 60px;
                    text-align: center;
                    z-index: 9990;
                    background: #f3f4f5f0;
                    border-radius: $year-group-border-radius;

                    & h2{
                        display: inline;
                        padding-left: 20px;
                    }

                    & p{
                        display: inline;
                    }

                    hr{
                        width: 100%;
                        position: relative;
                        top: -20px;
                    }
                }

                @media (max-width: $mediaquery-width-sm) { 
                    @include archive-article-viewer-year-xs();
                }  

                &.xs{
                    @include archive-article-viewer-year-xs();
                }
            }
            
            div.archive-article-viewer-articles{
                border-left: 2px solid black;
                padding-top: 10px;
                padding-bottom: 5px;
                padding-left: 5px;
                padding-right: 20px;
                width: 100%;

                @media (max-width: $mediaquery-width-sm) { 
                    border-left: 0px;
                }  

                &.xs{
                    border-left: 0px;
                }
            }
</style>
