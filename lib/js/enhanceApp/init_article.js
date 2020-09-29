

function remove_null(el) {
    return el != null && el != undefined && el != ""
}

function process_date(frontmatter_dt, git_dt){
    function isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    function normalize(dt){
        dt = new Date( dt ? dt : "" )
        return isValidDate(dt) ? dt : ""
    }

    frontmatter_dt = normalize(frontmatter_dt)
    git_dt = normalize(git_dt)

    return frontmatter_dt || git_dt || ""
}

function init_article( page ){
    // ======================================================================================================
    // page.frontmatter to lower case
    // ======================================================================================================
    Object.keys( page.frontmatter ).forEach( key => page.frontmatter[key.toLowerCase()] = page.frontmatter[key] )

    // ======================================================================================================
    // for build category
    //     i.e page.category, page.frontmatter.category
    // ======================================================================================================
    let category_candidate = decodeURI(page.path).split("/")
    category_candidate = category_candidate.slice(0,category_candidate.length-1).filter(remove_null)
    let category = ( page.frontmatter.category || [] ).filter(remove_null)
    page.category = category.length > 0 ? category : category_candidate 
    page.frontmatter.category = page.category

    // ======================================================================================================
    // for build tag
    //     i.e page.tag, page.frontmatter.tag
    // ======================================================================================================
    page.tag = page.frontmatter.tag || []
    page.frontmatter.tag = page.tag

    // ======================================================================================================
    // for build datetime_dt, update_datetime_dt
    //     i.e page.datetime_dt, page.update_datetime_dt
    // ======================================================================================================
    let git_create = -1
    let git_update = -1
    if( page.git ){
        page.git.commits.forEach( ( commit, idx ) => {
            git_create = git_create < 0 ? idx : page.git.commits[git_create].commitTime > commit.commitTime ? idx : git_create
            git_update = git_update < 0 ? idx : page.git.commits[git_create].commitTime < commit.commitTime ? idx : git_update
        })
    }
    git_create = git_create == -1 ? "" : page.git.commits[git_create].commitTime * 1000
    git_update = git_update == -1 ? "" : page.git.commits[git_update].commitTime * 1000

    page.datetime_dt = process_date( page.frontmatter.datetime, git_create)
    page.update_datetime_dt = process_date( page.frontmatter.update_datetime, git_update)

    // ======================================================================================================
    // for build search
    //     i.e page.content
    // require plugin_word_token.js
    // ======================================================================================================
    if( page.word_token ){
        page.content = page.word_token.join(" ")
    }
}

export {
    init_article
}