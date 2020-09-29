const path = require('path')

module.exports = {
    title: 'VueJCBlog',
    base: "/",
    description: 'A Blog made by Vuepress',
    head:[
        ['link', { rel: 'icon', href: '/icon.png' }],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest'} ],
    ],
    themeConfig: {
        sitemap:{
            hostname: '' // https://your.host
        },
        ga: '', // UA-#########-##
        author: '', // your name
        disqus:{ // for comment feature
            shortname: "",
        },
        firebase:{ // for watching count feature
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
        }
    },
    theme: path.resolve(__dirname, '../../lib'),
    markdown: {
        anchor: { permalink: false },
    },
    scss:{
        sourceMap: true,
        data: `
            @import "@theme/scss/styles/theme-setting.scss";
        `
    },
}