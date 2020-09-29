'use strict'

export default {
    methods:{
        render_mermaid(){
            import("mermaid/dist/mermaid").then(mermaid => {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'neutral',
                });

                mermaid.init()
            })
        }
    } 
}
