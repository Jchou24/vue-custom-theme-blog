---
title: Embedded Slides in Article(TODO)
datetime: 2019/3/26
update_datetime: 2019/4/8
tag: [ VueJCBlog, Usage, Container ]
---


# Constraint

  * One page one slide(Due to the mechanism of reveal.js)

# TODO

  * Write example

  * Auto transform article to slide

# Syntax

```markdown
<Slide>
    <-- change line is required now
<section>
    <-- change line is required now
# Embedded Slides in Article

Integrety with [Reveal.js](https://github.com/hakimel/reveal.js/)

Render slides with markdown

</section>
<section>

    <slide content writed by markdown>

</section>
<section>

<Fragment>

    <fragment is also supported>
    
</Fragment>

</section>

</Slide>
```

<Slide>

<section>

# Embedded Slides in Article

Integrety with [Reveal.js](https://github.com/hakimel/reveal.js/)

Render slides with markdown

</section>
<section>

# Emphasize

<Fragment>

    *123* 

    **123**

    ***123***

</Fragment>
<Fragment>

*123*

**123**

***123***

</Fragment>

</section>
<section>

# hr

    ---

---

</section>
<section>

# Tables

    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | col 3 is      | right-aligned | $1600 |
    | col 2 is      | centered      |   $12 |
    | zebra stripes | are neat      |    $1 |

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

</section>
<section>

# Delete

    ~~~123~~~
    ~~456~~

~~~123~~~

~~456~~

</section>
<section>

# Subscript

    A~B~

    CH~3~CH~2~OH

    text~a\ subscript~

A~B~

CH~3~CH~2~OH

text~a\ subscript~

</section>
<section>

# Superscript

    A^B^

    H^2^0

    text^a\ superscript^

A^B^

H^2^0

text^a\ superscript^

</section>
<section>

# Task List

    - [X] item 1
        * [X] item A
        * [ ] item B
            + [x] item a
            + [ ] item b
            + [x] item c
        * [X] item C
    - [ ] item 2
    - [ ] item 3

- [X] item 1
    * [X] item A
    * [ ] item B
        + [x] item a
        + [ ] item b
        + [x] item c
    * [X] item C
- [ ] item 2
- [ ] item 3

</section>
<section>

# Mark

    ==mark me==

==mark me==

</section>
<section>

## inline katex 

    Hello $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$ World

Hello $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$ World

</section>
<section>

    ![Some Text](./Markdown/pika.gif)

![Some Text](./Markdown/pika.gif)

</section>
<section>

# [Link Article](https://v1.vuepress.vuejs.org/zh/guide/markdown.html#%E9%93%BE%E6%8E%A5)

    [Basic Syntax of Markdown](/VueJCBlog/Usage/Markdown/basic.html)

[Basic Syntax of Markdown](/VueJCBlog/Usage/Markdown/basic.html)

</section>
<section>

### Link Video

    /i/https://player.twitch.tv/?video=50444026&autoplay=false

/i/https://player.twitch.tv/?video=50444026&autoplay=false

</section>
<section>

# [flowchart](https://flowchart.vuepress.ulivz.com/)

    ```
    @flowstart
    cond=>condition: Process?
    process=>operation: Process
    e=>end: End

    cond(yes)->process->e
    cond(no)->e
    @flowend
    ```

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend

</section>
<section>

## Flowchart

    ```mermaid
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
    ```

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

</section>
<section>

# [PlantUML](http://plantuml.com/zh/index)

    @startuml
    Bob -> Alice : hello
    @enduml
 
@startuml
Bob -> Alice : hello
@enduml

</section>

</Slide>

# Example

Below is the original markdown of slide

```markdown
<Slide>

<section>

# Embedded Slides in Article

Integrety with [Reveal.js](https://github.com/hakimel/reveal.js/)

Render slides with markdown

</section>
<section>

# Emphasize

    *123*

    **123**

    ***123***

*123*

**123**

***123***

</section>
<section>

# hr

    ---

---

</section>
<section>

# Tables

    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | col 3 is      | right-aligned | $1600 |
    | col 2 is      | centered      |   $12 |
    | zebra stripes | are neat      |    $1 |

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

</section>
<section>

# Delete

    ~~~123~~~
    ~~456~~

~~~123~~~

~~456~~

</section>
<section>

# Subscript

    A~B~

    CH~3~CH~2~OH

    text~a\ subscript~

A~B~

CH~3~CH~2~OH

text~a\ subscript~

</section>
<section>

# Superscript

    A^B^

    H^2^0

    text^a\ superscript^

A^B^

H^2^0

text^a\ superscript^

</section>
<section>

# Task List

    - [X] item 1
        * [X] item A
        * [ ] item B
            + [x] item a
            + [ ] item b
            + [x] item c
        * [X] item C
    - [ ] item 2
    - [ ] item 3

- [X] item 1
    * [X] item A
    * [ ] item B
        + [x] item a
        + [ ] item b
        + [x] item c
    * [X] item C
- [ ] item 2
- [ ] item 3

</section>
<section>

# Mark

    ==mark me==

==mark me==

</section>
<section>

## inline katex 

    Hello $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$ World

Hello $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$ World

</section>
<section>

    ![Some Text](./Markdown/pika.gif)

![Some Text](./Markdown/pika.gif)

</section>
<section>

# [Link Article](https://v1.vuepress.vuejs.org/zh/guide/markdown.html#%E9%93%BE%E6%8E%A5)

    [Basic Syntax of Markdown](/VueJCBlog/Usage/Markdown/basic.html)

[Basic Syntax of Markdown](/VueJCBlog/Usage/Markdown/basic.html)

</section>
<section>

### Link Video

    /i/https://player.twitch.tv/?video=50444026&autoplay=false

/i/https://player.twitch.tv/?video=50444026&autoplay=false

</section>
<section>

# [flowchart](https://flowchart.vuepress.ulivz.com/)

    ```
    @flowstart
    cond=>condition: Process?
    process=>operation: Process
    e=>end: End

    cond(yes)->process->e
    cond(no)->e
    @flowend
    ```

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend

</section>
<section>

## Flowchart

    ```mermaid
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
    ```

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
``

</section>
<section>

# [PlantUML](http://plantuml.com/zh/index)

    @startuml
    Bob -> Alice : hello
    @enduml

@startuml
Bob -> Alice : hello
@enduml

</section>

</Slide>
```