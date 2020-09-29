<template>
    <div class="main-content"
        :class="{ 
            'sidebar_disactive': !is_sidebar_active, 
        }">
        <div class="article" v-scroller.noself.sub_target="scroller_setting" ref="article"
            :class="{ 
                'sidebar_disactive': !is_sidebar_active, 
            }">
            <div class="hidden-nav-header" v-if="is_use_hidden_nav_header" />

            <slot></slot>
        </div>

        <BackTopButton @click="back_to_top" :is_active="is_active_BackTopButton" />
        
        <keep-alive>
            <LinkPreview class="link-preview"/>
        </keep-alive>
    </div>
</template>

<script>
    import $ from "jquery"
    import BackTopButton from './BackTopButton.vue'
    import LinkPreview from './LinkPreview.vue'
    import { mapMutations } from 'vuex'
    import throttle from 'lodash.throttle'
    import debounce from 'lodash.throttle'

    import { TOCTree } from '@theme/js/toc.js'
    import { URLParser } from '@theme/js/url_handler.js'
    import { screen_size, check_is_mobile } from '@theme/js/utility.js'
    import { scroll_article } from '@theme/js/scroller.js'

    export default {
        name: "MainContentLayout",
        props:{
            is_minimal_init:{
                type: Boolean,
                default: false,
            },
            is_use_hidden_nav_header:{
                type: Boolean,
                default: true,
            }
        },
        components:{
            BackTopButton,
            LinkPreview,
        },
        data(){
            return {
                scroller_setting:{
                    sub_target:[
                        'pre',
                        'div.vuepress-flowchart',
                    ]
                },
                is_active_BackTopButton: false,
                last_scroll_top: 0,
            }
        },
        computed:{
            is_nav_header_active:{
                get(){
                    return this.$store.state.layout.is_nav_header_active
                }
            },
            is_sidebar_active:{
                get(){
                    return this.$store.state.layout.is_sidebar_active
                }
            },
            is_app_first_enter:{
                get(){
                    return this.$store.state.layout.is_app_first_enter
                }
            },
        },
        methods:{
            back_to_top(){
                scroll_article( 0, this.last_scroll_top )
            },
            search_scroll_to_hash(delay=0, hash){
                let that = this

                hash = hash || that.$route.hash
                if( hash ){
                    setTimeout(function(){
                        // console.log("search_scroll_to_hash START")
                        let toc = new TOCTree( "div.main-content" ).fit()
                        URLParser.search_scroll_to_hash(that, hash, toc)
                    }, delay)
                    return true
                }else{
                    return false
                }
            },
            set_is_nav_header_active(position){
                let that = this

                function is_check(){
                    return screen_size() == 'xs' && that.is_sidebar_active == false
                }

                if( is_check() ){
                    if( position > that.last_scroll_top ){
                        // down scroll
                        that.set_layout({ key:"is_nav_header_active", val:false })
                        // console.log("down")
                    } else {
                        // up scroll
                        that.set_layout({ key:"is_nav_header_active", val:true })
                        // console.log("up")
                    }
                }
            },
            on_scroll: throttle(function(e){
                let that = this        

                // let position = e.target.scrollTop
                // let position = document.querySelector("html").scrollTop
                let position = $(window).scrollTop()
                // console.log("scroll", position, "|", e.target.scrollTop, "|", $(window).scrollTop())

                that.set_is_nav_header_active(position)

                that.is_active_BackTopButton = 
                    position < that.last_scroll_top && // scroll up
                    // position > document.querySelector("div.article").clientHeight * 2 
                    position > document.querySelector("html").clientHeight * 2 
                    ? true : false

                // For Mobile or negative scrolling
                that.last_scroll_top = position <= 0 ? 0 : position

            }, 200),
            on_anchor_click: debounce( function(e){
                // console.log("on_anchor_click")
                // console.log(e)
                // console.log(e.target)
                // console.log(e.target.a)
                // console.log(e.target.hash)
                e.preventDefault()
                this.search_scroll_to_hash(0, e.target.hash)
            }, 50),
            init(){
                let that = this

                if( !that.is_minimal_init ){
                    that.set_layout({ key:"is_nav_header_active", val:true })
    
                    that.init_scroll()
                }

                that.minimal_init()
            },
            init_scroll(){
                if( this.is_app_first_enter ){
                    this.search_scroll_to_hash(0)
                }
            },
            minimal_init(){
                let that = this

                that.recycle()                

                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(that.$el, throttle(function(){
                        that.trigger_article_resize()
                    }, 500)) 
                })

                // document.querySelectorAll("div.article").forEach( el => el.addEventListener('scroll', that.on_scroll) )
                window.addEventListener('scroll', that.on_scroll)

                setTimeout(function(){
                    document.querySelectorAll("a[href^='#']").forEach( el => el.addEventListener('click', that.on_anchor_click) )
                }, 1000)

                that.trigger_refresh_root_class()
                that.trigger_main_content_mounted()
            },            
            recycle(){
                let that = this

                // document.querySelectorAll("div.article").forEach( el => el.removeEventListener('scroll', that.on_scroll) )
                window.removeEventListener('scroll', that.on_scroll)

                document.querySelectorAll("a[href^='#']").forEach( el => el.removeEventListener('click', that.on_anchor_click) )
            },
            ...mapMutations('layout',[
                'trigger_refresh_root_class',
                'trigger_article_resize',
                'trigger_main_content_mounted',
                'set_layout',
            ]),    
        },
        watch:{
            
        },
        mounted(){
            let that = this

            that.$nextTick(()=>{
                that.init()         
            })
        },
        updated(){
            let that = this
            that.$nextTick(()=>{
                // due to the animation delay the appearance time of components
                // trigger BaseLayout.vue to refresh applied_root_class
                // when MainContentLayout.vue is updated after the animation
                that.trigger_refresh_root_class()
            })
        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss" scoped>
    div.article{
        width: 100%;
        height: 100%;

        position: relative;
    }

    .link-preview{
        z-index: 50;
    }
</style>

<style lang="scss">
    div.article{
        // overflow: auto !important;
        
    }
</style>
