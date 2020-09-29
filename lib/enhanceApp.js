// ======================================================================================================
// for style
// ======================================================================================================
import '@theme/js/enhanceApp/init_style.js'

// ======================================================================================================
// for js
// ======================================================================================================
import { init_vue } from '@theme/js/enhanceApp/init_vue.js'
import { init_pages } from '@theme/js/enhanceApp/init_pages.js'
import { init_article } from '@theme/js/enhanceApp/init_article.js'
import { build_article_category_tree } from '@theme/js/enhanceApp/build_article_category_tree.js'
import { dfs_build_link } from '@theme/js/enhanceApp/build_link.js'
import { build_store } from '@theme/js/enhanceApp/build_store.js'
import { extend_pages } from '@theme/js/utility.js'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
}) => {
    init_vue(Vue, siteData, extend_pages)

    let article_category_tree = Vue.prototype.$article_category_tree
    let articles_hash = Vue.prototype.$articles_hash
    let articles = Vue.prototype.$articles
    
    init_pages(siteData, extend_pages)
    
    articles.forEach( page => {
        init_article( page )

        build_article_category_tree( Vue, page )
    })

    dfs_build_link( Vue.prototype.$article_category_tree.Home, articles_hash )
    build_store(Vue, article_category_tree, articles, articles_hash)
}