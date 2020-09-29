'use strict'

import { iter_article_tree, dfs_article_category_tree } from '@theme/js/utility.js'

// ======================================================================================================
// for category filter
// ======================================================================================================

function build_category_filter_options(article_category_tree, is_add_article=true){
    let id_count = 0
    let id_map = {}
    let inverted_id_map = {}
    function new_category_node( id, label ){
        let node = {
            id: id_count,
            label: "📁 " + label
        }
        id_map[id_count] = id
        id_count++
        return node
    }

    function new_article_node(id){
        let node = {
            id: id_count,
            label: "📄 Articles",
        }
        id_map[id_count] = id
        id_count++
        return node
    }

    function build_options_tree( cat_path, options_tree_parent_node, article_category_tree_parent_node ){
        for( let category in article_category_tree_parent_node.children ){
            let current_cat_path = [ ...cat_path, category ]
            let node = new_category_node( current_cat_path, category )
            if( options_tree_parent_node.children === undefined ){
                options_tree_parent_node.children = []
            }
            options_tree_parent_node.children.push( node )
            build_options_tree( current_cat_path, node, article_category_tree_parent_node.children[category] )
        }
        if( is_add_article && options_tree_parent_node.children && article_category_tree_parent_node.id.length > 0 ){
            options_tree_parent_node.children.push( new_article_node(article_category_tree_parent_node.id) )
        }
    }

    function build_inverted_id_map(id_map){
        let inverted_id_map = {}
        Object.keys(id_map).forEach( k => inverted_id_map[ id_map[k] ] = k )
        return inverted_id_map
    }

    let options_tree = new_category_node( ['Home'], 'Home' )
    options_tree.isDefaultExpanded = true
    build_options_tree( ['Home'] ,options_tree, article_category_tree.Home )
    inverted_id_map = build_inverted_id_map(id_map)

    return {
        id_map: id_map,
        inverted_id_map: inverted_id_map,
        options: [ options_tree ]
    }
}

function expand_category_filter_active_children( article_category_tree, active_list ){
    let active_article_id = []
    active_list.forEach( (actives) => {
        if( actives[0] == 'Home' ){
            let root = iter_article_tree( actives, article_category_tree )
            dfs_article_category_tree(root).forEach( i => active_article_id.push(i) )
        }else{
            active_article_id.push(...actives)
        }
    })
    return active_article_id
}


// ======================================================================================================
// for tag filter
// ======================================================================================================

function build_tag_filter_options(articles){
    let tags = {}
    articles.forEach( (article) => article.tag.forEach( (t) => {
        if( tags[t] ){
            tags[t]++
        }else{
            tags[t] = 1
        }
    }))

    let tmp_options = Object.keys(tags)
    tmp_options.sort(function (a,b) {
        return tags[b] - tags[a]
    })

    let options = []
    tmp_options.forEach( option => 
        options.push({ 
            name: option, 
            count: tags[option] 
        }))
    
    return {
        options: options
    }
}

// ======================================================================================================
// for date filter
// ======================================================================================================

function filter_article_by_date_range( state, start_date, end_date, property_name ){
    // not test yet
    let start_active_article_id = []
    let end_active_article_id = []

    start_date = new Date(start_date)
    if( isNaN( new Date(start_date).getTime() ) ){
        start_active_article_id =  state.article_ids.slice()
    }else{
        state.articles.forEach((article)=>{
            if( article[property_name] >= start_date ){
                start_active_article_id.push( article.id )
            }
        })
    }

    end_date = new Date(end_date)
    if( isNaN( new Date(end_date).getTime() ) ){
        end_active_article_id =  state.article_ids.slice()
    }else{
        state.articles.forEach((article)=>{
            if( article[property_name] <= end_date ){
                end_active_article_id.push( article.id )
            }
        })
    }

    return start_active_article_id.filter(value => -1 !== end_active_article_id.indexOf(value))            
}

export {
    build_category_filter_options,
    expand_category_filter_active_children,
    build_tag_filter_options,
    filter_article_by_date_range
}