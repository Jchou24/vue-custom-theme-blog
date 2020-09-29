<template>
    <div class="toc"
        :class="{'animated fadeInDown fast': is_first_display_toc}"
        v-if="is_display_toc"
        >
        <header><h3>
            <i class="material-icons">view_list</i><span>Outline</span>
        </h3></header>

        <RippleTransition :is_active="!is_first_display_toc">
            <SidebarLiItem v-for="(t, idx) in toc"
                :class="[toc[idx].tag, { 'active':toc[idx].active }]"
                :key="toc[idx].title+idx"
                :data-index="idx"
                >
                    <a class="clickable"                        
                        v-on:click.prevent="scroll_article(toc[idx])"
                        >
                        {{ toc[idx].chaptor }} {{ toc[idx].title }}
                    </a>
            </SidebarLiItem>
        </RippleTransition>
    </div>
</template>

<script>
    import RippleTransition from '@theme/components/common/transition/RippleTransition.vue'
    import SidebarLiItem from '../elements/SidebarLiItem.vue'

    import $ from 'jquery'
    import { mapGetters } from 'vuex'
    import throttle from 'lodash.throttle'
    import { TOCTree } from '@theme/js/toc.js'
    import { scroll_article } from '@theme/js/scroller.js'
    import { screen_size, check_is_mobile } from '@theme/js/utility.js'

    export default {
        name: "ArticleContentTOC",
        components:{
            RippleTransition,
            SidebarLiItem,
        },
        props:{
            article_el:{
                type: String,
                // default: () => "div.article"
                default: () => "html"
            },
            article_content_el:{
                type: String,
                default: () => "article.article-content"
            },
            nav_height:{
                type: Number,
                default: () => 59
            },
            delay_display_time:{
                type: Number,
                default: 500
            },
            is_toc_set_id:{
                type: Boolean,
                default: false
            },
            max_toc_level:{
                type: Number,
                default: 3
            },
            toc_ignore_tags:{
                type: Array,
                default: function(){
                    return [{
                        name: "div",
                        classList: ["reveal"]
                    }]
                }
            }
        },
        data: function(){
            return {
                toc: [],
                top: {},
                is_display_toc: false,
                is_first_display_toc: true,
            }
        },
        computed:{
            ...mapGetters('layout',[
                'get_article_resize'
            ])
        },
        methods:{
            init(){
                let that = this
                that.recycle()

                that.toc = new TOCTree( 
                        that.article_content_el, 
                        that.is_toc_set_id, 
                        that.max_toc_level, 
                        that.toc_ignore_tags
                    ).fit()
                // console.log( that.toc )
                that.toc.forEach(function(t){
                    // add 'toc-' prefix to t.tag
                    t.tag = "toc-"+ t.tag
                    // add '#' prefix to t.id
                    t.id = "#"+t.id
                    t.active = false

                    // add chaptor to <h*>
                    let $ele = $(t.id)
                    if($ele){
                        $ele.prepend(`<span>${t.chaptor} </span>`)
                    }
                })
              
                // document.querySelector(that.article_el).addEventListener('scroll', that.link_sidebar_toc_throttle)
                window.addEventListener('scroll', that.link_sidebar_toc_throttle)

                that.update_top()
                that.link_sidebar_toc(false)
                
            },
            link_sidebar_toc_throttle: throttle(function(){
                let that = this
                // console.log("link_sidebar_toc_throttle")
                that.link_sidebar_toc(true)
            }, 200),
            link_sidebar_toc( is_router_replace ){
                // slide article content => link relative toc
                let that = this

                // let top_position = screen_size() != 'xs' ? 0 : that.nav_height + 10
                let top_position = that.nav_height + 10

                if( !that.toc && that.toc.length <= 0 ){
                    return
                }

                function find_title(){
                    let now_title = that.toc[that.toc.length-1]
                    let is_found = false
                    try {
                        function get_id(t){
                            return t.id[0] == "#" ? t.id.substring(1) : t.id
                        }
                        for( let i in that.toc ){
                            let t = that.toc[i]
                            let id = get_id(t)
                            if( document.getElementById(id).getBoundingClientRect().top > top_position ){
                                now_title = i > 0 ? that.toc[i-1] : that.toc[0]
                                is_found = true
                                break
                            }
                        }

                        // Handle case of last element
                        let last_toc = that.toc[that.toc.length-1]
                        let last_toc_id = get_id(last_toc)
                        if( document.getElementById(last_toc_id).getBoundingClientRect().top <= top_position ){
                            now_title = last_toc
                            is_found = true
                        }
                        
                        // console.log( "now in", now_title.title )
                        // console.log( that.toc )
                    } catch (error) {
                        
                    }

                    return {
                        now_title,
                        is_found
                    }
                } 

                // that.update_top()
                let find_result = find_title()

                if(!find_result.is_found){
                    return
                }
                
                if( !check_is_mobile() && is_router_replace ){
                    let current_hash = decodeURI(window.location.hash)
                    current_hash = current_hash.startsWith("#") ? current_hash.substring(1) : current_hash
                    // console.log( current_hash,  find_result.now_title.title, current_hash != find_result.now_title.title )
                    if( current_hash != find_result.now_title.title ){
                        // console.log(window.location.hash)
                        window.location.hash = "#" + encodeURI(find_result.now_title.title)
                        // console.log(window.location.hash)


                        // that.$router.replace({ hash: find_result.now_title.title }, function(){}, function(){})
                        // console.log(that.$router)
                    }
                }
                that.toc.forEach( t => t.active = false )
                find_result.now_title.active = true
                // // force vue reactive
                that.$set(that.toc, 0, that.toc[0])
            },
            scroll_article(toc){
                let that = this

                // console.log( toc )
                // console.log( that.top[toc.id] )
                // console.log( $(that.article_el).scrollTop() )
                that.update_top()
                if (screen_size() == 'xs') {
                    scroll_article( that.top[toc.id] + 5, $(that.article_el).scrollTop() )
                }else{
                    scroll_article( that.top[toc.id] - that.nav_height - 5, $(that.article_el).scrollTop() )
                }
            },
            update_top(){
                let that = this
                if( that.toc && that.toc.length > 0 ){
                    let offset = $(that.article_content_el).position().top - document.querySelector(that.article_content_el).offsetTop
                    // update top position when article height change
                    that.toc.forEach( (t) => {
                        if( $(t.id).offset() ){
                            that.top[t.id] = $(t.id).offset().top - offset
                        }
                    })
                    that.top = Object.assign( {}, that.top )
                    // console.log( that.top )
                }
            },
            recycle(){
                let that = this

                let article = document.querySelector(that.article_el)
                if( article ){
                    article.removeEventListener('scroll', that.link_sidebar_toc_throttle)  
                }
                this.toc = []
                this.top = {}
            },
        },
        watch:{
            get_article_resize: throttle(function(){
                // console.log("watched get_article_resize")
                this.update_top()
                this.link_sidebar_toc(false)
            }, 300),
            toc: throttle(function(new_value, old_value){
                // if first init => delay display
                if( old_value.length == 0 && new_value.length > 0 ){
                    let that = this
                    setTimeout(function(){
                        that.is_display_toc = true
                        setTimeout(function(){
                            that.is_first_display_toc = false
                        }, 3000)
                    }, that.is_first_display_toc ? that.delay_display_time : 0)
                }

                this.$emit('change', new_value.length)
            }, 500),
            "$route.path"(){
                let that = this
                // lazy_init
                setTimeout(function(){
                    that.init()
                }, 1000)

                this.is_first_display_toc = false
            },
        },
        mounted(){
            let that = this
            // lazy_init
            setTimeout(function(){
                that.init()
            }, 500)
        },
        beforeDestroy(){
            this.recycle()
        },
    }
</script>

<style lang="scss" scoped>
    a.clickable{
        cursor: pointer;
    }
</style>
