'use strict'

import { build_category_filter_options } from '../filter.js'
import { iter_article_tree } from '@theme/js/utility.js'
import { article_sort_function } from '@theme/js/article_sort_function.js'

export default function( article_category_tree ){

    return {
        namespaced: true,
        state: { 
            article_category_tree: JSON.parse(JSON.stringify(article_category_tree)),
            ...build_category_filter_options(article_category_tree, false),
            active_category: 0,
            active_category_path: ['Home'],
            original_category_path: ['Home'],
            article_sort:{
                sort_function: article_sort_function.datetime_asc,
                is_desc: false,
                sort_function_name: "datetime",
            },
            is_show:{
                datetime: true,
                update_datetime: true,
                tag: true,
            }
        },
        mutations: {
            set_article_sort_function(state){
                let function_name = `${state.article_sort.sort_function_name}_${ state.article_sort.is_desc ? 'desc' : 'asc' }`
                state.article_sort.sort_function = article_sort_function[function_name]
            },
            set_is_desc(state, value){
                state.article_sort.is_desc = value
            },
            set_is_show(state, payload){
                state.is_show[payload.target] = payload.value
            },
            set_sort_function_name(state, value){
                state.article_sort.sort_function_name = value
            },
            set_active_category(state, value) {
                if(value && value.id){
                    state.active_category = value.id
                    state.active_category_path = state.id_map[value.id].slice()
                }else{
                    state.active_category = 0
                    state.active_category_path = ['Home']
                }
            },
            set_original_category_path(state, value) {
                if( value[0] != 'Home' ){
                    value = [ 'Home', ...value ]
                }

                if( iter_article_tree(value, state.article_category_tree) ){
                    state.original_category_path = value.slice()
                }            
            },
            set_article_category_tree(state, new_article_category_tree){
                // state.article_category_tree = new_article_category_tree
                state.article_category_tree = Object.assign({}, state.article_category_tree, new_article_category_tree)
            },
            upside_active_category_path(state){
                if( state.active_category_path.length > 1 ){
                    state.active_category_path.length--
                    state.active_category_path = state.active_category_path.slice()
                    state.active_category = state.inverted_id_map[ state.active_category_path ].slice()
                }
            },
            refresh(state){
                state.active_category_path = state.original_category_path.slice()
                state.active_category = state.inverted_id_map[ state.active_category_path ].slice()
            }
        },
        actions: {  },
        getters: {
            get_active_category_path: state => {
                return state.active_category_path.slice()
            },
            get_article_tree_node: ( state, getters, rootState ) =>{
                return iter_article_tree( state.active_category_path, state.article_category_tree )
            },
        }
    }
}