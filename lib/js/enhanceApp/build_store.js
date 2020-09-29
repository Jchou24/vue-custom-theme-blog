import Vuex from 'vuex'
import store_builder from '@theme/js/store/index.js'

function build_store(Vue, article_category_tree, articles, articles_hash){
    // ======================================================================================================
    // build store
    // ======================================================================================================
    Vue.use(Vuex)
    let store = new Vuex.Store(store_builder( article_category_tree, articles, articles_hash ))
    Vue.mixin({ store: store })
}

export {
    build_store
}