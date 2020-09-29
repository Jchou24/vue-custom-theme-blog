import layout from './modules/layout.js'
import category_builder from './modules/category.js'
import tag_builder from './modules/tag.js'
import search_builder from './modules/search.js'
import disqus from './modules/disqus.js'
import firebase from './modules/firebase.js'
import waterfall from './modules/waterfall.js'
import slide from './modules/slide.js'

export default function(article_category_tree, articles, articles_hash){
    return {
        modules:{
            layout,
            category: category_builder(article_category_tree),
            tag: tag_builder(articles, article_category_tree),
            search: search_builder(articles, articles_hash, article_category_tree),
            disqus,
            firebase,
            waterfall,
            slide,
        },
    }
}