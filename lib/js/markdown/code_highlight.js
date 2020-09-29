'use strict'

function render_code_highlight(){
    Prism.highlightAll()

    // $('pre code').each(function(i, block) {
    //     hljs.highlightBlock(block);
    // });
}

export { render_code_highlight }