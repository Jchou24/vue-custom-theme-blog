---
title: Add page views for blog by Firebase
datetime: 2019/4/28
# update_datetime: 2019/4/7
tag: [ Firebase, Page Views ]
---

部落格文章的閱讀量雖然可以透過GA來進行一些追蹤與分析

但閱讀次數直接顯示給人的觀感還是不一樣的

因此我結合了 Firebase 來實做了此功能

# 開發策略

首先，閱讀次數需要被記錄，再來需要定義閱讀次數何時要被更新

## 紀錄

紀錄這件事，就交給了 Firebase 了， Firebase有許多的功能

這邊我使用 Firebase 的 Realtime Database 功能來當作我的儲存空間

## 更新方式

理想上，短期內重複觀看文章，好像昰不該增加閱讀次數

但這樣實作起來太麻煩了 lol

因此我直接在讀者進入頁面時，就讓次數+1

# Development

## Apply Firebase

* [開啟一個專案](https://console.firebase.google.com/)

  ![新增專案](/img/firebase/1.png)

* 選擇一個專案[^1]

  ![選擇專案](/img/firebase/2.png)

* 建立完 Firebase 專案後，就會有個 Firebase 的 Dashboard 可以用了

  ![Dashboard](/img/firebase/3.png)

* 選擇左方 Database，然後點選規則

  由於我們需要將每篇網誌文章的觀看次數更新上去

  所以要將 Read Write 權限打開

  ![Dashboard](/img/firebase/4.png)

* 申請API

  ![Dashboard](/img/firebase/5.png)

  由於昰要給網頁開發用的，因此選擇網頁

  ![Dashboard](/img/firebase/6.png)

  接著就會出現串接 API 時需要的 config

  後續會需要使用到此Config[^2]

  ![Dashboard](/img/firebase/7.png)

## 串接 Firebase API

* [JS Library](https://www.npmjs.com/package/firebase)

* [語法](https://firebase.google.com/docs/database/web/read-and-write)

## 串接思路

* 起一個 Firebase instance 儲存在 vuex 中

* 用一個 `is_init` 來確保只會初始化一次

* 起一個 articles reference 並監聽資料的異動

* 先跟DB要一次資料

    ```js
    init_firebase(state, config){
        if( !state.is_init ){
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
    }
    ```
    
* 在 vuex 中建立 function 來處理資料的寫入

* 由於 Firebase 不允許網址中的某些字元做為 Key 值 [^3]

  因此我將網址中的 `http`、`hash`去掉，並把網址轉為base64來當做 Key 值

    ```js
    function transform_url(url){
        url = url.split("://")[1]
        url = url.split("#")[0]
        return {
            url: url, 
            url_key: btoa(url)
        }
    }

    state.firebase.database().ref(`articles/${key}`).set({
        url: transform_url(url),
        views
    });
    ```

* 最後只要讓各篇文章去 watch `state.articles` 中自己的 page views

  那當瀏覽的過程中，若有其他人也進來瀏覽
  
  page views 也會自己 reactive 的更新啦!


[^1]: 這邊選擇的昰 Google 的專案，並不是 Firebase 專案

[^2]: Config需要妥善保管好，否則別人將可以改寫資料(因為我們在前面有將DB的讀寫權限都開啟了)。另外DB中最好不要存放太機敏的資料(畢竟Config還是設定到前端了)。

[^3]: 由於 Firebase 的 Realtime DB 應該昰 NoSQL Base DB，因此像是 `.`(dot) 就不能做為 Key 值