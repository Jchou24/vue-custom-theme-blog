<template>
    <ResponsiveElement class="Slide" :class="{ 'full-screen': is_slide_active_full_screen, 'mobile': is_mobile }" @resized="handle_resized">
        <div class="reveal" :class="{ rotate: is_rotate_slide }" ref="slide">
            <div class="slides" v-scroller>
                <slot></slot>
            </div>
        </div>
        <div class="toolbar" :class="{ rotate: is_rotate_slide }">
            <MenuButton class="toolbar-btn clear-margin-right" @clicked="handle_menu_button_clicked" />
            <SlideFullScreen @updated="handle_full_screen_updated" />
            <!-- <ScreenRotateButton class="toolbar-btn" @clicked="handle_screen_rotate_button_clicked()" /> -->

            <SlideZoomer :is_layout_full_screen="is_layout_full_screen" @updated="handle_screen_percentage_updated" />
        </div>
        <CountDownNotification class="screen-percentage-notification" :message="display_note_screen_percentage" />
        <SlideTOC class="slide-toc" :current_page_idx="slide_info.indexh" ref="slide_toc" @go_to_slide="handle_go_to_slide" />
    </ResponsiveElement>
</template>

<script>
    import { mapMutations } from 'vuex'
    import $ from 'jquery'
    import throttle from 'lodash.throttle'
    import settings from "@theme/js/settings.js"
    import { check_is_mobile } from '@theme/js/utility.js'
    import { TOCTree } from '@theme/js/toc.js'

    import Scrollbar from 'smooth-scrollbar';
    import ScreenRotateButton from '@theme/components/common/button/ScreenRotateButton.vue'
    import MenuButton from '@theme/components/common/button/MenuButton.vue'
    import ResponsiveElement from '@theme/components/common/ResponsiveElement.vue'
    import CountDownNotification from '@theme/components/common/CountDownNotification.vue'
    import SlideFullScreen from '@theme/components/common/reveal-slide/SlideFullScreen.vue'
    import SlideZoomer from '@theme/components/common/reveal-slide/SlideZoomer.vue'
    import SlideTOC from '@theme/components/common/reveal-slide/SlideTOC.vue'

    /* TODO
        文章，slide切換
            將文章複製一份，一個放reveal裡面，一個放外面
            然後sidebar的button按下去後讓slide顯示在最上面
                並且偵測slide有沒有在user的視野內，沒有的話在右上角跳提示訊息
                說有slide產生，按下去後直接滑到slide

        遠端同步
        // 全屏模式
            TODO_BETTER
                手機時偵測長寬，轉換呈現方向

            // 網址變化時，解除全屏模式
            // 內容的呈現要能符合大小                
            // 加上一個class(full-screen)，切換全螢幕
            // 背景不能滑動
            // sidebar, nav
                要縮起來
                screen resize也不能跑出來
        // slide 製作 toc，按一個按鈕可以顯示 toc
        // '+' '-'  按鈕放大縮小螢幕
        // sidebar toc 不要將slide裡的內容 產生到 sidebar toc 裡面
        // 要加一個data記錄目前在第幾頁，被mounted起來，slide也初始後，直接跳到那頁
        //     做不到 => 無法記錄此組件之 id，若可以記錄就有機會
    */

    export default {
        name: "Slide",
        components:{
            ScreenRotateButton,
            MenuButton,
            CountDownNotification,
            SlideFullScreen,
            SlideZoomer,
            SlideTOC,
            ResponsiveElement,
        },
        props:{
            
        },
        data(){
            let that = this
            let uid = that._uid
            let slide_info = that.$store.state.slide[uid]

            return {
                reveal: null,
                reveal_script_id: "reveal_script_id",
                reveal_menu_script_id: "reveal_menu_script_id",
                reveal_toolbar_script_id: "reveal_toolbar_script_id",
                
                is_mobile: false,
                is_slide_active_full_screen: false,
                is_layout_full_screen: false,
                is_rotate_slide: false,
                display_screen_percentage: 100,
                screen_percentage: "100%",
                slide_info:{
                    indexh: 0,
                    indexv: 0,
                    indexf: 0,
                    
                    ...slide_info,
                },
            }
        },
        computed:{
            display_note_screen_percentage:{
                get(){
                    return `${this.display_screen_percentage}%`
                }
            },       
        },
        methods:{
            // ============================================================================================================
            init(){
                let that = this
                
                that.recycle()
                that.init_slide()
            },
            init_slide(){
                let that = this

                let Reveal = require("@theme/js/reveal/reveal.js").default
                // let Reveal = require("reveal.js/js/reveal")
                that.reveal = Reveal
                that.regist_reveal(Reveal)
                that.init_plugins(Reveal)

                that.reveal.initialize({
                    slideNumber: true,
                    width: that.screen_percentage,
                    height: that.screen_percentage,
                    touch: false,
                    // navigationMode: 'grid',
                    margin: 0.0,
                })

                that.reveal.addEventListener('slidechanged', that.handle_slidechanged)
                that.update_reveal()
                that.$refs.slide_toc.init( that.reveal )
            },            
            regist_reveal(reveal){
                let that = this
                window.Reveal = reveal
                that.remove_reveal_script()                

                let new_reveal_script = document.createElement("script");
                let inline_script = document.createTextNode("Reveal = window.Reveal");
                new_reveal_script.appendChild(inline_script); 
                new_reveal_script.setAttribute("id", that.reveal_script_id);
                document.querySelector("body").appendChild(new_reveal_script);
            },
            init_plugins(reveal){
                let that = this

                // require("reveal.js/plugin/search/search.js")
            },
            // ============================================================================================================
            recycle(){
                let that = this

                if (that.reveal) {                    
                    that.reveal.removeEventListeners()
                    that.reveal.removeEventListener('slidechanged', that.handle_slidechanged)
                    that.reveal.recycle()
                }
                that.remove_reveal_script()
                that.remove_plugins()
                delete require.cache[require.resolve("reveal.js/js/reveal")]
                delete require.cache[require.resolve("@theme/js/reveal/reveal.js")]

                Scrollbar.destroy()
            },
            remove_reveal_script(){
                let that = this

                let reveal_script = document.getElementById(that.reveal_script_id)
                if(reveal_script){
                    reveal_script.parentNode.removeChild(reveal_script);
                }
            },
            remove_plugins(){
                delete require.cache[require.resolve("reveal.js/plugin/search/search.js")]
            },            
            // ============================================================================================================
            handle_slidechanged(event){
                let that = this
                // event.previousSlide, event.currentSlide, event.indexh, event.indexv
                // console.log(event)
                that.slide_info.indexh = event.indexh
                that.slide_info.indexv = event.indexv
                that.slide_info.indexf = event.indexf
                that.update_reveal()
            },
            handle_resized: throttle(function(){
                let that = this
                that.update_reveal()
            }, 500),
            handle_full_screen_updated({ is_slide_active_full_screen, is_layout_full_screen }){
                let that = this
                that.is_slide_active_full_screen = is_slide_active_full_screen
                that.is_layout_full_screen = is_layout_full_screen
                
                that.update_reveal()
            },
            handle_screen_percentage_updated({ screen_percentage, display_screen_percentage }){
                let that = this

                that.screen_percentage = screen_percentage
                that.display_screen_percentage = display_screen_percentage
                that.update_reveal()
            },
            handle_go_to_slide(idx){
                let that = this
                that.reveal.slide(idx)
            },
            set_table_width(){
                $('table').each(function(){
                    
                    let width = $(this).find("tr").width()
                    if(width){
                        $(this).width(width)
                    }

                    // console.log( this )
                    // console.log( width )
                }) 
            },
            handle_menu_button_clicked(){
                if(this.$refs.slide_toc){
                    this.$refs.slide_toc.open_toc()
                }
            },
            handle_screen_rotate_button_clicked(){
                let that = this
                // that.is_rotate_slide = !that.is_rotate_slide
                // setTimeout(that.update_reveal, 500)
            },
            update_reveal(){
                let that = this

                if (that.reveal) {
                    that.reveal.configure( { width: this.screen_percentage, height: this.screen_percentage, margin: 0 } );
                    that.reveal.layout()
                    that.reveal.sync()
                }
                that.set_table_width()
            },
            ...mapMutations("layout",[
                "set_layout",
            ]),
        },
        watch:{
            // "$route"(){
            //     let that = this
            //     that.save_slide_info({ uid: that._uid, info: that.slide_info })
            // },
        },
        mounted(){
            let that = this

            that.is_mobile = check_is_mobile()

            that.$nextTick(()=>{
                that.init()
            })

        },
        beforeDestroy(){
            this.set_layout({ key: "is_disabled_scroll", val: false})
            this.set_layout({ key: "is_full_screen", val: false})
            this.recycle()
        },
    }
