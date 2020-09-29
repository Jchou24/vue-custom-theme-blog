
export default {
    namespaced: true,
    state:{
        // for sidebar
        is_sidebar_active: true,
        is_active_article_lists: true,
        is_active_recent_post: true,
        is_active_toc: true,
        is_displayer_active: false,
        
        // for nav
        is_nav_header_active: true,
        is_lock_nav: false,

        // for category page
        is_active_category_viewer: true,

        // for archive
        is_archive_article_viewer_first_transition: true,

        // for all page
        is_app_first_enter: true,
        is_sidebar_first_enter: true,
        is_full_screen: false,
        is_disabled_scroll: false,
        // =====================================================
        // for trigger
        // =====================================================
        // for all page
        article_resize: -1,
        app_resize: -1,
        main_content_mounted: -1,
        // for base layout
        refresh_root_class: -1,
        // =====================================================
    },
    mutations:{
        set_layout( state, { key, val } ){
            if( key == 'is_nav_header_active' && state.is_lock_nav ){

            }else{
                state[key] = val
            }
        },
        toggle_layout_is( state, key ){
            state[key] = !state[key]
        },
        trigger_article_resize(state){
            state.article_resize *= -1
        },
        trigger_app_resize(state){
            state.app_resize *= -1
        },
        trigger_main_content_mounted(state){
            state.main_content_mounted *= -1
        },
        trigger_refresh_root_class(state){
            state.refresh_root_class *= -1
        },
        lock_is_nav_header_active(state){
            state.is_lock_nav = true
        },
        unlock_is_nav_header_active(state){
            state.is_lock_nav = false
        },
    },
    getters:{
        get_article_resize: state => state.article_resize,
        get_screen_resize: state => state.app_resize
    }
}

