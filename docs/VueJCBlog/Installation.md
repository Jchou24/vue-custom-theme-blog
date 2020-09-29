---
title: Installation
datetime: 2019/3/27
update_datetime: 2019/3/28
tag: [ VueJCBlog, Installation ]
---

由於vuepress的建置需要依賴 Node.js 的功能，因此需要先下載安裝 Node.js

而因為VueJCBlog為了做中文的全文搜尋使用到了 nodejieba

因此為了能安裝上 nodejieba ，必須要安裝 Python2.7

在 linux 與 mac 要安裝這些應該不太會遇到問題

但因為 Windows 預設沒有安裝 Python2.7 ，因此需要額外做設定

另外若 Python 安裝的是 Anaconda Python ，也要在 `npm install` 前做一些設定

因此本篇的安裝步驟內容，主要都將圍繞在怎麼安裝 nodejieba 上

# Install nodejieba

  * ## Install Python

  * ## Set Python Path

    ```bash
    npm config set python path/to/yout/python.exe
    # example
    npm config set python E:\Program\Anaconda3\envs\py27\python.exe
    ```

  * ## [node-gyp](https://github.com/nodejs/node-gyp)

    在 Windows 由於 nodejieba 底層是以 C 寫的，因此需要微軟的編譯工具進行編譯

    而這套流程可以使用 node-gyp 去簡化

    * ### Install

      ```bash
      npm install -g node-gyp
      ```

    * ### Config

      ```bash
      npm install --global --production windows-build-tools
      ```
  * ## Install nodejieba

    做完準備動作後，應該就可以安裝上 nodejieba 了

      ```bash
      npm install -D nodejieba
      ```


