
export default {
    namespaced: true,
    state:{
       
    },
    mutations:{
        save_slide_info( state, { uid, info } ){
            state[uid] = info
        },        
    },
    getters:{

    }
}

