'use strict'

import $ from 'jquery'
import { uuid } from '@theme/js/utility.js'

class TOCTree{
    constructor(element, is_set_id=false, level=3, ignore_tags=[]){
        // element:
        //     target to be parsed
        // is_set_id:
        //     is setting id to header tag during parsing
        // level:
        //     header level during 'level' will be parsed
        // ignore_tags: { name: String, classList: [String] }
        //     tags to be ignored
        this.element = document.querySelector(element)
        this.is_set_id = is_set_id || false
        this.ignore_tags = ignore_tags || []
        this.header_tags = []
        for( let i = 1; i <= level; i++ ){
            this.header_tags.push( 'h'+i )
        }
    }

    _is_h(tag){
        if( tag && tag.localName ){
            for( let h of this.header_tags ){
                if( tag.localName.includes(h) ){
                    return true
                }
            }
        }
        return false
    }

    _is_ignore(tag){
        let that = this

        function is_tag_contain_class(classList){
            classList = classList || []
            if( !tag.classList ){
                return false
            }

            let tag_classlist = []
            for( let cls of tag.classList ){
                tag_classlist.push(cls)
            }

            for( let cls of classList ){
                if( !tag_classlist.includes(cls) ){
                    return false
                }                
            }
            return true
        }

        if( !(tag && tag.localName) ){
            return true
        }
        
        for( let ignore_tag of that.ignore_tags ){
            if( ignore_tag.name == tag.localName && is_tag_contain_class(ignore_tag.classList) ){
                return true
            }
        }

        return false
    }

    _iter_child(parent){
        let that = this
        let h_list = []
        if( parent && !that._is_ignore(parent) ){
            if( that._is_h(parent) ){
                let tmpid = uuid()
                let id = parent.getAttribute("id") ? parent.getAttribute("id"): tmpid
                if( that.is_set_id ){
                    id = tmpid
                }
                parent.id = id
                if( that.is_set_id ){
                    parent.id = tmpid
                }
                h_list.push({
                    id: id,
                    tag: parent.localName,
                    level: parseInt( parent.localName.slice(-1) ),
                    title: $.trim(parent.textContent),
                })
            }
            for( let child of parent.childNodes ){
                h_list.push(...that._iter_child(child))
            }
        }
        return h_list
    }

    _count_chaptor(toc){
        let chapter_list = [0,0,0,0,0,0]
        let previous_level = 0;
        toc.forEach(t => {
            let level = t.level - 1
            chapter_list[level] += 1
            if( previous_level > level ){
                chapter_list[previous_level] = 0
            }
                        
            t.chaptor = []
            for( let i=0; i<=level;i++  ){
                t.chaptor.push(chapter_list[i])
            }
            t.chaptor = t.chaptor.join(".")+"."
            previous_level = level
        });
    }

    fit(){
        let that = this
        let toc = this._iter_child(this.element)
        that._count_chaptor(toc)
        return toc
    }
}

export { TOCTree }