
import vPage from 'v-page'
import Viewer from 'v-viewer'
import VueParticles from 'vue-particles'
import scroller from '@theme/js/scroll_directive.js'
import lazy_load from '@theme/js/lazy_load_directive.js'
import { new_article_category_tree_node } from '@theme/js/utility.js'

function init_vue( Vue, siteData, extend_pages ){
    Vue.config.ignoredElements = ['src','svg-icon','mermaid']

    Vue.use(vPage)
    Vue.use(Viewer)
    Vue.use(VueParticles)

    Vue.directive('scroller',scroller)
    Vue.directive('lazy_load',lazy_load)

    remove_tmp_article(siteData)
    
    Vue.prototype.$article_category_tree = { 'Home':new_article_category_tree_node() }

    Vue.prototype.$articles = []
    siteData.pages.forEach( page => {
        // article pages
        if( !extend_pages.includes(page.path) ){
            Vue.prototype.$articles.push( page )
        }
    })

    Vue.prototype.$articles_hash = {}
    Vue.prototype.$articles.forEach( page => {
        Vue.prototype.$articles_hash[page.key] = page
    })
}

function remove_tmp_article(siteData){
    let ignored_idx = []
    siteData.pages.forEach( (page,idx) => {
        if ( page.frontmatter.is_tmp ) {
            ignored_idx.push(idx)
        }
    })

    ignored_idx = ignored_idx.reverse()
    ignored_idx.forEach( idx => {
        siteData.pages.splice(idx, 1);
    })
}


    

export {
    init_vue
}