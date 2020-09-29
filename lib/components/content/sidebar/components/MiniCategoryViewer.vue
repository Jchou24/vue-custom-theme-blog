<template>
    <div class="article-lists sidebar-article-block">
        <header><h3>
            <i class="material-icons">description</i><span>Articles</span>
        </h3></header>

        <SidebarLiItem class="categories_value">
            <a href="" v-on:click.prevent=""
                v-b-tooltip.hover 
                title="Click to show complete path"
                ref="category_bar"
                >{{ current_categories_value }}</a>    
            <a href="" v-on:click.prevent="refresh()" class="article-lists-control">
                <i class="material-icons control-icon" v-b-tooltip.hover title="Back to current category.">refresh</i>
            </a>            
        </SidebarLiItem>

        <SidebarLiItem class="article-lists-control">
            <a href="" v-on:click.prevent="upside_category()">
                <h4 v-b-tooltip.hover title="Back to parent category">
                    <i class="material-icons folder">folder_open</i>...                       
                </h4>
            </a>
            <a href="" v-on:click.prevent="previous()" class="article-lists-control" v-b-tooltip.hover title="Undo">
                <i class="material-icons control-icon">navigate_before</i>
            </a>
            <a href="" v-on:click.prevent="next()" class="article-lists-control" v-b-tooltip.hover title="Redo">
                <i class="material-icons control-icon">navigate_next</i>
            </a>
        </SidebarLiItem>

        <SidebarLiItem 
            v-for="( category, index ) in current_categories"
            :key="category+index"
            >
            <a href="" v-on:click.prevent="downside_category(category)">
                <h4> <i class="material-icons folder">folder_open</i>{{ category }} </h4>
            </a>
        </SidebarLiItem>

        <SidebarArticleBlock
            v-for="( article, index ) in current_articles"
            :article="article"
            :is_add_article_icon="true"
            :key="index"
        />

    </div>
</template>

<script>
    import SidebarLiItem from '@theme/components/content/sidebar/elements/SidebarLiItem.vue'
    import SidebarArticleBlock from '../elements/SidebarArticleBlock.vue'
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import { iter_article_tree, set_array_prototype_equals } from '@theme/js/utility.js'

    set_array_prototype_equals()

    export default {
        name: "MiniCategoryViewer",
        components:{
            SidebarLiItem,
            SidebarArticleBlock
        },
        directives:{
            'b-tooltip': vBTooltip
        },
        data: function(){
            return {
                current_category_path: [],
                category_path_history: [],
                current_history_idx: 0,
                is_white_space: false,
            }
        },
        computed:{
            category_path:{
                get(){
                    return this.$page.category || []
                }
            },            
            current_articles:{
                get(){
                    // reactived by current_category_path
                    let that = this
                    let current_articles = []
                    let current_category_tree_node = iter_article_tree(that.current_category_path, that.$article_category_tree)
                    current_category_tree_node.id.forEach(idx => {
                        let article = that.$articles_hash[idx]
                        // console.log(article)
                        // remove index page
                        if( article.path != "/" ){
                            current_articles.push( that.$articles_hash[idx] )
                        }
                    });

                    function compare(a,b) {
                        if (a.datetime_dt > b.datetime_dt)
                            return 1;
                        if (a.datetime_dt < b.datetime_dt)
                            return -1;
                        return 0;
                    }
                    current_articles.sort(compare);
                    return current_articles
                }
            },
            current_categories:{
                get(){
                    // reactived by current_category_path
                    let that = this
                    let categories = Object.keys( iter_article_tree(that.current_category_path.slice(0,that.current_category_path.length), that.$article_category_tree).children )

                    categories.sort()
                    return categories
                }
            },
            current_categories_value:{
                get(){
                    // reactived by current_category_path, is_white_space
                    if( this.is_white_space ){
                        return "/"+this.current_category_path.join(" / ")
                    }else{
                        return "/"+this.current_category_path.join("/")
                    }  
                }
            },
        },
        watch:{
            category_path(new_value){
                // console.log( "watched category_path:", this.category_path )
                this.init_current_category_path()
            }
        },
        methods:{
            previous(){
                let that = this
                if( that.current_history_idx > 0 ){
                    that.current_history_idx --
                    that.current_category_path = that.category_path_history[that.current_history_idx].slice()
                    that.update()
                }
                // console.log("previous")
            },
            next(){
                let that = this
                if( that.current_history_idx + 1 < that.category_path_history.length ){
                    that.current_history_idx ++
                    that.current_category_path = that.category_path_history[that.current_history_idx].slice()
                    that.update()
                }
                // console.log("next")
            },
            upside_category(){
                let that = this
                if( that.current_category_path.length > 0 ){
                    that.current_category_path.length --

                    that.update_history()
                    that.update()
                }
            },
            downside_category(category){
                let that = this
                that.current_category_path.push( category )

                that.update_history()
                that.update()
            },
            refresh(){
                let that = this
                if( that.current_category_path.equals(that.category_path) == false ){
                    that.current_category_path = that.category_path.slice()

                    that.update_history()
                    that.update()
                }
            },
            update_history(){
                let that = this
                that.current_history_idx ++
                that.category_path_history.length = that.current_history_idx
                that.category_path_history.push( that.current_category_path.slice() )
            },
            init_current_category_path(){
                this.current_category_path = this.category_path ? this.category_path.slice() : []
            },
            update(){
                let that = this
                that.current_category_path = that.current_category_path.slice()
            },
            on_click(e){
                let that = this
                if(e.target != that.$refs.category_bar){
                    that.is_white_space = false
                }else{
                    that.is_white_space = !that.is_white_space
                }
            },
            init(){
                let that = this
                that.recycle()
                that.update()
                that.init_current_category_path()
                that.category_path_history.push( that.current_category_path.slice() )
                window.addEventListener('click', that.on_click)
            },
            recycle(){
                window.removeEventListener('click', this.on_click)
            }
        },
        mounted(){
            this.init()
        },
        beforeDestroy(){
            this.recycle()
        },
    }
</script>

<style lang="scss" scoped>

</style>
