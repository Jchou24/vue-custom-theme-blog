'use strict'

import $ from 'jquery'
// import mermaid from 'mermaid'
import mermaid from 'mermaid/dist/mermaid'

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
});

var mermaid_svg = {}

function render_mermaid(){
    let mermaid_id = 0
    $("div.mermaid").each(function(){
        try {
            if( mermaid_svg[mermaid_id] == undefined ){
                let graph_text = $.trim($(this).text())
                graph_text = graph_text.replaceAll("→","-->")
                graph_text = graph_text.replaceAll("←","<--")
                graph_text = graph_text.replaceAll("↔","<-->")
                let svg = mermaid.mermaidAPI.render( "mermaid-"+mermaid_id, graph_text )
                mermaid_svg[mermaid_id] = svg
            }
            $(this).html(mermaid_svg[mermaid_id])
            mermaid_id += 1      
        } catch (error) {
            console.error( error )
        }        
    })
}

export { render_mermaid }