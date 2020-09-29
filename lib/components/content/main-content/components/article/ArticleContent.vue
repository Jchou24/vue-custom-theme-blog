<template>
    <article class="article-content markdown-body" v-viewer v-lazy_load>
        <Content/>
    </article>
</template>

<script>
    // import '@theme/js/markdown/prism.js'
    import mermaid from '@theme/js/markdown/mermaid.js'    
    // import { render_code_highlight } from '@theme/js/markdown/code_highlight.js'

    export default {
        name: "ArticleContent",
        mixins:[ mermaid ],
        methods:{
            init(){
                let that = this
                
                import('@theme/js/markdown/prism.js').then( m => {
                    Prism.highlightAll()
                })

                that.render_mermaid()

                that.responsive_iframe_container()
                setTimeout(that.responsive_iframe_container, 1000)               
            },
            responsive_iframe_container(){
                document.querySelectorAll("div.iframe-container").forEach( el => {
                    el.classList.add("embed-responsive") 
                    el.classList.add("embed-responsive-16by9") 
                })
            },
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.init()
            })
        },
    }
</script>

<style lang="scss">
    div.content.default{
        flex-direction: column;
    }

    video{
        width: 100%;
    }

    img.lozad{
        background: transparent;
    }

    div.vuepress-flowchart{
        position: relative;
        overflow: hidden;
    }

    .markdown-body h1{
        margin-top: 50px;
    }

    .markdown-body h2{
        margin-top: 40px;
    }

    .markdown-body h3{
        margin-top: 30px;
    }
    // ======================================================================
    // for lozad
    // ======================================================================
    .lozad{
        &.init{
            border-radius: 15px;
            background: linear-gradient(-45deg, #ee765287, #E73C7E87, #23A6D587, #23D5AB87);
            background-size: 400% 400%;
            -webkit-animation: Gradient 15s ease infinite;
            -moz-animation: Gradient 15s ease infinite;
            animation: Gradient 15s ease infinite;

            min-height: 200px;
            min-width: 200px;
        }
    }

    @-webkit-keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }

    @-moz-keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }

    @keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }
    // ======================================================================
</style>


<style lang="scss" scoped>

</style>
