import { article_sort_function } from '@theme/js/article_sort_function.js'

// ======================================================================================================
// for previous_id next_id
// ======================================================================================================
function dfs_build_link(article_category_tree_root, articles_hash){
    let articles = []
    article_category_tree_root.id.forEach( id => articles.push(articles_hash[id]) )
    articles = articles.sort(article_sort_function.datetime_asc)
    for( let i in articles ){
        i = parseInt(i)
        articles[i].previous_id = i - 1 >= 0 ? articles[i-1].id : null
        articles[i].next_id = i + 1 < articles.length ? articles[i+1].id : null
    }

    for( let child in article_category_tree_root.children ){
        dfs_build_link( article_category_tree_root.children[child], articles_hash )
    }
}

export {
    dfs_build_link
}