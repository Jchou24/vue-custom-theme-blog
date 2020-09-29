'use strict'

import $ from 'jquery'
import { scroll_article } from '@theme/js/scroller.js'
import { screen_size } from '@theme/js/utility.js'

class URLParser{
    static separator = ","

    static parse(route, query){
        let target = route.query[query]
        if( target ){
            return target.split(URLParser.separator).filter( el => el.length )
        }else{
            return []
        }
    }

    static get_tag(route){
        return URLParser.parse( route, "tag" )
    }

    static get_category(route){
        return URLParser.parse( route, "category" )
    }

    static search_scroll_to_hash(vue_this, hash, toc){
        let that = this
        
        // console.log("search_scroll_to_hash",hash)
        if( hash ){
            let target = $.trim( decodeURI(hash) )
            let is_find_in_toc = false
            if( target && toc ){
                toc.forEach((t) => {
                    let title = '#'+$.trim( t.title )
                    if( title == target ){
                        // target = '#'+t.id
                        target = t.id
                        is_find_in_toc = true
                    }
                    // console.log( "target:", target )
                    // console.log( "title:", title )
                    // console.log( "is find?", title == target )
                    // console.log( "-------" )
                })
            }

            that.scroll_to_hash(vue_this, target, is_find_in_toc)
        }
    }

    static scroll_to_hash(vue_this, hash, is_find_in_toc){        
        // console.log("scroll_to_hash", hash)
        if( hash ){
            hash = hash.startsWith("#") ? hash.substring(1) : hash
            let target = document.getElementById(hash)

            // console.log("hash", hash)
            // console.log("target", target)
            if( target ){
            // if( true ){
                // let container_top = $("html, body").scrollTop()
                let container_top = document.querySelector("html").scrollTop || document.querySelector("body").scrollTop
                // console.log(container_top)
                let scrollTop = target.getBoundingClientRect().top + container_top
                // let scrollTop = $(hash).scrollTop()

                // try {
                //     console.log( "container_top", container_top )
                //     console.log( 'document.querySelector("html").scrollTop', document.querySelector("html").scrollTop )
                //     console.log( 'document.querySelector("body").scrollTop', document.querySelector("body").scrollTop )
                //     console.log( "target.getBoundingClientRect().top", target.getBoundingClientRect().top )
                //     console.log( "$(hash).scrollTop()", $("#" + hash).scrollTop() )
                // } catch (error) {
                    
                // }

                let nav_height_offset = screen_size() == 'xs' ? 0 :
                    is_find_in_toc ? 64 : 73 // height(nav header) + 5 = 64
                scrollTop = scrollTop == 0 ? 0 : scrollTop - nav_height_offset
                // console.log("scrollTop", scrollTop)

                vue_this.$store.commit( "layout/set_layout", { key: "is_nav_header_active", val: true })
                vue_this.$store.commit( "layout/lock_is_nav_header_active")
                scroll_article(
                    scrollTop, 
                    container_top, 
                    true,
                    function(){ 
                        vue_this.$store.commit( "layout/unlock_is_nav_header_active")
                        // console.log("inner callback")
                    }
                )
            }
        }
    }

}


export {
    URLParser
}