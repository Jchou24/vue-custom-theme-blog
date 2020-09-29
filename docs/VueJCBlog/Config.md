---
title: Config
datetime: 2020/9/29
# update_datetime: 2020/9/29
tag: [ VueJCBlog, config ]
---

此篇文章將介紹config的部分

# Initial Config

初始Config如下

接下來的篇章將分為 `Recommend Config` 與 `Optional Config`
```js
{
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
}
```

# Recommend Config

## title

網站之title

## base

若網誌需置於網址domain下的subdomain，可以把subdomain的位置設為base

否則前端routing會無法正常運作

預設為`"/"`，不置於subdomain之下

## head

若網站需要額外引用一些全域的資源，可以在此設置

像是全站共用的js檔案，css檔案，等等

另外若想設置一些html head的設定，也可在此設定

預設設定了網站的icon和manifest

## author

網誌作者

# Optional Config

## description

網誌本身的一些敘述

## sitemap

設置後vuepress在build的時候會產生正確網址之sitemap

對seo有幫助

## ga

若想透過ga了解網誌的流量狀況，可以申請ga的track id後設置在此

## disqus

若想啟用網誌的留言功能，可以申請disqus帳號後，將shortname設置在此

## firebase

若想啟用網誌文章的觀看次數功能，可以申請firebase後，將相關設定設置於此

相關步驟請參考 [Add page views for blog by Firebase](/VueJCBlog/Development/article/hello-vuejcblog.md)