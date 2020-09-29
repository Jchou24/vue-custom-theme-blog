

module.exports = {
    // extendMarkdown: md => {
    //     md.set({ breaks: true })
    //     md.use(require('markdown-it-xxx'))
    // },
    name: "VueJCBlog/ExtendMarkdown",
    chainMarkdown(config){
        
        // config.plugin('anchor').tap(([options]) => [
        //     Object.assign(options, {permalink: false})
        // ])

        config.options.linkify(true)
        // config.options.permalink = false
        // config.options.anchor({permalink: false})
    },
    extendMarkdown: md => {
        // =====================================================================
        // console.log( md.options )
        // md.set({
        //     anchor: { permalink: false },
        //     linkify: true, // for auto link url
        // })

        // console.log( Object.keys(md) )
        // console.log( md.options )
        // md.options.linkify = true
        // md.options.anchor.permalink = true
        // console.log( md.options )
        // md.anchor.set({ permalink: false })
        // =====================================================================

        md.use(require('@iktakahiro/markdown-it-katex'))
        md.use(require('markdown-it-sub'))
            // https://www.npmjs.com/package/markdown-it-sub
            // https://github.com/markdown-it/markdown-it-sub
        md.use(require('markdown-it-sup'))
            // https://www.npmjs.com/package/markdown-it-sup
            // https://github.com/markdown-it/markdown-it-sup
        md.use(require('markdown-it-task-lists'), {label: true, labelAfter: true})
            // https://www.npmjs.com/package/markdown-it-task-lists
            // https://github.com/revin/markdown-it-task-lists
        md.use(require('markdown-it-mark'))
            // https://www.npmjs.com/package/markdown-it-mark
            // https://github.com/markdown-it/markdown-it-mark
        md.use(require('markdown-it-footnote'))
            // https://www.npmjs.com/package/markdown-it-footnote
            // https://github.com/markdown-it/markdown-it-footnote
        md.use(require('markdown-it-multimd-table'),{
                enableMultilineRows: true,
                enableRowspan: true,
            })
            // https://www.npmjs.com/package/markdown-it-multimd-table
            // https://github.com/RedBug312/markdown-it-multimd-table
        md.use(require('markdown-it-imsize'), { autofill: true }) // image size
            // https://www.npmjs.com/package/markdown-it-imsize
            // https://github.com/tatsy/markdown-it-imsize
        md.use(require('markdown-it-attrs'), { 
                allowedAttributes: ['id', 'class', /^regex.*$/]
            })
            // https://www.npmjs.com/package/markdown-it-attrs
            // https://github.com/arve0/markdown-it-attrs
        // =====================================================================
        // for charts
        // =====================================================================
        md.use(require('markdown-it-mermaid').default)
            // https://www.npmjs.com/package/markdown-it-mermaid
            // https://github.com/tylingsoft/markdown-it-mermaid
        md.use(require('markdown-it-plantuml'))
            // https://www.npmjs.com/package/markdown-it-plantuml?activeTab=readme
            // https://github.com/gmunguia/markdown-it-plantuml
        // =====================================================================
        // for video
        // =====================================================================
        md.use(require('@centerforopenscience/markdown-it-video'))
            // https://www.npmjs.com/package/@centerforopenscience/markdown-it-video
            // https://github.com/CenterForOpenScience/markdown-it-video
            
            // require('markdown-it-video', { 
            //     youtube: { width: 640, height: 390 },
            //     vimeo: { width: 500, height: 281 },
            //     vine: { width: 600, height: 600, embed: 'simple' },
            //     prezi: { width: 550, height: 400 }
            //   }

        md.use(require('markdown-it-html5-embed'),{
                html5embed: { // no setting will cause null error
                    useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
                    // useLinkSyntax: true   // Enables video/audio embed with []() syntax
                }
            })
            // https://www.npmjs.com/package/markdown-it-html5-embed
            // https://github.com/cmrd-senya/markdown-it-html5-embed

        md.use(require('markdown-it-iframe'))
            // https://www.npmjs.com/package/markdown-it-iframe
            // https://github.com/rjriel/markdown-it-iframe

    },
}