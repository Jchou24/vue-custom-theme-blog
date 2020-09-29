'use strict'

import lunr from 'lunr-chinese/lunr-chinese.min.js'
// const lunr = require('lunr-chinese')
import { build_category_filter_options, expand_category_filter_active_children, build_tag_filter_options, filter_article_by_date_range } from '../filter.js'
import { article_sort_function } from '@theme/js/article_sort_function.js'

export default function(articles, articles_hash, article_category_tree){

    let all_article_id = []
    articles.forEach( article => all_article_id.push(article.id) )

    let lunr_idx = lunr(function () {
        this.ref('id')
        this.field('title')
        this.field('content')
        this.field('tag')
        this.field('category')
    
        articles.forEach(function (article) {
            this.add(article)
        }, this)
    })

    return {
        namespaced: true,
        state: {
            articles: articles,
            article_ids: all_article_id.slice(),
            filter:{
                category:{
                    ...build_category_filter_options(article_category_tree), // { id_map, options }
                    value: [0],
                    active_article_id: all_article_id.slice(),
                },
                tag:{
                    ...build_tag_filter_options(articles), // { options }
                    value: [],
                    active_article_id: all_article_id.slice(),
                },
                datetime:{
                    start_value: "",
                    end_value: "",
                    active_article_id: all_article_id.slice(),
                },
                update_datetime:{
                    start_value: "",
                    end_value: "",
                    active_article_id: all_article_id.slice(),
                }
            },
            search_query:{
                q: "",
            },
            active_article_id: all_article_id.slice(),
            sort_function: article_sort_function.datetime_desc,
            lunr_idx: lunr_idx,
        },
        getters: {
            active_article: state => {
                let check_list = [
                    state.filter.category.active_article_id,
                    state.filter.tag.active_article_id,
                    state.filter.datetime.active_article_id,
                    state.filter.update_datetime.active_article_id,
                ]
                let active_article_id = []
                state.active_article_id.forEach( (i) => {
                    let is_active = true
                    for( let check of check_list ){
                        is_active &= check.includes(i)
                    }
                    if( is_active ){
                        active_article_id.push(i)
                    }
                })
    
                let result = []
                active_article_id.forEach( i => result.push(articles_hash[i]) )
                result.sort( state.sort_function )
                
                return result
            }
        },
        mutations: {
            sort_active_article_by_datetime( state, desc=true ){
                if( desc ){
                    state.sort_function = article_sort_function.datetime_desc
                }else{
                    state.sort_function = article_sort_function.datetime_asc
                }
            },
            set_datetime_start_value(state, value) {
                state.filter.datetime.start_value = value
                state.filter.datetime.active_article_id = filter_article_by_date_range( state, state.filter.datetime.start_value, state.filter.datetime.end_value, "datetime_dt" )
            },
            set_datetime_end_value(state, value) {
                state.filter.datetime.end_value = value
                state.filter.datetime.active_article_id = filter_article_by_date_range( state, state.filter.datetime.start_value, state.filter.datetime.end_value, "datetime_dt" )
            },
            set_update_datetime_start_value(state, value) {
                state.filter.update_datetime.start_value = value
                state.filter.update_datetime.active_article_id = filter_article_by_date_range( state, state.filter.update_datetime.start_value, state.filter.update_datetime.end_value, "update_datetime_dt" )
            },
            set_update_datetime_end_value(state, value) {
                state.filter.update_datetime.end_value = value
                state.filter.update_datetime.active_article_id = filter_article_by_date_range( state, state.filter.update_datetime.start_value, state.filter.update_datetime.end_value, "update_datetime_dt" )
            },
            set_category_filter_value(state, value) {
                state.filter.category.value = value
                let active_article_id = []
                value.forEach( (i) => {
                    active_article_id.push( state.filter.category.id_map[i] ) 
                })
                state.filter.category.active_article_id = expand_category_filter_active_children(article_category_tree, active_article_id)
            },
            set_tag_filter_value(state, value) {
                state.filter.tag.value = value
                if( value.length == 0 ){
                    state.filter.tag.active_article_id = all_article_id.slice()
                }else{
                    let valid_tags = []
                    value.forEach( i => valid_tags.push(i.name) )
        
                    let active_article_id = []
                    for( let article of articles ){
                        for( let tag of valid_tags ){
                            if( article.tag.includes(tag) ){
                                active_article_id.push( article.id )
                                break
                            }
                        }
                    }
                    state.filter.tag.active_article_id = active_article_id
                }
            },
            set_search_query( state, search_query ){
                // console.log(123)
                state.search_query = { ...state.search_query, ...search_query }
            },
            search( state ){
                if( state.search_query.q == "" ){
                    state.active_article_id = all_article_id.slice()
                }else{
                    let result = state.lunr_idx.search( state.search_query.q )
                    // console.log(result)
                    let active_article_id = []
                    result.forEach( i => active_article_id.push( i.ref ) )
                    state.active_article_id = active_article_id
                }
            },
        },
    }    
}