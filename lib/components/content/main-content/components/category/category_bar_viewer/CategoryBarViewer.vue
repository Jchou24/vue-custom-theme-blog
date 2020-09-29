<template>
    <div class="category-bar-viewer">
        <span class="bar-icon d-none d-sm-block">
            <a href="" class="sidebar-icon-circle"
                v-on:click.prevent="refresh">
                <div class="sidebar-icon">
                    <i class="material-icons refresh">refresh</i>
                </div>
            </a>
            <a href="" class="sidebar-icon-circle upside"
                v-on:click.prevent="upside_active_category_path">
                <div class="sidebar-icon">
                    <i class="material-icons">subdirectory_arrow_left</i>
                </div>
            </a>
        </span>
        
        <transition                
            name="custom-classes-transition"
            enter-active-class="animated fadeInDown faster"
            leave-active-class="animated fadeOutUp faster"
            >
            <CategorySortList 
                v-if="is_active_sort_list" 
                :style="{ top: top+'px' }"
                ref="category_sort_list"
                />
        </transition>

        <i class="material-icons sort"
            @click="is_active_sort_list = !is_active_sort_list"
            v-b-tooltip.hover title="sort article">unfold_more</i>
        <CategoryBarViewerInput ref="category_bar_viewer_input" />

        <div class="category-content-show-icons">
            <a href="" class="sidebar-icon-circle refresh d-block d-sm-none"
                v-on:click.prevent="refresh">
                <div class="sidebar-icon">
                    <i class="material-icons refresh">refresh</i>
                </div>
            </a>
            <a href="" class="sidebar-icon-circle upside d-block d-sm-none"
                v-on:click.prevent="upside_active_category_path">
                <div class="sidebar-icon">
                    <i class="material-icons">subdirectory_arrow_left</i>
                </div>
            </a>
            <CategoryContentShowIcon
                :is_show="$store.state.category.is_show.datetime"
                set_target="datetime"
                v-b-tooltip.hover title="toggle create date"
                />
            <CategoryContentShowIcon
                :is_show="$store.state.category.is_show.update_datetime"
                set_target="update_datetime"
                v-b-tooltip.hover title="toggle update date"
                />
            <CategoryContentShowIcon class="tag"
                :is_show="$store.state.category.is_show.tag"
                set_target="tag"
                v-b-tooltip.hover title="toggle tag"
            />
        </div>
    </div>
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import CategorySortList from './CategorySortList.vue'
    import CategoryBarViewerInput from './CategoryBarViewerInput.vue'
    import CategoryContentShowIcon from './CategoryContentShowIcon.vue'
    import { mapMutations } from 'vuex'
    import $ from 'jquery'
    import throttle from 'lodash.throttle'

    export default {
        name: "CategoryBarViewer",
        components:{
            CategorySortList,
            CategoryBarViewerInput,
            CategoryContentShowIcon,
        },
        directives:{
            'b-tooltip': vBTooltip
        },
        props:{
            
        },
        data() {
            return {
                is_active_sort_list: false,
                top: 50,
            }
        },
        computed:{

        },
        watch:{
            
        },
        methods:{
            init(){
                let that = this
                that.$refs.category_bar_viewer_input.init()
                that.recycle()
                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(document.querySelector("div.category-bar-viewer-input"), throttle(function(){
                        if( that.$refs.category_bar_viewer_input && that.$refs.category_bar_viewer_input.$el ){
                            that.top = that.$refs.category_bar_viewer_input.$el.clientHeight + 14
                        }
                    }), 300) 
                })
                window.addEventListener('click', that.on_click)
            },
            recycle(){
                let that = this
                window.removeEventListener('click', that.on_click)
            },
            on_click(e){
                let that = this

                function is_el_equal(e, selector){
                    let el = document.querySelector(selector)
                    return el ? e.target.tagName == el.tagName && e.target.className == el.className : false
                }

                let is_target_sort_icon = is_el_equal(e, "i.material-icons.sort")
                let is_target_category_sort_list = is_el_equal(e, "div.category-sort-list")

                // check when option is open
                if( document.querySelector("div.category-sort-list") && !is_target_sort_icon ){
                    if( is_target_category_sort_list || $(e.target).parents("div.category-sort-list").length ){
                        that.is_active_sort_list = true
                    }else{
                        that.is_active_sort_list = false
                    }
                }
            },
            ...mapMutations('category',[ 
                'upside_active_category_path',
                'refresh',
            ]),
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.init()
            })
        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss" scoped>

</style>
