---
title: Advanced Syntax of Markdown
datetime: 2019/3/26
update_datetime: 2019/4/8
tag: [ VueJCBlog, Usage, Markdown ]
---

# Code syntax hightlight

## Basic

    ```python
    print(123)
    ```

```python
print(123)
```


    ```python
    class ImAClass():

        def __init__(self):
            pass

        @staticmethod
        def func(arg=123):
            """
            Hello World
            """
            a, b = 1, 2
            lis = [
                'Hello', #Hello
                'World!' #World!
            ]

            dic = {
                "Hello": 0,
                "World!": 1
            }

            return { **dic, **{"x":lis}, **{"y": a+b} }

    >>> message = """123
    ... 456"""
    ```

```python
class ImAClass():

    def __init__(self):
        pass

    @staticmethod
    def func(arg=123):
        """
        Hello World
        """
        a, b = 1, 2
        lis = [
            'Hello', #Hello
            'World!' #World!
        ]

        dic = {
            "Hello": 0,
            "World!": 1
        }

        return { **dic, **{"x":lis}, **{"y": a+b} }

>>> message = """123
... 456"""
```

* code
  * highlight
    * with
      * indent
        ```python
        print(123)
        ```
    
## [URL Auto Link](https://prismjs.com/plugins/autolinker/)

```python
print(123)
# https://www.python.org/downloads/
```

## [Previewer](https://prismjs.com/plugins/previewers/)

```css
.example-gradient {
    background: -webkit-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* Chrome10+, Safari5.1+ */
    background:    -moz-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* FF3.6+ */
    background:     -ms-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* IE10+ */
    background:      -o-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* Opera 11.10+ */
    background:         linear-gradient(to right, #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* W3C */
}
.example-angle {
    transform: rotate(10deg);
}
.example-color {
    color: rgba(255, 0, 0, 0.2);
    background: purple;
    border: 1px solid hsl(100, 70%, 40%);
}
.example-easing {
    transition-timing-function: linear;
}
.example-time {
    transition-duration: 3s;
}
```

# [Katex](https://github.com/Khan/KaTeX)

[Katex Syntax](https://khan.github.io/KaTeX/docs/supported.html)

## inline katex 

    Hello $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$ World

Hello $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$ World

## block katex

    $$
    a^2 + b^2 = c^2
    $$

$$
a^2 + b^2 = c^2
$$

## block katex with tags

    $$
    \tag{hi} x+y^{2x}
    $$

$$
\tag{hi} x+y^{2x}
$$

    $$
    \tag{1} p(v_i=1|\mathbf{h}) = \sigma\left(\sum_j w_{ij}h_j + b_i\right)
    $$

$$
\tag{1} p(v_i=1|\mathbf{h}) = \sigma\left(\sum_j w_{ij}h_j + b_i\right)
$$

    $$
    \tag{2} p(h_j=1|\mathbf{v}) = \sigma\left(\sum_i w_{ij}v_i + c_j\right)
    $$


$$
\tag{2} p(h_j=1|\mathbf{v}) = \sigma\left(\sum_i w_{ij}v_i + c_j\right)
$$

# Tag Attributes

    * drop-shadow-1 {.drop-shadow-1}
    * drop-shadow-2 {.drop-shadow-2}
    * ![Some Text](./pika.png) {.drop-shadow-1}

```html
<ul>
    <li class="drop-shadow-1">drop-shadow-1</li> 
    <li class="drop-shadow-2">drop-shadow-2</li> 
    <li>
        <img class="drop-shadow-1"
            src="/assets/img/pika.264710a4.png" alt="Some Text" >
    </li>
</ul>
```

* drop-shadow-1{.drop-shadow-1}
* drop-shadow-2{.drop-shadow-2}
* ![Some Text](./pika.png){.drop-shadow-1}

* [More Description](https://www.npmjs.com/package/markdown-it-attrs)