<template>
    <a class="sidebar-icon-circle" href="" 
        v-on:click.prevent="toggle_is_active()" 
        :class="{ disactive:(!is_active || !is_actiable), 'not-allowed': !is_actiable }" 
        > 
        <div class="sidebar-icon">
            <CategoryIcon v-if="is_category_viewer"/>
            <div v-html="icon_template" v-else />
        </div>
    </a>
</template>

<script>
    import CategoryIcon from './CategoryIcon.vue'
    function get_material_icon_template(target){
        return `<i class="material-icons">${target}</i>`
    }

    export default {
        name: "SidebarIcon",
        components:{ CategoryIcon },
        props:{
            default_is_active:{
                default: true,
                type: Boolean
            },
            icon: {
                type: String,
                required: true
            },
            is_actiable:{
                default: true,
                type: Boolean
            },
        },
        computed:{
            is_category_viewer:{
                get(){
                    return this.icon_template == 'category_viewer'
                }
            }
        },
        data(){
            let icon_template
            switch (this.icon) {
                case "toc":
                    icon_template = get_material_icon_template("view_list")
                    break
                case "article_lists":
                    icon_template = get_material_icon_template("description")
                    break
                case "recent_post":
                    icon_template = get_material_icon_template("watch_later")
                    break
                case "media_displayer":
                    icon_template = get_material_icon_template("chrome_reader_mode")
                    break
                case "category_viewer":
                    icon_template = "category_viewer"
                    break
            
                default:
                    break;
            }

            return {
                is_active: this.default_is_active,
                icon_template: icon_template
            }
        },
        watch:{
            is_active(){
                this.$emit("change")
            }
        },
        methods:{
            toggle_is_active(){
                if( this.is_actiable ){
                    this.is_active = !this.is_active
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    a.sidebar-icon-circle.not-allowed{
        cursor: not-allowed !important;
    }
</style>
