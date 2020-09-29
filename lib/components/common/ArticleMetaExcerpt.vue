<template>
    <div class="ArticleMetaExcerpt" 
        :class="{
            active:is_active
        }"
        > 
        
        <div class="ArticleMetaExcerpt-excerpt excerpt"
            v-if="!is_for_search"
            >
            {{ article.excerpt }} 
        </div>

        <TextHighlight class="ArticleMetaExcerpt-search-excerpt excerpt"
            v-else
            :queries="search_terms"
            highlightClass="highlight-term"
            highlightComponent="span"
            >
            {{ search_excerpt }}
        </TextHighlight>

    </div>
</template>

<script>
    import escape from 'lodash.escape'
    import debounce from 'lodash.debounce'

    export default {
        name: "ArticleMetaExcerpt",
        components:{

        },
        props:{
            article:{
                required: true,
                type: Object
            },
            is_for_search:{
                type: Boolean,
                default: false,
            },
            start_length:{
                type: Number,
                default: 10,
            }
        },
        data: function(){
            return {

            }
        },
        computed:{
            search_query:{
                get(){
                    return this.$store.state.search.search_query.q || ""
                }
            },
            search_terms:{
                get(){
                    return this.search_query.split(" ").filter(function(el){ return el.length > 0 })
                }
            },
            search_excerpt:{
                get(){
                    let that = this
                    if( that.search_terms.length > 0 ){
                        let search_excerpt = that.article.pure_content
                        let start_pos = that.get_searched_term_start_pos(search_excerpt)

                        if (start_pos == null) { // no match term
                            return that.article.excerpt
                        }

                        search_excerpt = ( start_pos > 0 ? "... " : "" ) + search_excerpt.slice(start_pos)
                        return search_excerpt
                    }else{
                        return that.article.excerpt
                    }
                }
            },
            is_active:{
                get(){
                    let excerpt = !this.is_for_search ? this.article.excerpt : this.search_excerpt
                    return excerpt.length > 0
                }
            }
        },
        methods:{
            get_searched_term_start_pos(search_excerpt){
                let that = this

                let term_pos = [ search_excerpt.length ]
                that.search_terms.forEach(term => {
                    let match = search_excerpt.match(new RegExp(term, "i"))
                    if( match ){
                        term_pos.push(match.index)
                    }
                })
                term_pos = term_pos.filter( el => el >= 0)
                let start_pos = Math.min(...term_pos)
                if( start_pos == search_excerpt.length ){
                    return null
                }
                start_pos = start_pos > that.start_length ? start_pos - that.start_length : 0

                return start_pos
            },
        },
        beforeMount(){
            this.$options.components.TextHighlight = () => import('vue-text-highlight')
        },
        mounted(){

        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss">
    div.ArticleMetaExcerpt{
        span.highlight-term{
            color: #bd4c1b;
            font-weight: 800;

            background: none;
            border-radius: none;
        }
    }
</style>


<style lang="scss" scoped>
    $font-size: 16px;
    $line-height: 1.4;
    $lines-to-show: 3;

    .active .excerpt{
        display: block; /* Fallback for non-webkit */
        display: -webkit-box;
        max-width: 80%;
        max-height: calc( #{$font-size} * #{$line-height} * #{$lines-to-show} ); /* Fallback for non-webkit */
        margin: 0 auto;
        font-size: $font-size;
        line-height: $line-height;
        -webkit-line-clamp: $lines-to-show;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }

    div.ArticleMetaExcerpt.active{
        margin-top: 10px;
        color: $article_header-color;
        padding-top: 10px;
        padding-bottom: 12px;
    }
</style>
