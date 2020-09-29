<template>
    <div class="sidebar-recent-post sidebar-article-block">
        <header>
            <h3>
                <i class="material-icons">watch_later</i>Recent
                <CategoryFileMetainfoTransition mode="out-in">
                    <span v-if="is_sort_article_by_datetime" key="post">Post</span>
                    <span v-if="!is_sort_article_by_datetime" key="edit">Edit</span>
                </CategoryFileMetainfoTransition>
            </h3>
        </header>

        <SidebarLiItem class="control-menu">
            <i class="material-icons arrow"
                @click="previous_page_number()"
                >chevron_left</i>
            <MiniTimer
                @refresh="next_page_number()" 
                ref="mini_timer"
                />
            <i class="material-icons arrow"
                @click="next_page_number()"
                >chevron_right</i>

            <i class="material-icons toggle" v-b-tooltip.hover title="Show recent post"
                v-if="!is_sort_article_by_datetime"
                @click="toggle_articles()"
                >schedule</i>
            <i class="material-icons toggle" v-b-tooltip.hover title="Show recent edit"
                v-if="is_sort_article_by_datetime"
                @click="toggle_articles()"
                >update</i>
        </SidebarLiItem>

        <RippleTransition>
            <SidebarArticleBlock
                v-for="( article, index ) in display_articles"
                    :article="article"
                    v-bind:key="article.key"
                    v-bind:data-index="index"
            />
        </RippleTransition>

    </div>
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'

    import { article_sort_function } from '@theme/js/article_sort_function.js'
    import CategoryFileMetainfoTransition from '@theme/components/common/transition/CategoryFileMetainfoTransition.vue'
    import RippleTransition from '@theme/components/common/transition/RippleTransition.vue'
    import SidebarArticleBlock from '../elements/SidebarArticleBlock.vue'
    import SidebarLiItem from '../elements/SidebarLiItem.vue'
    import MiniTimer from '@theme/components/common/progress/MiniTimer.vue'

    export default {
        name: "SidebarRecentPost",
        components:{
            CategoryFileMetainfoTransition,
            RippleTransition,
            SidebarArticleBlock,
            SidebarLiItem,
            MiniTimer,
        },
        directives:{
            'b-tooltip': vBTooltip
        },
        props:{
            page_max_number:{
                type: Number,
                default: 5,
            },
            page_size:{
                type: Number,
                default: 5,
            }
        },
        data(){
            return{
                is_sort_article_by_datetime: true,
                display_articles: [],
                page_number: 0,
                current_page_number: 0,
            }
        },
        computed:{
            articles:{
                get(){
                    if( this.$site ){
                        let that = this
                        let sort_function = that.is_sort_article_by_datetime ? article_sort_function.datetime_desc : article_sort_function.update_datetime_desc
                        let articles = []
                        // that.$store.state.articles.forEach(function(article){
                        that.$site.pages.slice().filter( article => article.title ).forEach(function(article){
                            if( that.is_sort_article_by_datetime ){
                                articles.push(article)
                            }else{
                                if( article.update_datetime_dt && article.datetime_dt && article.update_datetime_dt > article.datetime_dt ){
                                    articles.push(article)
                                }
                            }
                        })

                        articles = articles.sort(sort_function)
                        return articles
                    }else{
                        return []
                    }
                }
            },
            page_max_number_:{
                get(){
                    return this.articles.length < this.page_max_number * this.page_size ? 
                        Math.ceil(this.articles.length / this.page_size) : 
                        this.page_max_number
                }
            }
        },
        methods:{
            toggle_articles(){
                let that = this

                that.is_sort_article_by_datetime = !that.is_sort_article_by_datetime

                that.$refs.mini_timer.reset()

                let current_page_number = that.current_page_number
                that.current_page_number = that.page_number
                that.page_number = current_page_number

                that.set_display_articles()
            },
            previous_page_number(){
                let that = this

                that.page_number--
                if( that.page_number == -1 ){
                    that.page_number = that.page_max_number_ - 1
                }

                that.set_display_articles()
                this.$refs.mini_timer.reset()
            },
            next_page_number(){
                let that = this

                that.page_number++
                if( that.page_number == that.page_max_number_ ){
                    that.page_number = 0
                }

                that.set_display_articles()
                this.$refs.mini_timer.reset()
            },
            set_display_articles(){
                let that = this
                let display_articles = []

                that.articles.forEach( (article, index) => {
                    if( that.page_number*that.page_size <= index && index < ( that.page_number + 1 )*that.page_size ){
                        display_articles.push( article )
                    }
                })
                that.display_articles = display_articles
                that.display_articles = that.display_articles.slice()
                if( that.page_max_number_ == 1 ){
                    that.$refs.mini_timer.stop()
                }
            }
        },
        mounted(){
            this.set_display_articles()        
        }
    }
</script>

<style lang="scss" scoped>

</style>
