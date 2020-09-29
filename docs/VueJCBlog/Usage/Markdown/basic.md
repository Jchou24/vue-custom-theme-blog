---
title: Basic Syntax of Markdown
datetime: 2019/3/25
update_datetime: 2019/4/8
tag: [ VueJCBlog, Usage, Markdown ]
---

# Emphasize

    *123*

    **123**

    ***123***

*123*

**123**

***123***

# hr

    ---

---

# Tables

## Basic Table

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

## Cross-Cell Table

### Multi-Line in Cell

        First header | Second header
        -------------|---------------
        List:        | More  \
        - over       | data  \
        - several    |       \
        - lines      |

First header | Second header
-------------|---------------
List:        | More  \
- over       | data  \
- several    |       \
- lines      |

### Merge-Column

        |              |          Grouping           ||
        |First Header  | Second Header | Third Header |
        | ------------ | :-----------: | -----------: |
        | Content      |          *Long Cell*        ||
        | Content      |   **Cell**    |         Cell |
        | New section  |     More      |         Data |
        | And more     | With an escaped '\\|'       ||

|              |          Grouping           ||
|First Header  | Second Header | Third Header |
| ------------ | :-----------: | -----------: |
| Content      |          *Long Cell*        ||
| Content      |   **Cell**    |         Cell |
| New section  |     More      |         Data |
| And more     | With an escaped '\\|'       ||

### Merge-Row
 
        First header | Second header
        -------------|---------------
        Merged       | Cell 1
        ^^           | Cell 2
        ^^           | Cell 3

First header | Second header
-------------|---------------
Merged       | Cell 1
^^           | Cell 2
^^           | Cell 3

# Delete

    ~~~123~~~
    ~~456~~

~~~123~~~

~~456~~

# Subscript

    A~B~

    CH~3~CH~2~OH

    text~a\ subscript~

A~B~

CH~3~CH~2~OH

text~a\ subscript~

# Superscript

    A^B^

    H^2^0

    text^a\ superscript^

A^B^

H^2^0

text^a\ superscript^

# Foot Note

    Hello World[^1]

    Here is a footnote reference,[^1] and another.[^longnote]

    [^1]: Here is the footnote.

    [^longnote]: Here's one with multiple blocks.

Hello World[^1]

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

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

# Mark

    ==mark me==

==mark me==
