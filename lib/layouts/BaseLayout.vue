<template>
    <div class="theme-container"
        :class=applied_root_class
        >
        <transition
            appear
            enter-active-class="animated fadeInDown"
            v-on:after-enter="HandleNavTransitionAfter"
            >
            <slot name="nav" v-if="is_show_nav"></slot>
        </transition>

        <div class="sidebar-content" :class="{'active-display': is_sidebar_active}"
            v-if="!is_full_page"
            >
            <div class="view-container">
                <transition
                    appear
                    mode="out-in"
                    enter-active-class="animated fadeInLeftSmall fast delay-700ms"
                    leave-active-class="animated fadeOutLeftSmall fast"
                    >
                    <slot name="sidebar" v-if="is_show_sidebar"></slot>
                </transition>
                
                <!-- <slot name="sidebar" v-if="is_nav_transition_completed"></slot> -->
            </div>
        </div>

        <div class="content view-container" 
            v-bind:class="{ 
                'active-displayer': is_displayer_active, 
                'disactive-displayer': !is_displayer_active 
            }"
            key="1"
            v-if="!is_full_page"
            >

            <!-- enter-active-class="animated zoomIn"
            leave-active-class="animated fadeOut fastest" -->
            <transition
                mode="out-in"
                appear
                enter-active-class="animated fadeIn fast"
                leave-active-class="animated fadeOut fast"
                >
                <slot name="content" v-if="is_show_content"></slot>
            </transition>
        </div>    
        
        <div class="content view-container full-page" 
            v-bind:class="{ 
                'disactive-displayer': true
            }"
            key="1"
            v-if="is_full_page"
            >

            <transition
                mode="out-in"
                appear
                enter-active-class="animated fadeIn fast"
                leave-active-class="animated fadeOut fast"
                >
                <slot name="full-page" v-if="is_show_content"></slot>
            </transition>
        </div>
    </div>
</template>

<script>    
    import $ from "jquery"
    import { mapMutations } from 'vuex'
    import throttle from 'lodash.throttle'
    import { screen_size } from '@theme/js/utility.js'

    export default {
        name: "BaseLayout",
        props:{
            root_class:{
                type: String,
                default: ""
            },
            is_search_page:{
                type: Boolean,
            },
            is_full_page:{
                type: Boolean,
                default: false,
            },
        },
        data(){
            return {
                applied_root_class: {},
                current_screen_size: '',
                is_show_nav: false,
                is_nav_transition_completed: false,
            }
        },
        components: { 
            
        },
        computed:{
            is_disabled_scroll:{
                get(){
                    return this.$store.state.layout.is_disabled_scroll
                }
            },
            is_displayer_active:{
                get(){
                    return false
                }
            },
            is_sidebar_active:{
                get(){
                    return this.$store.state.layout.is_sidebar_active
                }
            },
            is_app_first_enter:{
                get(){
                    return this.$store.state.layout.is_app_first_enter
                }
            },
            is_transition_leave_completed:{
                get(){
                    return this.is_sidebar_transition_leave_completed && this.is_content_transition_leave_completed
                }
            },
            is_show_sidebar:{
                get(){
                    return this.is_nav_transition_completed
                }
            },
            is_show_content:{
                get(){
                    return this.is_nav_transition_completed
                }
            },
        },
        methods:{
            init(){

            },
            init_once(){
                let that = this

                that.current_screen_size = screen_size()
                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(document.querySelector("#app"), throttle(function(){
                        that.trigger_app_resize()
                        that.current_screen_size = screen_size()
                        // console.log("app resize")
                    }, 500)) 
                })

                // for scroller.js => function: scroll_article => effect: easeOutExpo
                import('jquery-ui/ui/effect.js').then(m => {

                })

                that.let_user_can_interrupt_auto_scroll()
                
                that.$nextTick( () => {
                    setTimeout( () => that.is_show_nav = true, 300)                    
                })
            },
            let_user_can_interrupt_auto_scroll(){
                $('body,html').bind('mousedown wheel DOMMouseScroll mousewheel touchstart keyup', function(e){
                    let is_stop = false
                    if(e.type == 'keyup'){
                        if( e.which == 33        // page up 
                            || e.which == 34     // page dn 
                            || e.which == 32     // spacebar
                            || e.which == 38     // up 
                            || e.which == 40     // down 
                            || (e.ctrlKey && e.which == 36)     // ctrl + home 
                            || (e.ctrlKey && e.which == 35)     // ctrl + end 
                        ){
                            is_stop = true
                        }
                    }else{
                        is_stop = true
                    }

                    if(is_stop){
                        $("html,body").stop()
                    }
                })
            },
            after_MainContentLayout_updated(){
                let that = this

                that.applied_root_class = {}
                that.applied_root_class[that.root_class] = true

                that.set_layout({ key: "is_app_first_enter", val: false })
            },
            set_is_sidebar_active(){
                this.set_layout({
                    key: "is_sidebar_active", 
                    val: screen_size() == 'l' || screen_size() == 'xl'? true : false
                })
            },
            HandleNavTransitionAfter(){
                this.is_nav_transition_completed = true
            },
            ...mapMutations("layout",[
                'trigger_app_resize',
                'set_layout',
            ]),
        },
        watch:{      
            "$route.path"(new_val, old_val){
                this.init()

                // force closing sidebar
                if( screen_size() == 'xs' ){
                    this.set_layout({
                        key: "is_sidebar_active", 
                        val: false
                    })
                }
            },
            "$store.state.layout.refresh_root_class"(){
                this.after_MainContentLayout_updated()
            },
            current_screen_size(new_val, old_val){
                if (new_val != old_val) {
                    this.set_is_sidebar_active()
                }
            },
            is_disabled_scroll(new_val, old_val){
                let body = document.querySelector("body")
                if(new_val){
                    body.classList.add("disabled-scroll")
                }else{
                    body.classList.remove("disabled-scroll")
                }
            },
        },
        beforeMount(){
            this.set_is_sidebar_active()
        },
        mounted(){
            this.init_once()
            this.init()
        },
    }
</script>

<style lang="scss">
    body{
        margin: 0px;
    }   
</style>

<style lang="scss" scoped>

    $distance: -15%;

    @-webkit-keyframes fadeInLeftSmall {
        from {
            opacity: 0;
            -webkit-transform: translate3d($distance, 0, 0);
            transform: translate3d($distance, 0, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes fadeInLeftSmall {
        from {
            opacity: 0;
            -webkit-transform: translate3d($distance, 0, 0);
            transform: translate3d($distance, 0, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    .fadeInLeftSmall {
        -webkit-animation-name: fadeInLeftSmall;
        animation-name: fadeInLeftSmall;
    }

    @-webkit-keyframes fadeOutLeftSmall {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d($distance, 0, 0);
            transform: translate3d($distance, 0, 0);
        }
    }

    @keyframes fadeOutLeftSmall {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d($distance, 0, 0);
            transform: translate3d($distance, 0, 0);
        }
    }

    .fadeOutLeftSmall {
        -webkit-animation-name: fadeOutLeftSmall;
        animation-name: fadeOutLeftSmall;
    }

</style>