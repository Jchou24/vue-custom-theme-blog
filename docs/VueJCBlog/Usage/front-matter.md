---
title: Config Article with Front Matter
datetime: 2019/3/25
update_datetime: 2019/4/8
aliases:
  - front-matter-alias.html
  - VueJCBlog/Usage/front-matter-alias.html
tag: [ VueJCBlog, Usage, Front Matter ]
---


# Front Matter

  * Front Matter可以進行文章的設定

  * 官方說明請參考[此處](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html)

  * ## Simple Example

    ```yaml
    ---
    title: Title of Article
    datetime: 2019/3/24
    update_datetime: 2019/3/26
    tag: [ VueJCBlog, Tag ]
    ---
    ```

  * ## Advanced Example

    ```yaml
    ---
    title: Title of Article
    layout: Post
    datetime: 2019/3/24
    update_datetime: 2019/3/26
    category: [ AAA, BBB ]
    tag: [ VueJCBlog, Tag ]
    permalink: /custom/url/for/article.html
    ---
    ```

# Config Front Matter

  * ## title
  
    文章的主旨
  
  * ## datetime
  
    * 文章的建立日期

    * Default: by git first commit datetime
  
  * ## update_datetime
  
    * 文章的更新日期

    * Default: by git last commit datetime
  
  * ## tag
  
    文章的標籤
  
  * ## category
  
    * 文章的類別
    
    * Default: 以文章擺放路徑
  
  * ## layout
  
    * 若有自行開發擴充VueJCBlog，可以在layout進行設定
    
    * Default: Post
  
  * ## permalink
  
    * 用以設定文章的永久連結
    
    * 官方說明請參考[此處](https://v1.vuepress.vuejs.org/zh/guide/permalinks.html#%E8%83%8C%E6%99%AF)

  * ## [alias link](https://github.com/vaniyokk/vuepress-plugin-alias)

    * 用以設定不同網址，連到同一個文章

    * 主要用以避免外部網站連結到此文章時，連結失效

    * `內部使用此連結`、或`開發模式下使用alias連結`將會導到404頁面，詳情請再參考下方note之說明

    * ```yaml
      aliases:
        - front-matter-alias.html
        - VueJCBlog/Usage/front-matter-alias.html
      ```

    * ex: 本篇文章的alias [/VueJCBlog/Usage/front-matter-alias.html](/VueJCBlog/Usage/front-matter-alias.html)

    * **note**: 

      * 在yaml的alias中，開頭不能有`/`，而在文章中開頭需要

      * 由於該plugin的做法為產生額外的檔案到指定路徑上，因此vue-router中是無法識別alias連結的

        所以點選 [/VueJCBlog/Usage/front-matter-alias.html](/VueJCBlog/Usage/front-matter-alias.html) 會出現404的畫面

        必須另開網址，從vue-router以外的地方載入檔案才會redirect回文章
