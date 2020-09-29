const path = require('path')

module.exports = (themeConfig, ctx) => {
    return {
        plugins: [
            'git-log',

            require(path.resolve(__dirname, 'js', 'plugin', 'plugin_extend_page.js')),
            require(path.resolve(__dirname, 'js', 'plugin', 'plugin_extend_markdown.js')),
            require(path.resolve(__dirname, 'js', 'plugin', 'plugin_nlp.js')),
            [ 
              '@vuepress/google-analytics',{ // npm install -D @vuepress/plugin-google-analytics@next
                'ga': themeConfig.ga // UA-00000000-0
            }],
            ['seo',{
                tags: $page => {
                    let tags = []
                    if( $page.tag ) tags = [ ...tags, ...$page.tag ]
                    if( $page.category ) tags = [ ...tags, ...$page.category ]
                    if( $page.key_words ) $page.key_words.forEach( w => tags.push(w.word) )
                    return tags
                },
                // publishedAt: $page => $page.datetime_dt,
                // modifiedAt: $page => $page.update_datetime_dt,
            }],            
            'alias',
            ['@vuepress/pwa',{
                updatePopup: true,                
                popupComponent: 'SWUpdatePopup',
            }],
            ['sitemap', themeConfig.sitemap],

            'disqus',
            'flowchart',


            ['named-chunks', {
                pageChunkName: page => 'page' + page.key.slice(1),
                layoutChunkName: layout => 'layout-' + layout.componentName,
            }],

            ['container', {
                type: 'vue',
                before: '<pre class="vue-container"><code>',
                after: '</code></pre>',
            }],
            ['container', {
                type: 'right',
                defaultTitle: '',
            }],
            ['container', {
                type: 'theorem',
                before: info => `<div class="theorem"><p class="title">${info}</p>`,
                after: '</div>',
            }],
            ['container', {
                type: 'grid',
                before: `<div class="grid-layout-container">`,
                after: '</div>',
            }],
            ['container', {
                type: 'align',
                before: conf => {
                    conf = conf.replace(/'/g, '')
                    conf = JSON.parse(conf)
                    let align = conf.align.toLowerCase() || "" // [left|right|center]
                    let height = conf.height ? `height:${conf.height};` : ""
                    let width = conf.width ? `width:${conf.width};` : ""
                    return `<div class="align-layout-container ${align}" style="${height}${width}" >`
                },
                after: '</div>',
            }],
        ],

    }
}