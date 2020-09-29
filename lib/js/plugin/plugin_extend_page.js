

function add_page(page_path){
    return {
        frontmatter:{
            layout:"Page"
            // layout:"Layout"
        },
        // key: uuid(),
        path: page_path,
        regularPath: page_path,
        type: "page",
    }
}

module.exports = {
    name: "VueJCBlog/ExtendPage",
    additionalPages:[
        add_page("/"),
        add_page("/category/"),
        add_page("/tag/"),
        add_page("/archive/"),
        add_page("/search/"),
    ],
}