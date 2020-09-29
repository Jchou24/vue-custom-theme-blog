'use strict'

// ======================================================================================================
// for sort article
// ======================================================================================================

let article_sort_function = {
    datetime_desc(a,b){
        return b.datetime_dt - a.datetime_dt
    },
    datetime_asc(a,b){
        return a.datetime_dt - b.datetime_dt
    },
    update_datetime_desc(a,b){
        return b.update_datetime_dt - a.update_datetime_dt
    },
    update_datetime_asc(a,b){
        return a.update_datetime_dt - b.update_datetime_dt
    },
    title_desc(a,b){
        if( a.title > b.title ){
            return -1
        }
        if( a.title < b.title ){
            return 1
        }
        return 0
    },
    title_asc(a,b){
        if( a.title > b.title ){
            return 1
        }
        if( a.title < b.title ){
            return -1
        }
        return 0
    },
}

export { article_sort_function }