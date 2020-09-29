'use strict'

function transform_url(url){
    url = url.split("://")[1]
    url = url.split("#")[0]
    return {
        url: url, 
        url_key: btoa(url)
    }
}

export default {
    namespaced: true,
    state:{
        firebase: null,
        db: null,
        config: null,
        articles: null,
        // {
        //     url: "",
        //     views: 0,
        // }
        articles_ref: null,
        is_init: false,
    },
    getters:{
        is_active_views_count: (state) => !(state.config == null),
        get_views: (state) => (url) => {
            if( url && state.articles ){
                let key = transform_url(url).url_key
                return state.articles[key] ? state.articles[key].views : null
            }else{
                return null
            }
        },
    },
    mutations:{
        init_firebase(state, config){
            if( state.is_init ){
                return
            }

            if( config && config.apiKey && config.apiKey.length > 0 ){
                let firebase = require('firebase');
                state.firebase = firebase

                state.is_init = true
                state.config = config
                firebase.initializeApp(config);
                state.db = firebase.database()    
    
                state.articles_ref = firebase.database().ref('articles/')
                state.articles_ref.on('value', function(snapshot) {
                    state.articles = snapshot.val()
                })
                state.articles_ref.once('value').then(function(snapshot) {
                    state.articles = snapshot.val()
                })
            }

            // listener
            // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
            // starCountRef.on('value', function(snapshot) {
            // updateStarCount(postElement, snapshot.val());
            // });

            // detach listener
            // starCountRef.off()
        },
        // refresh_articles(state){
        //     state.db.ref("articles")

        //     // Read data once
        //     // var userId = firebase.auth().currentUser.uid;
        //     // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        //     //     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        //     //     // ...
        //     // });
        // },
        add_views(state, { url }){

            function update(){
                if( state.articles ){
                    let transformed = transform_url(url)
                    let transformed_url = transformed.url
                    let key = transformed.url_key
                    let article = state.articles[key]
        
                    let views = 1
                    if( article ){
                        views += article.views
                    }
        
                    state.firebase.database().ref(`articles/${key}`).set({
                        url: transformed_url,
                        views
                    });
                }
            }

            if( !state.articles ){
                setTimeout( update, 5000)
            }else{
                update()
            }

        }
    }
}