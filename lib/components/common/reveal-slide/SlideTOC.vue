<template>
    <div class="SlideTOC" :class="{ active: is_active}">
        <transition
            enter-active-class="animated fastest fadeIn"
            leave-active-class="animated fastest fadeOut"
        >
            <div class="toc-background" v-if="is_show" @click="close_toc"></div>
        </transition>
        <transition
            enter-active-class="animated fastest fadeInLeft"
            leave-active-class="animated fastest fadeOutLeft"
            v-on:after-enter="afterEnter"
            v-on:before-leave="beforeLeave"
            v-on:after-leave="afterLeave"
        >
            <div class="toc" v-if="is_show">
                <div class="toc-body" ref="toc">
                    <div>
                        <div class="toc-row" 
                            v-for="( el, idx ) in toc"
                                :key="idx"
                                :class="{ active: idx == current_page_idx }"
                                @click="go_to_slide(idx)"
                            >
                            <div class="idx">
                                {{el.index}} :
                            </div>
                            <div class="title">
                                {{el.title}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="close-btn" @click="close_toc">
                    <i class="material-icons">keyboard_arrow_left</i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { stringFormat } from '@theme/js/utility.js'

    import Scrollbar from 'smooth-scrollbar';
    // TODO
    // unchecked yet
    export default {
        name: "SlideTOC",
        components:{
            
        },
        props:{
            current_page_idx:{
                type: Number,
                required: true,
            },
            candidate_header:{
                type: Array,
                default: () => [ 'h1', 'h2', 'h3' ]
            },
            default_title:{
                type: String,
                default: "Page {0}"
            },            
        },
        data(){
            return {
                toc: [],
                is_show: false,
                is_active: false,
            }
        },
        watch:{
            
        },
        computed:{

        },
        methods:{
            init( reveal ){
                let that = this

                that.recycle()

                let toc = []
                reveal.getSlides().forEach((el, idx) => {
                    idx += 1
                    let header = that.search_header(el)
                    let section_title = that.get_header_title(idx, header)
                    toc.push({
                        index: idx,
                        title: section_title,
                    })
                });

                that.toc = toc
            },
            search_header(el){
                let that = this
                
                for( let header of that.candidate_header){
                    let result = $(el).find(header)[0]
                    if( result ){
                        return result
                    }
                }
                return null
            },
            get_header_title(idx, header){
                let that = this
                return header ? header.textContent : stringFormat( that.default_title, idx )
            },
            go_to_slide(idx){
                this.$emit("go_to_slide", idx)
                console.log("go to", idx)
            },
            open_toc(){
                this.is_show = true
                this.is_active = true
            },
            close_toc(){
                this.is_show = false
            },
            afterEnter(){
                Scrollbar.init(this.$refs.toc)
            },
            beforeLeave(){
                Scrollbar.destroy()
            },
            afterLeave(){
                this.is_active = false
            },
            recycle(){
                let that = this
                Scrollbar.destroy()
            },
            
        },
        mounted(){

        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss" scoped>
    $background-filter-color: #55575a8a;
    $background-color: #2c313acc;
    $background-color-hover: #121e2c85;
    $close-btn-background-color: #5362798a;
    $close-btn-background-color-hover: #646c75;
    $color: #f0f1f3b8;
    $close-btn-width: 10px;

    .SlideTOC{
        overflow: hidden;
        z-index: -1;

        &.active{
            width: 100%;
            height: 100%;
            z-index: 10;
        }

        .toc-background{
            width: 100%;
            height: 100%;
            background: $background-filter-color;
        }
        
        .toc{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            width: 30%;
            height: 100%;
            min-width: 200px;
            color: $color;
            display: flex;
            flex-direction: row;

            .toc-body{
                background: $background-color;
                height: 100%;
                width: calc( 100% - #{$close-btn-width} );

                .toc-row{
                    display: flex;
                    cursor: pointer;
                    padding: 5px;
                    
                    &:hover{
                        font-weight: bold;
                    }
        
                    &.active{
                        background: $background-color-hover;
                    }
        
                    .idx{
                        width: 30px; 
                        text-align: right;
                        margin-right: 5px;
                    }
        
                    .title{
                        width: calc( 100% - 30px );
                        display: block;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;                        
                        height: 100%;
                        text-align: justify;
                    }
                }
            }

            .close-btn{
                display:flex;
                align-items:center;
                height: 100%;
                cursor: pointer;
                width: $close-btn-width;
                background: $close-btn-background-color;
                @include transition(all, 0.3s, ease-in-out);

                &:hover{
                    background: $close-btn-background-color-hover;
                }
                
                .material-icons{
                    margin-left: -6px;
                }

            }
        }
    }
</style>
