<template>
    <ResponsiveElement class="article-carousel" :get_class="get_class">
        <carousel-3d
            ref="carousel"
            :autoplay="false"
            :controlsVisible="true"
            :height="carousel_height"
            v-if="is_show_content"            
            >
            <slide 
                v-for="( article, index ) in articles"
                :key="index"
                :index="index"
            >
                <ArticleMeta
                    :is_for_search="false"
                    :article = "article"
                />
                
            </slide>
        </carousel-3d>
        <carousel-3d v-else
            :height="carousel_height"
            >
            <slide
                v-for="( i, index ) in [0, 1, 2, 3, 4]"
                :key="index"
                :index="index"
                >
                <div class="article-meta"></div>
            </slide>
        </carousel-3d>
        <div class="left-bg" @click="go_left_slide"></div>
        <div class="right-bg" @click="go_right_slide"></div>
        <MiniTimer 
            :total_steps="10000"
            startColor="#a1b7bd"
            stopColor="#73859e"
            innerStrokeColor="#2735488a"
            @refresh="go_right_slide"
            />
    </ResponsiveElement>
</template>

<script>
    import settings from "@theme/js/settings.js"
    import { screen_size } from "@theme/js/utility.js"
    import throttle from 'lodash.throttle'
    import _ from 'lodash'

    import { Carousel3d, Slide } from 'vue-carousel-3d'
    import ResponsiveElement from '@theme/components/common/ResponsiveElement.vue'
    import ArticleMeta from '@theme/components/common/ArticleMeta.vue'
    import MiniTimer from '@theme/components/common/progress/MiniTimer.vue'

    export default {
        name: "ArticleCarousel",
        components:{
            Carousel3d,
            Slide,
            ResponsiveElement,
            ArticleMeta,
            MiniTimer
        },
        props:{
            sample_size:{
                type: Number,
                default: 8
            },
            carousel_height:{
                type: Number,
                default: 275, 
            }
        },
        data(){
            return {
                articles: [],
            }
        },
        watch:{
            
        },
        computed:{
            is_show_content:{
                get(){
                    let that = this

                    return that.articles.length > 0
                }
            }
        },
        methods:{
            init(){
                let that = this
                that.recycle()
            },
            init_articles(){
                this.articles = this.get_articles()                
            },
            get_articles(){
                let that = this
                let tmp_articles = this.$articles.slice()
                let articles = []

                tmp_articles.forEach(article => {
                    if( article.title != settings.default_title ){
                        articles.push(article)
                    }
                });

                articles = _.sampleSize(articles, that.sample_size)

                return articles
            },
            recycle(){
                let that = this
            },
            go_left_slide(){
                if( this.$refs.carousel ){
                    this.$refs.carousel.goPrev()                    
                }
            },
            go_right_slide(){
                if( this.$refs.carousel ){
                    this.$refs.carousel.goNext()                    
                }
            },
            get_class(width){
                return width <= 390 ? "sm" : ""
            },
            remove_handleMousemove(){
                let that = this

                let carousel = that.$refs.carousel

                if(!carousel){
                    return
                }

                if ('ontouchstart' in window) {
                    carousel.$el.removeEventListener('touchmove', carousel.handleMousemove)
                } else {
                    carousel.$el.removeEventListener('mousemove', carousel.handleMousemove)
                }
            },
        },
        beforeMount(){
            
        },
        mounted(){
            let that = this

            that.init()

            that.$nextTick(() =>{
                setTimeout(()=>that.init_articles(), 500)
                setTimeout(()=>that.remove_handleMousemove(), 1000)
            })
        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss">
    
    .article-carousel{
        margin-left: 20px;
        margin-right: 20px;

        .carousel-3d-container,
        .carousel-3d-slider,
        .carousel-3d-slide{
            height: 277px !important;
        }

        .carousel-3d-container{
            margin-top: 0px;
            margin-bottom: 20px;            

            .carousel-3d-slide{
                border: none;
                background: none;
                opacity: 0.8 !important;
                &.current{
                    opacity: 1 !important;
                }
                margin: 0 auto;

                .article-meta {
                    height: 255px;
                    width: 100%;
                    margin-left: 0px !important;
                    margin-right: 0px !important;
                    display: flex;
                    flex-direction: column;


                    h3.title{
                        padding-bottom: 5px;
                        width: 95%;
                        margin: 0 auto;

                        a{
                            display: block;
                            display: -webkit-box;
                            line-height: 1;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            max-height: 70px;                            
                            height: 100%;
                            text-align: center;
                            margin-bottom: 5px;             
                        }
                    }

                    .article-body-scroller{
                        height: 100%;
                    }

                    .article-meta-info{
                        margin-top: 0px;
                    }
                }
            }
        } 
    }

    .article-carousel.sm .carousel-3d-container{
        .carousel-3d-slider,
        .carousel-3d-slide{
            width: 100% !important;
        }
    }

    @media (max-width: $mediaquery-width-sm) { 
        .article-carousel{
            margin-left: 5px;
            margin-right: 5px;

            .carousel-3d-container{
                margin-top: 10px;
                margin-bottom: 5px;
            }
        }
    } 

    @media (min-width: $mediaquery-width-sm) and (max-width: $mediaquery-width-md) { 
        .article-carousel{
            margin-left: 5px;
            margin-right: 5px;
        }
    }

    .article-carousel{
        div.mini-timer{
            position: absolute;
            right: 1%;
            bottom: 10px;
            color: #82959b;
        }

        &.sm{
            div.mini-timer{
                right: 1%;
                bottom: 4px;
                color: #273548;
            }   
        }
    } 
</style>

<style lang="scss" scoped>
    // $carousel-shadow: #1c2f45;
    $carousel-shadow: #3a4346;
    // $carousel-shadow: #5d6b6e;
    $carousel-background: #5d6b6e;
    $carousel-border-radius: 15px;
    $carousel-border-radius-sm: 5px;
    
    .article-carousel{
        position: relative;
        border-radius: $carousel-border-radius;
    }

    .article-carousel,
    .display {
        background: radial-gradient(circle, transparent 40%, $carousel-background  75%);
        box-shadow: inset 0px 0px 20px 11px $carousel-shadow;
    }

    .left-bg,
    .right-bg{
        position: absolute;
        height: 100%;
        top: 0;
        width: 50px;

        background: black;
        opacity: 0.7;

        &:hover{
            cursor: pointer;
            opacity: 0.4;
        }
    }

    .left-bg{
        left: 0;
        background: linear-gradient(to right, black, transparent);
        border-top-left-radius: $carousel-border-radius;
        border-bottom-left-radius: $carousel-border-radius;
    }

    .right-bg{
        right: 0;
        background: linear-gradient(to left, black, transparent);
        border-top-right-radius: $carousel-border-radius;
        border-bottom-right-radius: $carousel-border-radius;
    }    
    
    @media (max-width: $mediaquery-width-sm) { 
        .article-carousel{
            border-radius: $carousel-border-radius-sm;
            margin-left: 10px;
            margin-right: 10px;
        }

        .left-bg{
            border-top-left-radius: $carousel-border-radius-sm;
            border-bottom-left-radius: $carousel-border-radius-sm;
        }

        .right-bg{
            border-top-right-radius: $carousel-border-radius-sm;
            border-bottom-right-radius: $carousel-border-radius-sm;
        }    
    }

    .article-carousel.sm{
        .left-bg,
        .right-bg{
            width: 10%;
        }
    }
</style>
