'use strict'

import { build_tag_filter_options } from '../filter.js'
import { iter_article_tree, dfs_article_category_tree } from '@theme/js/utility.js'

function set_tag_value(state, value) {
    state.value = value
    if( value.length == 0 ){
        state.active_article_id = state.all_article_id.slice()
    }else{
        let valid_tags = []
        value.forEach( i => valid_tags.push(i.name) )

        let active_article_id = []
        for( let article of state.articles ){
            for( let tag of valid_tags ){
                if( article.tag.includes(tag) ){
                    active_article_id.push( article.id )
                    break
                }
            }
        }
        state.active_article_id = active_article_id
    }
}

export default function(articles, article_category_tree){

    let all_article_id = []
    articles.forEach( article => all_article_id.push(article.id) )

    return {
        namespaced: true,
        state: { 
            articles: articles,
            all_article_id: all_article_id.slice(),
            active_article_id: all_article_id.slice(),
            value: [],
            ...build_tag_filter_options(articles),
        },
        mutations: {
            set_tag_value(state, value){
                set_tag_value(state, value)
            },
            toggle_value(state, tag){
                let is_include_tag = false
                state.value.forEach(function(value){
                    if( value.name == tag.name ){
                        is_include_tag = true
                    }
                })

                let new_value = []
                if( is_include_tag ){
                    state.value.forEach(function(value){
                        if( value.name != tag.name ){
                            new_value.push( value )
                        }
                    })
                }else{
                    new_value = state.value
                    new_value.push( tag )
                }

                state.value = new_value
            },
            reset_by_category_path( state, category_path ){

                let article_category_tree_root = iter_article_tree(category_path, article_category_tree)
                let all_article_id = dfs_article_category_tree(article_category_tree_root)

                let new_articles = []
                articles.forEach( article => {
                    if( all_article_id.includes(article.id) ){
                        new_articles.push( article )
                    }  
                })

                let options = build_tag_filter_options(new_articles).options

                // copy valid value from old to new
                // let new_value = []
                // let all_value_name = []
                // options.forEach( option => all_value_name.push( option.name ) )
                // state.value.forEach( val => {
                //     if( all_value_name.includes(val.name) ){
                //         new_value.push(val)
                //     }
                // })

                state.articles = new_articles
                state.all_article_id = all_article_id
                state.options = options
                // state.value = new_value
                set_tag_value(state, state.value)

            },
        },
    }
}