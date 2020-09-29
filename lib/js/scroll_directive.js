'use strict'

import { ScrollerHandler } from './scroller_handler.js'



function binding_scrollbar(el, binding){
    let option = binding.value ? binding.value.option || {} : {}
    let is_noself = binding.modifiers.noself
    let sub_target = binding.value ? binding.value.sub_target : []

    el._ps_ = new ScrollerHandler(option, is_noself, sub_target, el)
    // el._ps_.initial()
    setTimeout(function(){
        el._ps_.initial()
    }, 500)
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
        binding_scrollbar(el, binding)
    },
    // inserted( el, binding, vnode ){
    //     // console.log("inserted")
    //     binding_scrollbar(el, binding)
    // },
    // update( el, binding, vnode, oldVnode ){

    // },
    componentUpdated( el, binding, vnode, oldVnode ){
        // console.log("componentUpdated")
        try {
            vnode.context.$nextTick(
                () => {
                    el._ps_.update()
                }
            )
        } catch (error) {
            console.error(error);
            el._ps_.destroy()
            binding_scrollbar(el, binding)
        }
    },
    unbind( el, binding, vnode ){
        el._ps_.destroy()
    },
}