import settings from "@theme/js/settings.js"


function init_pages( siteData, extend_pages ){
    siteData.pages.forEach( page => {
        
        page.id = page.key

        if( !page.title ){
            page.title = settings.default_title
        }
        
        if( extend_pages.includes(page.path) ){
            switch (page.path) {
                case '/':
                    page.title = "Index"
                    break;
                case '/category/':
                    page.title = "Category"
                    break;
                case '/tag/':
                    page.title = "Tag"
                    break;
                case '/archive/':
                    page.title = "Archive"
                    break;
                case '/search/':
                    page.title = "Search"
                    break;
            
                default:
                    break;
            }
        }
    })
}

export {
    init_pages
}