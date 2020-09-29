'use strict'

import $ from 'jquery'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function render_katex(){
    $(".MathJax_Preview").replaceWith("")
    $("script[type='math/tex']").replaceWith(function(){
        return katex.renderToString($( this).text(), {'displayMode': false} )
    });

    $("script[type='math/tex; mode=display']").replaceWith(function(){
        return katex.renderToString( $(this).text(), {'displayMode': true} )
    });
}

export { render_katex }