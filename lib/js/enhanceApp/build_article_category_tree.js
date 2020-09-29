import { new_article_category_tree_node } from '@theme/js/utility.js'

function build_article_category_tree( Vue, page ){
    // ======================================================================================================
    // for article_category_tree
    //     require page.category, page.tag
    // ======================================================================================================
    let tree_ptr = Vue.prototype.$article_category_tree.Home
    page.category.forEach(( category ) => {
        if( !tree_ptr.children[category] ){
            tree_ptr.children[category] = new_article_category_tree_node()
        }
        tree_ptr = tree_ptr.children[category]
    })
    tree_ptr.id.push( page.id )

    page.tag.forEach(( tag ) => {
        if( !tree_ptr.tag[tag] ){
            tree_ptr.tag[tag] = 0
        }
        tree_ptr.tag[tag]++
    })
}

export {
    build_article_category_tree
}