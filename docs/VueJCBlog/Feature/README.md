---
title: Features of VueJCBlog
datetime: 2019/3/22
update_datetime: 2019/4/7
tag: [ VueJCBlog, Feature, Article, Index, About, Category, Tag, Archive, Search ]
---

VueJCBlog由幾種頁面組成，比方說文章的呈現會由 Post 類型的頁面來負責呈現

搜尋由 Search 頁面來負責呈現

每個頁面由上方的 Navigation、左側的sidebar、與主要內容的 Main Content組成，如下圖

<div bp="grid" class="blueprint">
    <div bp="12" class="blueprint element">
        Navigation
    </div>
    <div bp="4" class="blueprint element">
        Sidebar
    </div>
    <div bp="8" class="blueprint element">
        Main Content
    </div>
</div>


每個頁面的 Navigation 都是一樣的，而 Sidebar 與 Main Content 則或多或少有些差異

各頁面的 Feature 、 [共通的 Feature](./common-feature.md) 以及 [Sidebar的Feature](./sidebar-feature.md) 將於其他文章逐一進行介紹

  |              Page              |  Main Purpose                                                           |
  | ------------------------------ | ----------------------------------------------------------------------- |
  | [Index](./index-page.md)       | 首頁                                                                    |
  | [About](./about-page.md)       | 可以用來放 Blog 作者的自我介紹                                            |
  | [Category](./category-page.md) | 以資料夾的方式呈現文章的分類，並附上一個Filter                              |
  | [Tag](./tag-page.md)           | 以資料夾的方式呈現文章的分類、再以顯示了部落格所有文章的Tag，並附上兩個Filter |
  | [Archive](./archive-page.md)   | 將所有的文章以簡約的方式依照年月日排序後進行呈現                            |
  | [Search](./search-page.md)     | 搜尋文章用的頁面                                                         |
  | [Post](./post-page.md)         | 呈現文章用的頁面                                                         |
