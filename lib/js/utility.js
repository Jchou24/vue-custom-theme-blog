'use strict'

import $ from 'jquery'

function screen_size(){
    if( 1200 <= window.innerWidth ){
        return "xl"
    }else if( 992 <= window.innerWidth && window.innerWidth < 1200 ){
        return "l"
    }else if( 768 <= window.innerWidth && window.innerWidth < 992 ){
        return "md"
    }else if( 576 <= window.innerWidth && window.innerWidth < 768 ){
        return "s"
    }else{
        return "xs"
    }
}

function uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function add_treeselect_resize_handler(){
    let menu = document.querySelector("div.vue-treeselect__menu")
    let current_menu_height = menu.offsetHeight
    import('resize-sensor').then(ResizeSensor => {
        ResizeSensor.default( menu, function() {
            if( menu.offsetHeight != current_menu_height ){
                current_menu_height = menu.offsetHeight
                let width = document.querySelector("li.category-filter").offsetWidth
                document.querySelector("li.category-filter").style.width = (width - 0.001) + "px"
                
                setTimeout(function(){
                    document.querySelector("li.category-filter").style.width = ""
                },1)
            }
        }); 
    })
}
// ======================================================================================================
// for article tree
// ======================================================================================================

function new_article_category_tree_node(){
    return {
        id:[],
        tag:{},
        children: {},
    }
}

function iter_article_tree(category, article_category_tree){
    category = category.slice()
    if( category[0] == 'Home' ){
        category = category.slice(1)
    }
    
    let target = article_category_tree['Home']
    for( let cat of category ){
        target = target.children[cat]
        if( target == null || target == undefined ){
            return null
        }
    }

    return target
}

function dfs_article_category_tree(article_category_tree_root){
    let ids = [ ...article_category_tree_root.id ]
    for( let child in article_category_tree_root.children ){
        ids = [ ...ids, ...dfs_article_category_tree( article_category_tree_root.children[child] ) ]
    }
    return ids
}

function get_article_category_tree_with_valid_article(article_category_tree_to_clone, active_article_id){

    function dfs_tree(article_category_tree_root){
        let article_ids = []
        article_category_tree_root.id.forEach(function(id){
            if( active_article_id.includes(id) ){
                article_ids.push(id)
            }
        })
        article_category_tree_root.id = article_ids
        let id_count = article_ids.length
        for( let child in article_category_tree_root.children ){
            let children_id_count = dfs_tree( article_category_tree_root.children[child] )
            id_count += children_id_count

            if( children_id_count == 0 ){
                delete article_category_tree_root.children[child]
            }
        }

        article_category_tree_root.id_count = id_count
        return id_count
    }
    
    let tree = $.extend(true, {}, article_category_tree_to_clone)
    dfs_tree(tree.Home)
    return tree
}

// ======================================================================================================
// for handle DATA
// ======================================================================================================

function ToDateString(d){
    if( typeof(d) == typeof("string") ){
        if( d.length == 0 ){
            throw "Can not do ToDateString"
        }
    }
    d = new Date(d)
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let date = d.getDate()
    return `${year}-${month}-${date}`
}


function set_array_prototype_equals(){
    // Warn if overriding existing method
    if(Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;       
            }           
            else if (this[i] != array[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }       
        return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});
}

function check_is_mobile(){
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function stringFormat() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

let extend_pages = [ '/', '/category/', '/tag/', '/archive/', '/search/' ]

export { 
    screen_size,
    uuid, 
    new_article_category_tree_node,
    iter_article_tree, 
    dfs_article_category_tree, 
    add_treeselect_resize_handler,
    get_article_category_tree_with_valid_article,
    ToDateString,
    set_array_prototype_equals,
    extend_pages,
    check_is_mobile,
    stringFormat,
}