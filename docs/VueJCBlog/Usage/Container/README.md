---
title: Write Article with Container
datetime: 2019/3/26
update_datetime: 2019/4/8
tag: [ VueJCBlog, Usage, Container ]
---

# Container

Container 是 [vuepress-plugin-container](https://vuepress.github.io/zh/plugins/container/) 提供的功能

可以讓我們在撰寫文章時使用以下語法

```

::: theorem 牛顿第一定律
假若施加于某物体的外力为零，则该物体的运动速度不变。

::: right
From [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
:::

```

產生以下結果

::: theorem 牛顿第一定律
假若施加于某物体的外力为零，则该物体的运动速度不变。

::: right
From [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
:::

# 支援的Container

  * ## theorem

    * 來自 vue 官方範例

    * Example

      ```
      ::: theorem XXX理論
      YYY現象
      :::
      ```

      ::: theorem XXX理論
      YYY現象
      :::


  * ## right

    * 來自 vue 官方範例

    * Example

      ```
      ::: right
      123
      :::
      ```

      ::: right
      123
      :::

  * ## vue

    * 改自 vue 官方source code

    * Example

      ```
      ::: vue
      .
      ├── docs
      │   ├── README.md
      │   └── `hello-VueJCBlogblog.md`_(**Add this file**)_
      │
      ├── lib/
      │   ├── ...
      │   ...
      │
      ├── package.json
      └── package-lock.json
      :::
      ```

      ::: vue
      .
      ├── docs
      │   ├── README.md
      │   └── `hello-VueJCBlogblog.md`_(**Add this file**)_
      │
      ├── lib/
      │   ├── ...
      │   ...
      │
      ├── package.json
      └── package-lock.json
      :::

  * ## grid

    ```
    ::: grid
    ![Some Text](../Markdown/pika.png)

    ![Some Text](../Markdown/pika.png)

    ![Some Text](../Markdown/pika.png)

    ![Some Text](../Markdown/pika.png)
    ::: 
    ```

    ::: grid
    ![Some Text](../Markdown/pika.png)

    ![Some Text](../Markdown/pika.png)

    ![Some Text](../Markdown/pika.png)

    ![Some Text](../Markdown/pika.png)
    ::: 

    ```
    ::: grid
    ![Some Text](../Markdown/demo_video.mp4)
    001

    ![Some Text](../Markdown/demo_video.mp4)
    002

    ![Some Text](../Markdown/demo_video.mp4)
    003

    ![Some Text](../Markdown/demo_video.mp4)
    004
    :::
    ```

    ::: grid
    ![Some Text](../Markdown/demo_video.mp4)
    001

    ![Some Text](../Markdown/demo_video.mp4)
    002

    ![Some Text](../Markdown/demo_video.mp4)
    003

    ![Some Text](../Markdown/demo_video.mp4)
    004
    :::

  * ## align

    * ### left

      ```
      Hello
      ::: align '{"align":"left","height":"50px","width":"50px"}'
      ![Some Text](../Markdown/pika.png)
      :::
      World

      Chu
      ```

      Hello
      ::: align '{"align":"left","height":"50px","width":"50px"}'
      ![Some Text](../Markdown/pika.png)
      :::
      World

      Chu

    * ### right

      ```
      Hello
      ::: align '{"align":"right","height":"50px","width":"50px"}'
      ![Some Text](../Markdown/pika.png)
      :::
      World
      ```

      Hello
      ::: align '{"align":"right","height":"50px","width":"50px"}'
      ![Some Text](../Markdown/pika.png)
      :::
      World

    * ### center

      ```
      Hello
      ::: align '{"align":"center","height":"50px","width":"50px"}'
      ![Some Text](../Markdown/pika.png)
      :::
      World
      ```

      Hello
      ::: align '{"align":"center","height":"50px","width":"50px"}'
      ![Some Text](../Markdown/pika.png)
      :::
      World
