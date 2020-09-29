'use strict'

export default {
    namespaced: true,
    state:{
        cache:{
            // url:{
            //     comment: Number,
            //     datetime: Date
            // }
        },
        disqus: null,
        is_init: false,
    },
    mutations:{
        set_cache(state, { key, val }){
            state.cache[key] = val
        },
        set_disqus(state, disqus){
            state.disqus = disqus
        },
        init_disqus(state){
            state.is_init = true
        },
    }
}