<template>
    <transition
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp"
        v-on:after-enter="afterEnter"
        v-on:before-leave="beforeLeave"
        >
        <div class="LinkPreview" v-if="isShowPreview"
            @mouseenter="HandleMouseEnter"
            @mouseleave="HandleMouseLeave"
            >
            <div class="LinkPreview-container">
                <div class="previewer-container" ref="previewer_container">
                    <link-prevue class="previewer" cardWidth="300px" 
                        :class="{hover: isShowClosePreviewButton}"
                        :url="url"
                        @previewFetched="HandlePreviewFetched"
                        @fetchPreview="HandleFetchPreview"
                        ref="previewer" >
                    </link-prevue>
                </div>

                <div v-if="isShowToolCorner">
                    <transition
                        enter-active-class="animated fadeInDown faster"
                        leave-active-class="animated fadeOutUp faster"
                        >
                        <span class="material-icons close"
                            @click="HidePreview"
                            v-if="isShowClosePreviewButton"
                            >close</span>

                        <loading-progress
                            class="progress"
                            :progress="progress"
                            :indeterminate="indeterminate"
                            :counter-clockwise="counterClockwise"
                            :hide-background="hideBackground"
                            shape="circle"
                            size="36"
                            fill-duration="1"
                            v-else
                        />
                    </transition>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import LinkPrevue from './LinkPrevue.vue'
    import Scrollbar from 'smooth-scrollbar';
    import 'vue-progress-path/dist/vue-progress-path.css'
    import VueProgress from 'vue-progress-path'

    Vue.use(VueProgress)

    export default {
        name: "LinkPreview",
        components:{
            LinkPrevue
        },
        props:{
            maxIdleTime:{
                type: Number,
                default: () => 10000,
            }
        },
        data(){
            return {
                url: null,
                isShowPreview: false,
                isShowClosePreviewButton: false,
                isShowToolCorner: false,
                // ====================================
                // for count down
                currentIdleTime: 0,
                timer: null,
                progress: 0,
                indeterminate: false,
                counterClockwise: false,
                hideBackground: false,
                // ====================================
            }
        },
        watch:{
            
        },
        computed:{

        },
        methods:{
            init(){
                let that = this
                
                this.$nextTick( () => {
                    $("a").on("mouseenter", function(event){
                        let rel = $.trim($(this).attr("rel"))
                        let target = $.trim($(this).attr("target"))
                        let href = $.trim($(this).attr("href"))
                        let isActivePreview = rel == "noopener noreferrer" && target == "_blank" && href != that.url

                        if(isActivePreview ){
                            that.url = href
                            that.ShowPreview()
                            that.ResetIdleTime()                            
                        }                        
                    })
                })

                that.recycle()
            },
            recycle(){
                let that = this
                Scrollbar.destroy()
            },
            // =================================================
            // Handle Preview Fetched
            HandlePreviewFetched(){
                this.isShowToolCorner = true
                this.RunTimer()
            },
            HandleFetchPreview(){
                this.isShowToolCorner = false
            },
            // =================================================
            // scrollbar
            afterEnter(){
                this.$nextTick( () => Scrollbar.init(this.$refs.previewer_container) )                
            },
            beforeLeave(){
                Scrollbar.destroy()
            },
            // =================================================
            // previewer
            ShowPreview(){
                this.isShowPreview = true
            },
            HidePreview(){
                this.isShowPreview = false
                this.url = null
            },
            // =================================================
            // handle mouse enter & leave
            HandleMouseEnter(){
                this.isShowClosePreviewButton = true
                this.StopTimer()
            },
            HandleMouseLeave(){
                this.isShowClosePreviewButton = false                
                this.RunTimer()
            },
            // =================================================
            // timer
            ResetIdleTime(){
                this.currentIdleTime = 0
                this.progress = 0
            },
            RunTimer(){
                this.StopTimer()
                this.timer = this.GetTimer()
            },
            StopTimer(){
                clearInterval(this.timer)
            },
            GetTimer(){
                return setInterval( () => {
                    this.currentIdleTime += 100
                    this.progress = this.currentIdleTime / this.maxIdleTime
                    if( this.currentIdleTime >= this.maxIdleTime ){
                        this.ResetIdleTime()
                        this.StopTimer()
                        this.HidePreview()
                    }
                }, 100)
            },
        },
        mounted(){
            this.init()
        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss">
    .LinkPreview .vue-progress-path {
        display: inline-block;
        path {
            fill: none;
            stroke-width: 5;
            transition: stroke-dashoffset .3s ease-in-out;
        }
        .background {
            stroke: #ddd;
        }
        .progress {
            stroke: #1c2f45;
        }
        &.indeterminate {
            path {
                transition: none;
            }
        }
    }

    .LinkPreview .previewer{
        .card-btn a{
            background: #1c2f45;
        }
    }
</style>

<style lang="scss" scoped>
    $distance: 15px;
    .LinkPreview{        
        position: fixed;
        right: $distance;
        top: calc( #{$header_nav-height} + #{$distance} );

        .LinkPreview-container{
            position: relative;

            .previewer-container{
                display: block;
                position: relative;
                max-height: 50vh;
                border-radius: 7px;

                .previewer{
                    @include transition();
                    opacity: 0.7;
                    &.hover{
                        opacity: 1;
                    }
                }

                .scrollbar-track{
                    margin-right: -30px;
                }
            }

            .material-icons.close{
                position: absolute;
                cursor: pointer;
                background: #1c2f45;
                color: #9bb4e0;
                font-size: 32px;

                top: 9px;
                right: 8px;

                padding: 2px;
                padding-left: 3px;
                line-height: 32px;
                border-radius: 13px;
            }

            .progress{
                position: absolute;
                top: -10px;
                right: -10px;

                height: 100%;
                width: 100%;
                background: none;
            }
        }
    }
</style>
