---
title: Quick Start
datetime: 2019/3/26
update_datetime: 2019/4/7
tag: [ VueJCBlog, Quick Start ]
---

* # Download

  * [Node.js](https://nodejs.org/en/download/)

    tested npm version: 6.9.0

  * [Python2.7](https://www.python.org/downloads/)

    由於全文搜尋在建置過程中使用到了 [nodejieba](https://github.com/yanyiwu/nodejieba) 套件

    因此安裝相依套件nodejieba時，會需要使用到Python

  * [source code](https://github.com/Jchou24/vue-custom-theme-blog)

    於下載後，資料夾結構應如下

    ::: vue
    .
    ├── docs
    │   └── README.md
    │
    ├── lib/
    │   ├── ...
    │   ...
    │
    ├── package.json
    └── package-lock.json
    :::
    

* # 安裝相依套件

  * ## Basic Step

    ```bash
    cd path/to/VueJCBlog/folder
    npm ci # or
    npm run install
    ```

  * ## Detail

    由於使用到的相依套件的關係，若無法按照Basic Step來進行安裝

    更詳盡的安裝內容請參考 [Installation](./Installation.md)

* # Start to write article

  * ## Hello VueBlog

    1. 於docs/底下建立hello-vuejcblog.md

        ::: vue
        .
        ├── docs
        │   ├── README.md
        │   └── `hello-vuejcblog.md`_(**Add this file**)_
        │
        ├── lib/
        │   ├── ...
        │   ...
        │
        ├── package.json
        └── package-lock.json
        :::

    2. 貼上以下內容

        ```markdown
        ---
        title: Hello VueJCBlog
        ---

        # Hi

        * This is my first article.
        ```

  * ## Detail

    * 更多支持的Markdown功能請參考 [Write Article with Markdown](/VueJCBlog/Usage/Markdown)

  * ## Run dev

    1. 於command line執行

        ```bash
        npm run dev
        ```

    2. 於browser開啟 [http://localhost:8080/hello-VueJCBlog.html](http://localhost:8080/hello-VueJCBlog.html)

* # Deploy

  * ## Build

    於command line執行

      ```bash
      npm run build
      ```

  * ## Upload

    請參考 [Vuepress官方說明](https://v1.vuepress.vuejs.org/zh/guide/deploy.html)

