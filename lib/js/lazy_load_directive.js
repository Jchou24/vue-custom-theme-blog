'use strict'

import lozad from 'lozad'

function recycle(el){
    if (el._observer_ && el._observer_.observer) {
        el._observer_.observer.disconnect()
        delete el._observer_
    }
}

function init(el, binding){
    let tags = [ "img", "picture", "iframe", "source" ] // source is for video
    tags.forEach( query => {
        el.querySelectorAll(query).forEach( target_el => {
            target_el.classList.add("lozad") 
            target_el.classList.add("init") 
            target_el.setAttribute("data-source", target_el.src)
            target_el.src = ""

            // for chrome 75+ native lazy loading feature 
            // ref: https://addyosmani.com/blog/lazy-loading/
            target_el.setAttribute("loading", "lazy") 
            // console.log( target_el )
        })
    })

    let observer = lozad('.lozad',{
        threshold: 0.1,
        loaded: function(el) {
            el.onload = function(){
                // console.log('loading BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
            }
            el.src = el.getAttribute('data-source')
            el.classList.remove("init")
        }
    })

    observer.observe();

    el._observer_ = observer
}

// binding
//     name
//     value
//     oldValue
//     expression
//     arg
//     modifiers
export default {
    bind( el, binding, vnode ){
        // init(el, binding)
    },
    inserted( el, binding, vnode ){
        // console.log("inserted")
        setTimeout(function(){
            init(el, binding)
        }, 3000)
    },
    // update( el, binding, vnode, oldVnode ){

    // },
    componentUpdated( el, binding, vnode, oldVnode ){
        // console.log("componentUpdated")
    },
    unbind( el, binding, vnode ){
        recycle(el)
    },
}