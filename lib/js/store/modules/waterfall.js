
export default {
    namespaced: true,
    state:{
        // for page index
        refresh_waterfall: -1,
        pause_waterfall: -1,
        start_waterfall: -1,
        start_waterfall: -1,
    },
    mutations:{
        trigger_refresh_waterfall(state){
            state.refresh_waterfall *= -1
        },
        trigger_pause_waterfall(state){
            state.pause_waterfall *= -1
        },
        trigger_start_waterfall(state){
            state.start_waterfall *= -1
        },
    },
    getters:{
    }
}

