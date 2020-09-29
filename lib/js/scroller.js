'use strict'

import $ from 'jquery'
import { mapMutations } from 'vuex'
import { screen_size } from '@theme/js/utility.js'

function get_scrolling_time(scroll_distance){
    let scrolling_time = 0
    if( 0 <= scroll_distance && scroll_distance < 500 ){
        scrolling_time = 500
    }else if( 500 <= scroll_distance && scroll_distance < 1500 ){
        scrolling_time = 800
    }else if( 1500 <= scroll_distance && scroll_distance < 2500 ){
        scrolling_time = 1300
    }else{
        scrolling_time = 2000
    }

    if( screen_size() == 'xs' && $("div.sidebar").hasClass("active-display") ){
        scrolling_time = 0
    }
    
    return scrolling_time
}

function scroll_article(new_top, previous_top, isAddNavHeight = true, callback = () => {} ){    
    let nav_height = isAddNavHeight ? 59 + 10 : 0
    new_top = screen_size() == 'xs' ? new_top - nav_height : new_top
    
    let scrolling_time = get_scrolling_time( Math.abs( new_top - previous_top ) )

    $("html, body").stop()
    $("html, body").animate({
        scrollTop: new_top,
    }, scrolling_time, "easeOutExpo", function(){
        setTimeout(function(){
            callback()
            // console.log("callback")
        }, 200)
    });
}

export { scroll_article }