</script>


<!--
<style src="@theme/../node_modules/reveal.js/css/reveal.css"></style>
-->
<style src="@theme/css/reveal.css"></style>


<style lang="scss">
    .Slide{
        .reveal{
            border-radius: 15px;
            height: 450px;

            @include transition(height, 0.3s, ease-in-out);

            div.progress{
                height: 5px;
            }
        }

        &.full-screen .reveal{
            border-radius: 0px;
        }
    }

    // for toolbar
    .Slide{
        position: relative;

        .toolbar{
            position: absolute;
            left: 30px;
            bottom: 23px;
            z-index: 1;
            display: flex;
        }

        .toolbar.rotate{
            bottom: unset;
            top: 0;
            left: 0;
        }

        &.sm{
            .toolbar{
                left: 5px;
                bottom: 10px;
            }
        }
    }

    // for toolbar buttons
    .Slide{
        .toolbar{
            &.rotate{
                bottom: unset;
            }

            .toolbar-btn{
                margin-right: 7px;

                &.clear-margin-right{
                    margin-right: 0px;
                }
            }
        }

        &.sm .toolbar{
            .toolbar-btn{
                height: 49px;

                &.full-screen-btn{
                    margin-top: 3px;
                }

                &.clear-margin-right{
                    i.material-icons{
                        font-size: 49px;
                    }
                }
                i.material-icons{
                    font-size: 44px;
                }
            }
        }
    }

    // for scroll
    .Slide{
        .reveal{
            touch-action: pan-x pan-y pinch-zoom;
            // for scroll bar
            .ps__rail-x, .ps__rail-y{
                display: none;
            }
        }
    }

    // for table
    .Slide{
        table{
            margin-left: auto;
            margin-right: auto;
        }
    }

    // for screen-percentage-notification
    .Slide .screen-percentage-notification{
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 999;
    }

    // for toc
    .Slide .slide-toc{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    // for rotation
    .Slide .reveal.rotate{
        transform: rotate(90deg);
        // width: 100vh !important;
        // height: 100vw !important;
        width: 100% !important;
        height: 100% !important;

        & > *{
            // transform: rotate(90deg);
            // right: unset;
        }

        &{
            div.slides{
                width: 100% !important;
                height: 100% !important;

                // width: 100vh !important;
                // height: 100vw !important;
                margin: 0px;
                // top: 27%;
                // left: -58%;

                section{
                    // height: 100%;
                    // top: 0 !important;
                }
            }

            div.progress{
                // bottom: 50%;
                // left: 50%;

                height: 10px;
            }            
        }

        &.overview .slides{
            // transform: scale(0.2) translateX(0px) translateY(0px) rotate(90deg) !important;
        }
    }
</style>


<style lang="scss" scoped>    
    $slide-background-image: map-get($imgs-light, whitey);

    // background-color: #f0f1f3b8;
    // background: radial-gradient(circle, transparent 15%, #000000, #888888 150%), $slide-background-image;
    // background: radial-gradient(circle, transparent 45%, #c7c9ca, #1f1e1e 90%), $slide-background-image;
    
    // $background: radial-gradient(circle, transparent 40%, #dcdcdc 70%, #bfbfbf 90%), $slide-background-image;
    // $background: radial-gradient(circle, transparent 50%, #dcdcdc, #bfbfbf 90%), $slide-background-image;
    // $background: radial-gradient(circle, transparent 40%, #f0f0f0, #bebebe), $slide-background-image;
    $background: radial-gradient(circle, #ffffff00 50%, #dcdcdc, #bfbfbf 90%), $slide-background-image;
    $background-mobile: radial-gradient(circle, #ffffff00 5%, #a09e9e), $slide-background-image;
    $background-mobile-full-screen: radial-gradient(circle, #ffffff00 50%, #a09e9e), $slide-background-image;

    .Slide.mobile{
        .reveal .slides{
            background: $background-mobile;
        }

        &.full-screen{
            .reveal .slides{
                background: $background-mobile-full-screen;
            }
        }
    }

    .Slide{
        border-radius: 15px;
        filter: brightness(1.1);

        .reveal{
            
            .slides{
                height: 100%;
                width: 100%;   
                min-height: 100% !important;
                min-width: 100% !important; 
                background: $background;
            }
        }

        &.full-screen{
            border-radius: 0px;
            position: fixed;
            top:0;
            left:0;
            height: 100vh;
            width: 100vw;
            z-index: 99999;           

            .reveal{
                height: 100%;                
            }
        }
        .toolbar{
            &.rotate{
                bottom: unset;
            }
        }
    }

    
    
</style>
