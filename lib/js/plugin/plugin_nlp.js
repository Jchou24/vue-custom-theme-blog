// ref: https://github.com/yanyiwu/nodejieba
let nodejieba = require("nodejieba")
// ref: https://github.com/fergiemcdowall/stopword
let sw = require('stopword')
// ref: https://github.com/derhowie/remove-punctuation
let removePunctuation = require('remove-punctuation')
// ref: https://github.com/EManual/node-punctuation-conversion
let convert = require('node-punctuation-conversion')

let md = require('markdown-it')()
let excerpts = require('excerpts')

function trim(array){
    array.forEach( (element, idx) => {
        array[idx] = element.trim()
    });
}

module.exports = {
    name: "VueJCBlog/NLP",
    extendPageData ($page) {
        const {
            _filePath,           // 源文件的绝对路径
            _computed,           // 在构建期访问全局的计算属性，如：_computed.$localePath.
            _content,            // 源文件的原始内容字符串
            _strippedContent,    // 源文件剔除掉 frontmatter 的内容字符串
            key,                 // 页面唯一的 hash key
            frontmatter,         // 页面的 frontmatter 对象
            regularPath,         // 当前页面遵循文件层次结构的默认链接
            path,                // 当前页面的实际链接（在 permalink 不存在时，使用 regularPath ）
        } = $page
        
        // $page.strippedContent = _strippedContent

        let pure_content = ""
        try {
            // remove url protocol
            pure_content = _strippedContent.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
            // remove markdown syntax
            // ex
            //     '# This is the title. ## This is the subtitle. **some text** __some more text__. [link here](http://google.com)'
            //  => 'This is the title.  This is the subtitle. some text some more text. link here'
            pure_content = pure_content.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, '$1').trim()
            pure_content = pure_content.toLowerCase()
        } catch (error) {
            
        }
        $page.pure_content = pure_content

        // ======================================================================================================
        // extract word_token
        // ======================================================================================================
        $page.word_token = []
        try {
            let word_token = nodejieba.cut(pure_content, false)
            trim(word_token)
            // remove en stop words
            word_token = sw.removeStopwords(word_token)
            // remove chinese stop words
            word_token = sw.removeStopwords(word_token, sw.zh)
            // join by " "
            word_token = word_token.join(" ")
            // change chinese punctuation to en punctuation
            word_token = convert.replaceChinese(word_token)
            // remove en punctuation
            word_token = removePunctuation(word_token)
            $page.word_token = word_token.split(" ").filter(function(i){
                return !['', '\r', '\n', '，'].includes(i)
            })
        }catch( error ){}

        // ======================================================================================================
        // extract key_words
        // ======================================================================================================
        $page.key_words = []
        try {
            $page.key_words = nodejieba.extract(pure_content, 30)
            trim($page.key_words)
        } catch (error) {}

        // ======================================================================================================
        // extract excerpt
        // ======================================================================================================
        $page.excerpt = ""
        try {
            let html = md.render(pure_content)
            $page.excerpt = excerpts(html, { characters: 400 })
        } catch (error) {}
    },    
}