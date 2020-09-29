<template>
    <div class="searchbar">
        <div class="search-input">
            <a href=""
                v-on:click.prevent=""
                :class="{focus: is_input_focus}" 
                >
                <i class="material-icons search">search</i>
            </a>      
            <i class="material-icons arrow"
                v-on:click="change_arrow()"
                :class="{focus: is_input_focus, up:is_arrow_up, down:!is_arrow_up}" 
                >
                arrow_drop_up
            </i>
            <input
                class="search"
                v-model="search_query.q"
                @focus="is_input_focus = true"
                @blur="is_input_focus = false"
                @keyup.down="check_open_suggestion()"
                @keydown.tab.prevent="check_select_suggestion()"
                :class="{focus: is_input_focus}"
                />
        </div>
        <div class="search-result-meta" :class="{sm: is_search_result_meta_sm}">
            <span> 
                <i class="material-icons navigation"
                    v-if="active_article.length > 0"    
                    >
                    navigation
                </i> 
                <i class="material-icons warning"
                    v-if="active_article.length == 0" 
                    >
                    warning
                </i> 
                Results: {{ active_article.length }} 
            </span>
            <span class="date"
                v-if=" get_date(false) && get_date(true) "
                >
                <i class="material-icons">update</i>
                <span class="min-date" v-if="get_date(false)">
                    {{ get_date(false) }}
                </span>
                <span class="max-date" v-if="get_date(true)">
                    ~ {{ get_date(true) }}
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Awesomplete from 'awesomplete/awesomplete.js'
    import $ from 'jquery'
    import throttle from 'lodash.throttle'
    import { ToDateString } from '@theme/js/utility.js'

    export default {
        name: "Searchbar",
        components:{
            
        },
        props:{
            
        },
        data(){
            return {
                search_query:{
                    // q: "",
                    q: this.$store.state.search.search_query.q,
                },            
                is_input_focus: false,
                is_arrow_up: false,
                max_date: this.get_date(true),
                min_date: this.get_date(false),
                awesomplete: null,
                is_search_result_meta_sm: false,
            }
        },
        computed:{
            active_article:{
                get(){
                    return this.$store.getters['search/active_article'] || []
                }
            },
        },
        methods:{
            init(){
                let that = this
                let input = document.querySelector("div.searchbar input.search");
                let awesomplete = new Awesomplete(input, {
                    filter: function(text, input) {
                        let check = input.split(" ")
                        check = $.trim(check[ check.length-1 ])
                        if( check.length > 0 ){
                            return Awesomplete.FILTER_CONTAINS(text, check.match(/[^,]*$/)[0]);
                        }
                    },
                
                    item: function(text, input) {
                        let check = input.split(" ")
                        check = $.trim(check[ check.length-1 ])
                        return Awesomplete.ITEM(text, check.match(/[^,]*$/)[0]);
                    },
                
                    replace: function(text) {
                        let before = that.search_query.q.split(" ")
                        before.pop()
                        that.search_query.q = before.join(" ") + " " + text + " "
                    }
                })
                this.awesomplete = awesomplete
                awesomplete.list = that.$store.state.search.lunr_idx.corpusTokens.elements

                that.set_resize_sensor()
            },
            set_is_search_result_meta_sm( meta_el ){
                this.is_search_result_meta_sm = meta_el.clientWidth <= 330 ? true : false
            },
            set_resize_sensor(){
                let that = this
                let meta_el = document.querySelector("div.search-result-meta")
                that.set_is_search_result_meta_sm(meta_el)
                import('resize-sensor').then(ResizeSensor => {                    
                    ResizeSensor.default(meta_el, throttle(function(){
                        that.set_is_search_result_meta_sm(meta_el)
                    }, 500)) 
                })
            },
            check_open_suggestion(){
                if( this.awesomplete.ul.hasAttribute('hidden') == true ){
                    this.awesomplete.evaluate()
                    if( document.querySelectorAll("div.awesomplete ul mark").length > 0 ){
                        this.awesomplete.open()
                    }else{
                        this.awesomplete.close()
                    }
                }            
            },
            check_select_suggestion(){
                if( this.awesomplete.ul.hasAttribute('hidden') == false ){
                    this.awesomplete.select()
                }
            },
            change_arrow(){
                this.is_arrow_up = !this.is_arrow_up
                this.sort_active_article_by_datetime( !this.is_arrow_up )
            },
            get_date( is_max ){
                if( this.active_article && this.active_article.length > 0 ){
                    let min = this.active_article[0]
                    let max = this.active_article[0]
                    this.active_article.forEach( article => {
                        if( article.datetime_dt ){
                            if( min.datetime_dt ){
                                if( article.datetime_dt < min.datetime_dt ){
                                    min = article
                                }
                            }else{
                                min = article
                            }

                            if( max.datetime_dt ){
                                if( article.datetime_dt > max.datetime_dt ){
                                    max = article
                                }
                            }else{
                                max = article
                            }
                        }
                    })
                    let datetime_dt = is_max ? max.datetime_dt : min.datetime_dt
                    return datetime_dt ? ToDateString(datetime_dt) : null 
                }else{
                    return null
                }
            },
            // get_most_common_tags( top_n = 5 ){
            //     let tags = {}
            //     this.active_article.forEach(function(article){
            //         article.tags.forEach(function(tag){
            //             if( !(tag in tags) ){
            //                 tags[tag] = 0
            //             }
            //             tags[tag]++
            //         })
            //     })
            //     return tags
            // }
            ...mapMutations('search',[
                "set_search_query",
                "search",
                "sort_active_article_by_datetime",
            ])
        },
        watch:{
            "search_query.q"( new_value, old_value ){
                this.search_query.q = new_value
                this.set_search_query( this.search_query )
                this.search()
            },
        },
        mounted(){
            this.init()
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss">
    $search_input-color: $color-border-heavy;

    div.searchbar{
        max-width: 860px;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;

        position: sticky;
        top: 79px;
        z-index: 9990;

        @media (max-width: $mediaquery-width-sm) { 
            top: 10px;
            padding: 5px;
            padding-left: 8px;
            padding-right: 8px;
            margin-bottom: 0px;
            border-radius: 0px;
        }

        div.search-input{
            width: 100%;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 999;

            .focus{                    
                i{                        
                    @include text-shadow-1( 2px, rgb(212, 212, 212) );
                    // font-weight: bold;
                    @include scale(1.0)
                }
            }

            i{
                @include transition();
                color: $search_input-color;                    
            }

            a{
                top: 9px;
                position: absolute;
                left: 13px;

                @media (max-width: $mediaquery-width-sm) {
                    left: 5px;
                }

                i{
                    font-size: 40px;
                    
                    @include scale(0.9)
                }
            }

            i.arrow{
                font-size: 48px;
                cursor: pointer;        
                top: 5px;            
                right: 3px;
                @media (max-width: $mediaquery-width-sm) { 
                    right: -2px;
                }
                position: absolute;                    
                

                &:hover{
                    @include text-shadow-1( 2px, rgb(212, 212, 212) );
                    color: $article_header-color;
                }
                &.focus{
                    @include text-shadow-1( 2px, rgb(212, 212, 212) );
                }

                &.down{
                    transform: rotate(180deg);
                }
            }

            div.awesomplete{
                input{
                    @include transition();
                    border-radius: 30px;
                    font-size: 27px;
                    padding-left: 60px;
                    padding-right: 50px;
                    @media (max-width: $mediaquery-width-sm) { 
                        border-radius: 15px;
                        font-size: 22px;
                        padding-left: 47px;
                        padding-right: 40px;
                    }
                    height: 55px;
                    background: #ffffff;
                    border: none;
                    // border-bottom: 4px solid $search_input-color;
                    width: 100%;
                    // @include box-shadow-1(4px);
                    box-shadow: 
                        0px 0px 4px #7c7c7c, 0px 0px 4px #7c7c7c, 0px 0px 4px #7c7c7c, 0px 0px 4px #7c7c7c, 0px 0px 4px #7c7c7c, 0px 0px 4px #7c7c7c, 0px 0px 4px #7c7c7c,
                        1px 1px 20px 1px rgba(128,128,153,0.35) inset, 
                        1px 1px 40px 10px rgba(128,128,153,0.35) inset;
    
                    &:hover{
                        background: #ffffff;
                    }
                    
                    &:focus{
                        outline: none;
                        background: #ffffff;
                        // box-shadow: 0px 2px $color-border-light;
                        @include box-shadow-1(12px);
                    }
                    
                }

                ul{
                    z-index: 999;
                    position: absolute;
                    left: 50px;
                    top: 62px;
                    border-radius: 4px;
                    text-align: left;
                    background: linear-gradient(to bottom right, white, hsla(0,0%,100%,.8));
                    
                    list-style-type: disc;

                    padding: 6px;                    

                    box-shadow: 0.05em 0.2em 0.6em rgba(0,0,0,.2);
                    @include transition( .3s );

                    li{
                        padding: 5px;
                        padding-left: 30px;
                        padding-right: 30px;
                        list-style: none;
                        &:hover{
                            background: hsl(200, 40%, 80%);
                            color: black;
                        }
                        &[aria-selected="true"], &[aria-selected="true"]:hover{
                            background: hsl(205, 40%, 40%);
                            color: white;
                            mark{
                                background: none;
                                color: white;                                                                    
                            }
                        }

                        &[aria-selected="false"]{
                            
                        }

                        mark{
                            padding: 0px;
                            font-weight: bold;
                            background: none;   
                        }
                    }
                }

                span.visually-hidden{
                    display: none !important;
                }
            }
        }

        div.search-result-meta{
            color: $article_header-color;
            margin-top: 5px;
            margin-left: 15px;
            margin-right: 15px;
            padding-left: 45px;
            padding-right: 45px;
            padding-bottom: 10px;
            display: flex;
            flex-direction: row;
            background: $background;
            border-radius: 15px;

            &.sm{
                flex-direction: column;
            }
            justify-content: space-between;
            i.navigation{
                transform: rotate(90deg);
                position: relative;
                top: 5px
            }
            i.warning{
                position: relative;
                top: 4px
            }
            span.date{
                i{
                    position: relative;
                    top: 6px;
                }
            }
        }
    }
</style>
