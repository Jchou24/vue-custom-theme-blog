'use strict'

import 'perfect-scrollbar/css/perfect-scrollbar.css'

import throttle from 'lodash.throttle'
import PerfectScrollbar from 'perfect-scrollbar'
import { screen_size } from '@theme/js/utility.js'

// ====================================================================================
// Handle perfectscroll
// ====================================================================================
class ScrollerHandler{
    constructor(option, is_noself, sub_target, el){
        this.option = option || {}
        this.is_noself = is_noself
        this.sub_target = sub_target || []
        this.is_deep = sub_target.length > 0 ? true : false
        this.el = el
        this.el_instance = []
        this.scroller_instance = []

        let that = this
        this.on_resize = throttle(function(){
            // console.log("scroller resize")
            that.hide()
            that.update()
        }, 500 )
    }

    initial(){
        // console.log( "init ScrollerHandler" )
        let that = this

        that.destroy()

        that.el_instance = []
        that.scroller_instance = []
        if( !that.is_noself ){
            that.el_instance.push( that.el )
        }
        
        if( that.is_deep ){
            that.sub_target.forEach(function(i){
                // console.log( i )                
                // console.log( that.el.querySelectorAll(i) )
                that.el_instance = [ ...that.el_instance, ...that.el.querySelectorAll(i) ]
            })
        }

        // console.log( that.el_instance )

        let warning_count = 0
        let rules = ["fixed", "absolute", "relative"];
        that.el_instance.forEach(function(i){
            if (!rules.includes(window.getComputedStyle(i, null).position)) {
                warning_count++
            }
            that.scroller_instance.push( new PerfectScrollbar(i, that.option) )
        })

        if( warning_count > 0 ){
            console.warn(`container of perfect-scrollbar should add following styles: ${rules.join(",")}`)
        }

        that.on_resize()
        window.addEventListener('resize', that.on_resize)
    }

    update(){
        this.scroller_instance.forEach( (i) => { i.update() } )
    }

    destroy(){
        // console.log("destroy scroller handler")
        let that = this
        if( that.scroller_instance ){
            that.scroller_instance.forEach( function(i){
                i.destroy()
                i = null
            })
        }
        that.scroller_instance = null
        that.el_instance = null

        window.removeEventListener( 'resize', that.on_resize )
    }

    hide(){    
        let is_hide = screen_size() == 'xs' ? true : false
        this.scroller_instance.forEach( (i) => { i.isRtl = is_hide } )
    }

    top_all(){
        this.el_instance.forEach(function(i){
            i.scrollTop = 0
        })
    }

}

export {
    ScrollerHandler
}